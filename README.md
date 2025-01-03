# CaptchaFox POC

This is a proof of concept project to automatically solve [CaptchaFox](https://captchafox.com/)'s CAPTCHA via requests. This project takes advantage of many basic and fundamental flaws with their new CAPTCHA.

## ⚙️ Installation

```sh
git clone https://github.com/AzureFlow/captchafox-poc.git
pnpm install

pnpm run start -- login username password
```

## 🔨 Usage

```js
import solveCaptcha from "./solveCaptcha.js";
const captchaToken = await solveCaptcha({
    pageUrl: "https://captchafox.com/",
    siteKey: "sk_xtNxpk6fCdFbxh1_xJeGflSdCE9tn99G",
});
console.log("Captcha solved:", captchaToken);
```