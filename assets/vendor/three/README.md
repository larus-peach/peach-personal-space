# Three.js gallery bundle

- Source: npm `three@0.187.0` (https://www.npmjs.com/package/three/v/0.187.0)
- License: MIT, retained in [LICENSE](LICENSE) and the bundle header.
- npm tarball integrity: `sha512-Qiu7R+Cmh8CstZsY1uJOSWnVlfo7ZtNLV7mF8Jltk3LB3AtDu9cRZlcnRKkAk8Y4z6KKw35z7Y7Urd7jWY8etA==`
- One-time bundler: `esbuild@0.28.2`.

This local ESM bundle contains only the exports needed by the optional HOME photo effect. No CDN request, package installation or build step is required to serve the site. It is imported only on eligible pointer interaction; touch devices, reduced motion and data-saving mode use the original HTML photos.

To regenerate in a temporary directory, download the pinned package with `npm pack three@0.187.0`, extract its `package` directory, and create `gallery-entry.js` next to it:

```js
export { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, MeshBasicMaterial, Mesh, Texture, SRGBColorSpace, MathUtils } from './package/build/three.module.js';
```

Then run:

```sh
npm exec --yes --package=esbuild@0.28.2 -- esbuild gallery-entry.js --bundle --minify --format=esm --target=es2020 --legal-comments=inline --outfile=three.gallery.min.js
```

Copy the generated bundle and the upstream LICENSE into this directory. Preserve npm integrity verification and run the gallery interaction and fallback checks after updating the library.
