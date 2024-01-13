/**
 * Logs a server message with a timestamp and a tag.
 *
 * @param {string} message - The message to be logged.
 * @return {void} This function does not return anything.
 */
export const logServerMessage = (message: string): void => {
  const date = new Date().toLocaleTimeString()
  console.log(`\x1b[90m${date}\x1b[0m \x1b[36m[astro-min]\x1b[0m ${message}`)
}
