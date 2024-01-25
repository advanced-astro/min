import { defineConfig } from 'astro/config'
import minify from 'astro-min'

export default defineConfig({
  integrations: [
    minify(
      {
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
      }
    )
  ]
})
