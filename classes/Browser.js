const fs = require('fs');
const logger = require('./Logger.js');
const env = JSON.parse(fs.readFileSync('./env.json'));

exports.initiateBrowser = async () => {

    return new Promise(async (resolve) => {

        let stealthPluginSimple = require('puppeteer-extra-plugin-stealth');
        let puppeteer = require('puppeteer-extra');
        puppeteer.use(stealthPluginSimple());

        let browser = null;
        let page = null;

        try {

            let BROWSER_PARAMS = {
                executablePath: "/usr/bin/google-chrome-stable",
                ignoreHTTPSErrors: true,
                defaultViewport: null,
                args: [
                    '--start-maximized',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
                headless: env.showActualBrowser ? false : "new"
            };

            if (env.proxy && env.proxy.server) {
                BROWSER_PARAMS['args'].push(`--proxy-server=${env.proxy.server}`);
            }

            BROWSER_PARAMS['userDataDir'] = './cache';

            browser = await puppeteer.launch(BROWSER_PARAMS);
            page = (await browser.pages())[0];

            if (env.proxy && env.proxy.server && env.proxy.username) {
                await page.authenticate({
                    username: env.proxy.username,
                    password: env.proxy.password
                });
            }

        } catch (err) {

            logger.logError(err);

            try {
                await browser.close();
            } catch (err2) {
                logger.logError(err2);
            }

            resolve(false);
            return;

        }

        let cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));

        await page.setCookie(...cookies);

        resolve({
            browser: browser,
            page: page
        });
        return;

    });

};

exports.exitBrowser = async (browser, page) => {

    return new Promise(async (resolve) => {

        try {

            if (!fs.existsSync('./screenshots')) {
                fs.mkdirSync('./screenshots');
            }

            let browserProcess = browser.process().pid;

            try {
                await page.screenshot({
                    path: `./screenshots/${new Date()}.png`,
                    //path: `C:\\Users\\kteph\\Desktop\\promoter\\screenshots\\${new Date()}.png`,
                    fullPage: true
                });
            } catch (err) {
                logger.logError(err);
            }

            await page.close();
            await browser.close();

            try {
                process.kill(browserProcess);
            } catch (err) {
            }

        } catch (err) {
            logger.logError(err);
        }

        resolve();
        return;

    });

};