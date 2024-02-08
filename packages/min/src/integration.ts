import fs from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import minifyHtml from '@minify-html/node'
import type { AstroIntegration } from 'astro'
import { glob } from 'glob'
import { performance } from 'perf_hooks'

import { optimize } from 'svgo'
import { logServerMessage } from './utils/logger'
import { Options } from './utils/options'
/**
 * Creates a new integration with the given options.
 *
 * @param {Options} [options] - The options for the integration.
 * @return {AstroIntegration} - The created integration.
 */
export function createIntegration(options?: Options): AstroIntegration {
  return {
    name: 'astro-min',
    hooks: {
      'astro:config:setup': async ({ config }) => {
        config.compressHTML = false
      },
      'astro:build:done': async ({ dir }) => {
        const start = performance.now()
        const cwd = fileURLToPath(dir)

        const htmlFiles = await glob('**/*.{css,html,js}', { cwd })
        const svgFiles = await glob('**/*.svg', { cwd })

        if (htmlFiles.length === 0 && svgFiles.length === 0) return

        let relative = '0%'
        let absolute = 0
        let sizeNew = 0
        let sizeOld = 0

        for (const filename of htmlFiles) {
          const filePath = join(cwd, filename)

          const htmlOrg = await fs.promises.readFile(filePath, 'utf8')
          const htmlMin = minifyHtml.minify(
            Buffer.from(htmlOrg),
            options != null ? options : {},
          )

          await fs.promises.writeFile(filePath, htmlMin, 'utf-8')

          sizeNew += Buffer.byteLength(htmlMin, 'utf8')
          sizeOld += Buffer.byteLength(htmlOrg, 'utf8')
          absolute = sizeOld - sizeNew
          relative = `${((absolute / sizeOld) * 100).toFixed(1)}%`
        }

        for (const filename of svgFiles) {
          const filePath = join(cwd, filename)

          const svgOrg = await fs.promises.readFile(filePath, 'utf8')
          const svgMin = optimize(svgOrg, {
            multipass: true,
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          })

          await fs.promises.writeFile(filePath, svgMin.data, 'utf-8')
        }

        // const humanSizeOld = sizeOld < 100 ? sizeOld.toFixed(1) + ' Bytes' : (sizeOld / 1000).toFixed(2) + ' KB'
        const humanSizeMin =
          sizeNew < 100
            ? `${sizeNew.toFixed(1)} Bytes`
            : `${(sizeNew / 1000).toFixed(2)} KB`

        const end = performance.now()
        const deltaT = end - start
        const humanTime =
          deltaT < 1000
            ? `${deltaT.toFixed(0)}ms`
            : `${(deltaT / 1000).toFixed(1)}s`

        logServerMessage(`✓ Completed in ${humanTime}`)
        logServerMessage(
          `${
            htmlFiles.length + svgFiles.length
          } files minified (-${relative}) ${humanSizeMin}`,
        )
        // logServerMessage(`${htmlFiles.length} files minified from ${humanSizeOld} down to ${humanSizeMin}`)
      },
    },
  }
}

export default createIntegration
