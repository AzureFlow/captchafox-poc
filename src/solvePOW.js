import {sha256} from "./utils.js";

// const worker = new Worker("https://cdn.captchafox.com/c60315294988998c/w.CbV3njQa.js");
// const s1 = (challengeContent == null ? undefined : challengeContent.j) || config.m;
// await new Promise(resolve => {
// 	worker.onmessage = function(msg) {
// 		if(typeof msg.data == "number") {
// 			resolve(msg.data);
// 		}
// 	};
//
// 	worker.postMessage(s1);
// });

/**
 * @param {[number, string, string]} input
 * @returns {number}
 */
function solvePOW(input) {
	if(input.length !== 3) {
		throw new TypeError("Invalid input");
	}

	const hash = input[1];
	const difficulty = parseInt(input[2], 2);

	let guess = 0;
	while(true) {
		if(checkLeadingZeros(sha256(hash + guess.toString()), difficulty)) {
			return guess;
		}

		guess++;
	}
}

/**
 * @param {string} str
 * @param {number} len
 * @returns {boolean}
 */
function checkLeadingZeros(str, len) {
	if(str.length < len + 1) {
		return false;
	}

	const substr = str.substring(0, len);
	const zeros = "0".repeat(len);

	return substr === zeros;
}

export default solvePOW;