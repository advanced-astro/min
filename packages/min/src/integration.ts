import fs from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

import minifyHtml from '@minify-html/node'
import type { AstroIntegration } from 'astro'
import { glob } from 'glob'
import { performance } from 'perf_hooks'

import { optimize } from 'svgo'
import { logServerMessage } from './utils/logger.ts'
import { Options } from './utils/options.ts'

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

				const [cssFiles, htmlFiles, jsFiles, svgFiles] = await Promise.all([
					glob('**/*.css', { cwd, ignore: ['**/*-min.css', '**/*.min.css'] }),
					glob('**/*.html', { cwd }),
					glob('**/*.js', { cwd, ignore: ['**/*.min.js', '**/*.min.js'] }),
					glob('**/*.svg', { cwd }),
				])

				if (htmlFiles.length === 0 && svgFiles.length === 0) return

				/**
				 * A function that minifies and writes a file.
				 *
				 * @param {string} filename - the name of the file to minify and write
				 * @param {string} type - the type of file
				 * @return {Promise<void>} a Promise that resolves when the file is minified and written
				 */
				const minifyAndWriteFile = async (
					filename: string,
					type: string,
				): Promise<void> => {
					const filePath = join(cwd, filename)
					const fileOrg = await fs.promises.readFile(filePath, 'utf8')
					// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
					let fileMin
					if (type === 'svg') {
						fileMin = optimize(fileOrg, {
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
						await fs.promises.writeFile(filePath, fileMin.data, 'utf-8')
					} else {
						fileMin = minifyHtml.minify(
							Buffer.from(fileOrg),
							options != null ? options : {},
						)
						await fs.promises.writeFile(filePath, fileMin, 'utf-8')
					}
				}

				const minifyAndWritePromises = []

				for (const filename of cssFiles) {
					minifyAndWritePromises.push(minifyAndWriteFile(filename, 'css'))
				}
				for (const filename of htmlFiles) {
					minifyAndWritePromises.push(minifyAndWriteFile(filename, 'html'))
				}
				for (const filename of jsFiles) {
					minifyAndWritePromises.push(minifyAndWriteFile(filename, 'js'))
				}
				for (const filename of svgFiles) {
					minifyAndWritePromises.push(minifyAndWriteFile(filename, 'svg'))
				}

				await Promise.all(minifyAndWritePromises)

				const end = performance.now()
				const deltaT = end - start
				const humanTime =
					deltaT < 1000
						? `${deltaT.toFixed(0)}ms`
						: `${(deltaT / 1000).toFixed(1)}s`

				logServerMessage(`✴️ Completed in ${humanTime}`)
			},
		},
	}
}

export default createIntegration
