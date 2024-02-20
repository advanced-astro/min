/**
 * Logs a server message with a timestamp and a tag.
 *
 * @param {string} message - The message to be logged.
 * @return {void} This function does not return anything.
 */
export const logServerMessage = (message: string): void => {
	const date = new Date().toLocaleTimeString()
	console.log(`${date} \x1b[32mastro-min:\x1b[0m ${message}`)
}
