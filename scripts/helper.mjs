import { statSync } from "node:fs";

export async function isDirExist(name) {
	try {
		const stat = statSync(name);
		return stat.isDirectory();
	} catch (error) {
		return false;
	}
}

/**
 * @param {string} name
 */
export function capitalize(name) {
	return `${name[0].toUpperCase()}${name.slice(1)}`;
}

/**
 * @param {string} str
 */
export function convertToKebabCase(str) {
	return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
