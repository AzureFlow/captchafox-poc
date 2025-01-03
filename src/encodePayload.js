import {gzipSync} from "fflate";

const textEncoder = typeof TextEncoder != "undefined" && new TextEncoder();

/**
 * @param {object} payload
 * @returns {Buffer}
 */
function encodePayload(payload) {
	const rawPayload = preparePayload(payload);
	const compressedPayload = gzipSync(rawPayload);

	// Allocate buffer for compressed payload + 2 bytes for the fake gzip header
	const result = new Uint8Array(new ArrayBuffer(2 + compressedPayload.length));

	// Hide gzip header: 1F 8B
	// Replace with: 01 04
	let idx = 0;
	result[idx++] = 1;
	result[idx++] = 4;

	// XOR payload with index + 4
	for(let i = 0; i < compressedPayload.length; ++i) {
		result[idx++] = compressedPayload[i] ^ i + 4;
	}

	return Buffer.from(result);
}

/**
 * @param {object} payload
 */
function preparePayload(payload) {
	const strPayload = JSON.stringify(payload);
	if(textEncoder) {
		return textEncoder.encode(strPayload);
	}

	throw new Error("TextEncoder is not supported");
}

export default encodePayload;