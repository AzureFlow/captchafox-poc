import {PNG} from "pngjs";
import ndarray from "ndarray";
import {readFile} from "fs/promises";
import {average} from "./utils.js";

// const GAP_PIXELS = Math.floor(92 / 2);
const GAP_PIXELS = 23;
const SEARCH_SEGMENTS = [10, 25, 60, 95, 105];

/**
 * @param {string|Buffer} input
 * @returns {Promise<{x: number, y: number}>} (X, Y) coordinates
 */
async function solveImage(input) {
	let imgBgContent;
	if(Buffer.isBuffer(input)) {
		imgBgContent = input;
	}
	else {
		imgBgContent = await readFile(input);
	}

	return new Promise((resolve, reject) => {
		const png = new PNG();
		png.parse(imgBgContent, (err, imgData) => {
			if(err) {
				reject(err);
				return;
			}

			const pixels = ndarray(new Uint8Array(imgData.data),
				[imgData.width | 0, imgData.height | 0, 4],
				[4, 4 * imgData.width | 0, 1],
				0,
			);

			// Only search a thin 1pixel slice
			const result = findColorHorizontal(pixels);
			if(result === null) {
				reject("Pixel not found");
				return;
			}

			resolve(result);
		});
	});
}

/**
 * Raycast until a non-empty pixel is hit. Repeat x number of times and average the results.
 * @param {ndarray.NdArray<Uint8Array>} pixels
 * @returns {{x: number, y: number}|null} (X, Y) coordinates
 */
function findColorHorizontal(pixels) {
	// noinspection JSUnusedLocalSymbols
	const [sizeX, sizeY, colorDepth] = pixels.shape;

	/** @type {{x: number, y: number}[]} */
	const matches = [];
	for(const y of SEARCH_SEGMENTS) {
		// Only search a thin 1pixel slice
		for(let x = 0; x < sizeX; x++) {
			const r1 = pixels.get(x, y, 0);
			const g1 = pixels.get(x, y, 1);
			const b1 = pixels.get(x, y, 2);
			const a1 = pixels.get(x, y, 3);
			// console.log({ r1, g1, b1, a1 });

			// #55ACEE
			// if(r1 === 85 && g1 === 172 && b1 === 238 && a1 === 255) {

			// Look for any non-empty pixels
			if(r1 !== 0 && g1 !== 0 && b1 !== 0 && a1 === 255) {
				matches.push({
					x: x,
					y: y,
				});
				break;
			}
		}
	}

	// console.log("matches:", matches);

	if(matches.length === 0) {
		return null;
	}

	return {
		x: Math.floor(average(matches.map(m => m.x))) + GAP_PIXELS,
		y: Math.floor(average(matches.map(m => m.y))),
	};
}

export default solveImage;