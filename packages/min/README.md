# ✳ AstroMin

> Extremely fast and smart🔹 Minification of 🟠 HTML 🟡 JS 🔵 CSS 🟣 SVG  
> Meticulously optimized for Speed 🥇 and Effectiveness 🏅 based on Rust 🦀

[![Built with Astro][astro-badge]][astro-build]
[![GitHub Repo Stars][gh-stars]][gh-repo]
[![NPM Package Version][npm-version]][npm-package]
[![License: MIT][license-img]][license-url]
[![Types][types]][gh-repo]
[![Socket Badge](https://socket.dev/api/badge/npm/package/astro-min)](https://socket.dev/npm/package/astro-min)

## Feature Highlights ✨

- ⚡ Performant parallel processing (+1k files/s)
- 🪶 Lighter build output (~25% smaller)
- 📦 small packaged size (~30KB)

## Feature Roadmap 🌱

- [x] HTML, CSS, JS, SVG
- [x] Files and inline Code
- [x] Static Site Minification

> **Note**
>
> `astro-min` focuses on compressing statically generated content and pre-rendered routes

- [ ] Support SSR / Hybrid Rendering
- [ ] Remove Comments from external CSS/JS

## Getting started 🎯

Use your package manager of your choice

```sh
# NPM
npm run astro add astro-min

# Bun (known bug 🐛)
#bun astro add astro-min

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
import min from 'astro-min'

export default defineConfig({
  integrations: [min()]
})
```

## Options 🔧

```js
//astro.config.mjs
import { defineConfig } from 'astro/config'
import minify from 'astro-min'

export default defineConfig({
  integrations: [
    minify({
      do_not_minify_doctype: false,
      ensure_spec_compliant_unquoted_attribute_values: false,
      keep_closing_tags: false,
      keep_comments: false,
      keep_html_and_head_opening_tags: false,
      keep_input_type_text_attr: false,
      keep_spaces_between_attributes: false,
      keep_ssi_comments: false,
      minify_css: false,
      minify_js: false,
      preserve_brace_template_syntax: false,
      preserve_chevron_percent_template_syntax: false,
      remove_bangs: false,
      remove_processing_instructions: false,
    })
  ]
})
```

> [!IMPORTANT]
>
> Use `astro-min` last in your integration list for the best optimization  
> Optional: but before `astro-compressor` and `astro-compress` for images only

```js
//astro.config.mjs
import { defineConfig } from 'astro/config'
import compressor from 'astro-compressor'
import minify from 'astro-min'

export default defineConfig({
  integrations: [
    minify({
      // do_not_minify_doctype: false,
      // ensure_spec_compliant_unquoted_attribute_values: false,
      // keep_closing_tags: false,
      // keep_comments: false,
      // keep_html_and_head_opening_tags: false,
      // keep_input_type_text_attr: false,
      // keep_spaces_between_attributes: false,
      // keep_ssi_comments: false,
      // minify_css: false,
      // minify_js: false,
      // preserve_brace_template_syntax: false,
      // preserve_chevron_percent_template_syntax: false,
      // remove_bangs: false,
      // remove_processing_instructions: false,
    }),
    compress({
      CSS: false,
      HTML: false,
      Image: true,
      JavaScript: false,
      SVG: false
    }),
    compressor()
  ]
})
```

## Development 💻

[![Open in StackBlitz][open-in-sb]](https://stackblitz.com/github/advanced-astro/astro-min)
[![Open with CodeSandbox][open-in-csb]](https://codesandbox.io/p/sandbox/github/advanced-astro/astro-min)
[![Open in GitHub Codespaces][open-in-ghc]](https://codespaces.new/advanced-astro/astro-min?devcontainer_path=.devcontainer/minimal/devcontainer.json)
[![Open in Gitpod][open-in-gp]](https://gitpod.io/#https://github.com/advanced-astro/astro-min)

## Learn more 🔖

- <https://warpspeed-world.github.io/css-minification-benchmark/>
- <https://github.com/neon-bindings/neon>

## Versus 🏅

- [astro-compress](https://github.com/astro-community/AstroCompress)
  - 🐌 uses terser based on javascript
  - 💤 lightningcss not yet implemented

- [astro-html-minify](https://github.com/frontendista/astro-html-minify)
  - 🐌 uses terser based on javascript

## Colophon 📃

Build with modern FOSS 💚 and AI assistance 🤖

- [VSCodium](https://vscodium.com)
- [Codeium](https://codeium.com/?referral_id=eXJlZEB0dXRhLmlv)
- [tsup](https://tsup.egoist.dev)

Next generation ✨ web development based on Rust 🦀

- [Minify-HTML](https://github.com/wilsonzlin/minify-html)
  - [Minify-JS](https://github.com/wilsonzlin/minify-js)
  - [LightningCSS](https://lightningcss.dev)

## Changelog 📖

1.2.0 - 🛠 Feat: Parallel processing  
      - ✨ Feat: Skip `*.min.*`  
1.1.0 - 🐛 Fix: Auto install bug

[astro-badge]: https://astro.badg.es/v2/built-with-astro/tiny.svg
[astro-build]: https://astro.build/integrations/?categories%5B%5D=recent
[codestyle-img]: https://flat.badgen.net/badge/code%20style/ts-standard/blue?icon=typescript
[codestyle-url]: https://github.com/standard/ts-standard
[gh-stars]: https://img.shields.io/github/stars/advanced-astro/astro-min
[gh-repo]: https://github.com/advanced-astro/astro-min
[license-img]: https://flat.badgen.net/github/license/amio/badgen
[license-url]: https://opensource.org/license/isc-license-txt/
[open-in-csb]: https://assets.codesandbox.io/github/button-edit-lime.svg
[open-in-ghc]: https://github.com/codespaces/badge.svg
[open-in-gp]: https://gitpod.io/button/open-in-gitpod.svg
[open-in-sb]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[npm-package]: https://www.npmjs.com/package/astro-min
[npm-version]: https://img.shields.io/npm/v/astro-min?style=flat-square
[pkgphobia-img]: https://packagephobia.com/badge?p=astro-min&style=flat-square
[pkgphobia-url]: https://packagephobia.com/result?p=astro-min
[types]: https://img.shields.io/npm/types/astro-min?style=flat-square

[Advanced Astro](https://advanced-astro.dev)
