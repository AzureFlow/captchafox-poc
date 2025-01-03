import fetch from "node-fetch";
import fs from "fs";
import {randomFloat, randomInt, sha1} from "./utils.js";
import generateFingerprint from "./generateFingerprint.js";
import encodePayload from "./encodePayload.js";
import solvePOW from "./solvePOW.js";
import solveImage from "./solveImage.js";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SAVE_IMAGES = false;
const DEBUG = false;

const USER_AGENT_DATA = {
	brands: [
		{
			brand: "Google Chrome",
			version: "131",
		},
		{
			brand: "Chromium",
			version: "131",
		},
		{
			brand: "Not_A Brand",
			version: "24",
		},
	],
	mobile: false,
	platform: "Windows",
};

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const USER_AGENT_CH = USER_AGENT_DATA.brands.map(x => `"${x.brand}";v="${x.version}"`).join(", ");

const PLAYER_ICON_SIZE = 50;
const CAPTCHA_TYPE = "slide";


/**
 * @param {string} pageUrl
 * @param {string} siteKey
 * @param {string} userAgent
 * @param {string} language
 * @param {Agent} [proxyAgent]
 */
async function solveCaptcha({
								pageUrl,
								siteKey,
								userAgent = USER_AGENT,
								language = "en",
								proxyAgent = undefined,
							}) {
	const urlParsed = new URL(pageUrl);
	const hostname = urlParsed.hostname; // window.location.hostname
	const referer = `${urlParsed.origin}/`;

	const configResp = await fetch(`https://api.captchafox.com/captcha/${siteKey}/config?site=${urlParsed.origin + urlParsed.pathname}`, {
		method: "GET",
		compress: true,
		headers: {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"cache-control": "no-cache",
			"dnt": "1",
			"origin": urlParsed.origin,
			"pragma": "no-cache",
			"priority": "u=1, i",
			"referer": referer,
			"sec-ch-ua": USER_AGENT_CH,
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
			"user-agent": userAgent,
		},
		agent: proxyAgent,
	});
	/** @type {SiteConfigResponse|APIError} */
	const config = await configResp.json();
	DEBUG && console.log("config:", config);

	if(!configResp.ok) {
		throw new Error(`Failed to fetch config (${configResp.status}): ${config.error}`);
	}

	const fingerprint = await generateFingerprint({
		userAgent: USER_AGENT,
		userAgentData: USER_AGENT_DATA,
		pageUrl: urlParsed,
	});

	const challengePayloadRaw = {
		lng: language,
		// h: (config == null ? undefined : config.h) ?? (challengeContent == null ? undefined : challengeContent.h),
		h: (config == null ? undefined : config.h),
		cs: fingerprint,
		host: hostname,
		// POW, appears to be zero when the page is first loaded since no challenge has been received
		k: 0,
		type: CAPTCHA_TYPE,
	};
	DEBUG && fs.writeFileSync(`${__dirname}/../research/payloads/challengePayload.json`, JSON.stringify(challengePayloadRaw, null, 4));
	const challengePayload = encodePayload(challengePayloadRaw);

	const challengeResp = await fetch(`https://api.captchafox.com/captcha/${siteKey}/challenge`, {
		method: "POST",
		compress: true,
		body: challengePayload,
		headers: {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"cache-control": "no-cache",
			"content-type": "text/plain",
			"dnt": "1",
			"origin": urlParsed.origin,
			"pragma": "no-cache",
			"priority": "u=1, i",
			"referer": referer,
			"sec-ch-ua": USER_AGENT_CH,
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
			"user-agent": userAgent,
		},
		agent: proxyAgent,
	});
	/** @type {ChallengeResponse|APIError} */
	const challengeContent = await challengeResp.json();
	DEBUG && console.log("challengeContent:", challengeContent);

	if(!challengeResp.ok) {
		throw new Error(`Failed to fetch challenge (${challengeResp.status}): ${challengeContent.error}`);
	}

	const imgBuffer = Buffer.from(challengeContent.challenge.bg.substring(challengeContent.challenge.bg.indexOf(",")), "base64");
	const imgHash = sha1(imgBuffer);
	const imgPath = path.resolve(`${__dirname}/../research/images/${imgHash}.png`);

	if(fs.existsSync(imgPath)) {
		console.log(`Found duplicate image ("${imgHash}"): ${imgPath}`);
	}
	else {
		if(SAVE_IMAGES) {
			fs.writeFileSync(imgPath, imgBuffer);
		}
	}

	const imgSolution = await solveImage(imgBuffer);
	// console.log("imgSolution:", imgSolution);

	// Scale answer 0-300 (image is 600px and rendered at 300px)
	//  Player icon (fox.svg) is 50px x 50px
	// Plus/minus random offset because I feel like it
	//
	// await draw({
	//     ctx: canvas.getContext('2d'),
	//     url: challengeContent.challenge.bg,
	//     x: 0,
	//     y: canvas.height / window.devicePixelRatio - 60,
	//     h: 60, // original 120px height
	//     w: 300, // original 600px width
	// });
	const solutionX = Math.floor(imgSolution.x / 2) - (PLAYER_ICON_SIZE / 2) + randomInt(-5, 5);
	// console.log("solutionX:", solutionX);

	const solveTime = Math.round(randomFloat(0.5, 1.64) * 100) / 100;
	await new Promise(resolve => setTimeout(resolve, solveTime * 1000));

	const biometrics = {
		// Mouse events (max 80)
		// Doesn't matter, it's not verified anyways
		// const n8 = nj => {
		//     var nk;
		//     var nl;
		//     if(mS || !mU) {
		//         return false;
		//     }
		//     const nm = nj.clientX || ((nk = nj.changedTouches) === null || nk === undefined ? undefined : nk[0].clientX);
		//     const np = nj.clientY || ((nl = nj.changedTouches) === null || nl === undefined ? undefined : nl[0].clientY);
		//     const nq = nm - mZ.originX;
		//     const nv = np - mZ.originY;
		//     return nb(nq, nv);
		// };
		trail: [
			0,
			1,
			0,
			2,
			0,
			3,
			0,
			4,
			0,
			4,
			0,
			5,
			0,
			6,
			0,
			7,
			0,
			8,
			0,
			8,
			-1,
			9,
			-1,
			10,
			-1,
			11,
			-2,
			12,
			-2,
			12,
			-2,
			13,
			-3,
			14,
			-3,
			15,
			-3,
			16,
			-3,
			16,
			-3,
			17,
			-4,
			18,
			-4,
			19,
			-5,
			20,
			-5,
			21,
			-7,
			24,
			-7,
			25,
			-7,
			26,
			-7,
			27,
			-8,
			28,
			-9,
			28,
			-9,
			29,
			-9,
			30,
			-10,
			31,
			-11,
			32,
			-11,
			32,
			-11,
			33,
			-11,
			34,
			-12,
			35,
			-12,
			36,
		],
		// Math.round(nl * 100) / 100
		time: solveTime,
		solution: solutionX,
	};

	const verifyPayloadRaw = {
		sk: siteKey,
		mv: biometrics.trail ?? [],
		t: biometrics.time ?? 1,
		p: biometrics.solution ?? 0,
		h: challengeContent.h,
		cs: fingerprint,
		k: solvePOW(challengeContent.j),
		type: challengeContent.type,
		host: hostname,
	};
	DEBUG && fs.writeFileSync(`${__dirname}/../research/payloads/verifyPayload.json`, JSON.stringify(verifyPayloadRaw, null, 4));
	const verifyPayload = encodePayload(verifyPayloadRaw);

	const verifyResp = await fetch("https://api.captchafox.com/captcha/verify", {
		method: "POST",
		compress: true,
		body: verifyPayload,
		headers: {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"cache-control": "no-cache",
			"content-type": "text/plain",
			"dnt": "1",
			"origin": urlParsed.origin,
			"pragma": "no-cache",
			"priority": "u=1, i",
			"referer": referer,
			"sec-ch-ua": USER_AGENT_CH,
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
			"user-agent": userAgent,
		},
		agent: proxyAgent,
	});
	/** @type {VerifyResponse|APIError} */
	const verifyContent = await verifyResp.json();

	if(!verifyResp.ok) {
		throw new Error(`Failed to verify captcha (${verifyResp.status}): ${verifyContent.error}`);
	}

	DEBUG && console.log("verifyContent:", verifyContent);

	if(verifyContent.solved) {
		// TODO: Save every image hash and solution to a sqlite database
		return verifyContent.token;
	}

	throw new Error(`Unable to solve captcha (solved: ${verifyContent.solved} - failed: ${verifyContent.failed ?? false}): ${imgPath}`);
}

export default solveCaptcha;

/**
 * @typedef {object} SiteConfigResponse
 * @property {object} theme
 * @property {boolean} theme.branding
 * @property {object} theme.general
 * @property {string} theme.general.primaryLight
 * @property {string} theme.general.primary
 * @property {string} theme.general.successLight
 * @property {string} theme.general.success
 * @property {string} theme.general.errorLight
 * @property {string} theme.general.error
 * @property {number} theme.general.borderRadius
 * @property {string} h
 */

/**
 * @typedef {object} ChallengeResponse
 * @property {number} ttl
 * @property {string} h
 * @property {[number,string,string]} j
 * @property {object} i18n
 * @property {"slide"} type
 * @property {object} challenge
 * @property {string} challenge.bg
 * @property {string} challenge.player
 */

/**
 * @typedef {object} VerifyResponse
 * @property {boolean} solved
 * @property {boolean} [failed]
 * @property {string} [token]
 * @property {number} [ttl]
 */

/**
 * @typedef {object} APIError
 * @property {"RequestExpiredError"|string} error
 * @property {number} status
 */
