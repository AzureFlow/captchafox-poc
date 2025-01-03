import solveCaptcha from "./solveCaptcha.js";

// const siteKey = "sk_xtNxpk6fCdFbxh1_xJeGflSdCE9tn99G"; // demo key
// const url = "https://captchafox.com/";

const siteKey = "sk_WTsTCEH6Kswd_Y5Lmhe2eMARiBTJoScs"; // register
const url = "https://portal.captchafox.com/register?ref=index";

let successful = 0;
let failed = 0;
for(let i = 0; i < 10; i++) {
	try {
		const captchaToken = await solveCaptcha({
			pageUrl: url,
			siteKey: siteKey,
		});
		console.log(`${i + 1}. Captcha solved:`, captchaToken);
		successful++;
	}
	catch(err) {
		console.error("Error solving captcha:", err);
		failed++;
	}

	console.log(`Successful: ${successful}, Failed: ${failed} = ${Number((successful / (successful + failed) * 100).toFixed(2))}%`);
}

