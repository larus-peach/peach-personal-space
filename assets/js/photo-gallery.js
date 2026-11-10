// Optional photo depth. Real images and links remain the primary content.
const cards = [...document.querySelectorAll('#interests .interest-card')];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
let wanted = null;
let enginePromise;
let engine;
let unavailable = false;
const eligible = () => !unavailable && !motion.matches && pointer.matches && !navigator.connection?.saveData;

async function enter(card, event) {
  if (!eligible() || event.pointerType === 'touch') return;
  wanted = card;
  try {
    enginePromise ||= import('../vendor/three/three.gallery.min.js').then(createEngine);
    engine = await enginePromise;
    if (!engine) { unavailable = true; return; }
    await card.querySelector('img').decode();
    if (wanted === card && eligible() && !document.hidden) engine.start(card, event);
  } catch {
    // A module, image or WebGL failure must never block navigation.
    unavailable = true;
    engine?.stop();
  }
}

function createEngine(THREE) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
  if (!context) return null;
  canvas.className = 'photo-depth';
  canvas.setAttribute('aria-hidden', 'true');
  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 10);
  camera.position.z = 3;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const textures = new Map();
  let active;
  let frame = 0;
  let x = 0;
  let y = 0;
  let lastTime = 0;

  function draw(time) {
    frame = 0;
    if (!active) return;
    const elapsed = lastTime ? Math.min((time - lastTime) / 1000, .05) : 1 / 60;
    lastTime = time;
    mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, -y * .035, 9, elapsed);
    mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, x * .045, 9, elapsed);
    renderer.render(scene, camera);
    if (Math.abs(mesh.rotation.x + y * .035) + Math.abs(mesh.rotation.y - x * .045) > .0001) {
      frame = requestAnimationFrame(draw);
    }
  }
  function schedule() {
    if (!frame) { lastTime = 0; frame = requestAnimationFrame(draw); }
  }
  function move(event) {
    if (!active) return;
    const rect = active.getBoundingClientRect();
    x = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    y = THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
    schedule();
  }
  function resize() {
    if (!active) return;
    const { width, height } = active.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const planeHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    // A little overscan keeps the edges covered as the photo tilts.
    mesh.scale.set(planeHeight * camera.aspect * 1.06, planeHeight * 1.06, 1);
    const img = active.querySelector('img');
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const focus = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100);
    const texture = material.map;
    texture.repeat.set(Math.min(1, camera.aspect / imageAspect), Math.min(1, imageAspect / camera.aspect));
    texture.offset.set((1 - texture.repeat.x) * focus[0], (1 - texture.repeat.y) * (1 - focus[1]));
    schedule();
  }
  const observer = new ResizeObserver(resize);
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    observer.disconnect();
    active?.classList.remove('is-depth');
    canvas.remove();
    active = null;
  }
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    unavailable = true;
    stop();
  });
  return {
    start(card, event) {
      stop();
      active = card.querySelector('.card-visual');
      const img = active.querySelector('img');
      if (!textures.has(img)) {
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        textures.set(img, texture);
      }
      material.map = textures.get(img);
      material.needsUpdate = true;
      mesh.rotation.set(0, 0, 0);
      active.append(canvas);
      resize();
      renderer.render(scene, camera);
      active.classList.add('is-depth');
      observer.observe(active);
      move(event);
    },
    move,
    stop,
    dispose() {
      stop();
      textures.forEach(texture => texture.dispose());
      textures.clear();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }
  };
}

cards.forEach(card => {
  card.addEventListener('pointerenter', event => enter(card, event));
  card.addEventListener('pointermove', event => engine?.move(event));
  card.addEventListener('pointerleave', () => { wanted = null; engine?.stop(); });
});
function stop() { wanted = null; engine?.stop(); }
motion.addEventListener('change', stop);
pointer.addEventListener('change', stop);
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
window.addEventListener('pagehide', () => {
  stop();
  engine?.dispose();
  engine = null;
  enginePromise = null;
});
