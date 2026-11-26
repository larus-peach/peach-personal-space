(() => {
  const links = Array.from(document.querySelectorAll('#photo-archive .archive-photo a'));
  if (!links.length || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'baseball-lightbox';
  dialog.setAttribute('aria-label', 'Photo Archive. 写真の拡大表示');
  dialog.innerHTML = `
    <button type="button" class="baseball-lightbox-close" autofocus>閉じる</button>
    <img alt="">
    <button type="button" class="baseball-lightbox-prev" aria-label="前の写真">← 前へ</button>
    <button type="button" class="baseball-lightbox-next" aria-label="次の写真">次へ →</button>
    <p class="baseball-lightbox-status" role="status" aria-live="polite"></p>`;
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const status = dialog.querySelector('[role="status"]');
  let current = 0;
  let opener;
  let previousOverflow;

  function show(index) {
    current = (index + links.length) % links.length;
    image.alt = links[current].querySelector('img').alt;
    image.src = links[current].href;
    status.textContent = `${current + 1} / ${links.length}、${image.alt}`;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      previousOverflow = document.body.style.overflow;
      show(index);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  dialog.querySelector('.baseball-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.baseball-lightbox-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.baseball-lightbox-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
  image.addEventListener('error', () => {
    status.textContent = '写真を読み込めませんでした。閉じてから再度お試しください。';
  });
})();
