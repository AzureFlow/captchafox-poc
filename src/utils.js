import {createHash} from "node:crypto";

/**
 * @param {import("node:crypto").BinaryLike} buffer
 * @returns {string}
 */
export function sha1(buffer) {
	return createHash("sha1").update(buffer).digest("hex");
}

/**
 * @param {import("node:crypto").BinaryLike} buffer
 * @returns {string}
 */
export function sha256(buffer) {
	return createHash("sha256").update(buffer).digest("hex");
}

/**
 * @template T
 * @param {T[]} items
 * @returns {T}
 */
export function randomItem(items) {
	return items[Math.floor(Math.random() * items.length)];
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * @param {number[]} values
 * @returns {number}
 */
export function average(values) {
	return values.reduce((a, b) => a + b, 0) / values.length;
}