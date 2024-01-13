# astro-min

> Extremely Fast and Smart Minification of 🟠 HTML 🟡 JS 🔵 CSS 🟣 SVG  
> Meticulously optimized for Speed 🥇 and Effectiveness 🏅

![Astro](https://img.shields.io/badge/astro-%238d46e7.svg?style=flat-square&logo=astro&logoColor=white)
[![Version](https://img.shields.io/npm/v/astro-min?style=flat-square)](https://www.npmjs.com/package/astro-min)
[![TS-Standard - TypeScript Standard Style Guide][codestyle-src]][codestyle-href]
 [![License: MIT][license-src]][license-href]

## Feature Highlights ✨

- 👟 fastest processing ~1000 files/s
- 🪶 lighter build output ~25% smaller
- 📦 small packaged size ~30KB

## Feature Roadmap 🌱

- [x] HTML, CSS, JS, SVG
- [x] Files and inline Code
- [x] Static Site Minification

- [ ] Support SSR / Hybrid Rendering

## Getting started 🎯

Use your package manager of your choice

```sh
# NPM
npm run astro add astro-min

# Bun
bun astro add astro-min

# PNPM
pnpm astro add astro-min

# Yarn
yarn astro add astro-min
```

### Manual Installation 🧑‍💻

1. Install package `astro-min`

2. Import and add to integrations list

```js
//astro.config.mjs
import { defineConfig } from 'astro/config'
import minify from 'astro-min'

export default defineConfig({
  integrations: [minify()]
})
```

[codestyle-src]: https://flat.badgen.net/badge/code%20style/ts-standard/blue?icon=typescript
[codestyle-href]: https://github.com/standard/ts-standard
[license-src]: https://flat.badgen.net/github/license/amio/badgen
[license-href]: https://opensource.org/license/isc-license-txt/

## Learn more 🔖

- <https://warpspeed-world.github.io/css-minification-benchmark/>
- <https://github.com/neon-bindings/neon>

## Colophon

- <https://github.com/wilsonzlin/minify-html>
  -
  -
