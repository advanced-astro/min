import { defineConfig } from 'astro/config'
import minify from 'astro-min'

export default defineConfig({
  integrations: [
    minify(
      {
        // do_not_minify_doctype: true
      }
    )
  ]
})
