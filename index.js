const fs = require('fs');
const bot = require('./classes/Bot.js');
const common = require('./classes/Common.js');
const scheduler = require('./classes/Scheduler.js');
const logger = require('./classes/Logger.js');
const sproutgigs = require('./classes/Sproutgigs.js');
const env = JSON.parse(fs.readFileSync('./env.json'));
const axios = require('axios');

(async () => {

    if (env.testMode) {
        await test();
    } else {
        while (true) {
            await post();
            await promote();
            await common.sleep(60);
        }
    }

})();

async function post() {

    return new Promise(async (resolve, reject) => {

        let post = scheduler.getPost();

        if (post) {
            if (await postIsInvalid(post)) {
                logger.log(`POST ${JSON.stringify(post)} IS INVALID, EXITING...`);
                process.exit();
            }
            let sleepInSeconds = common.getRandomInt(300, 600);
            logger.log(`SLEEPING FOR ${sleepInSeconds} SECONDS BEFORE POSTING`);
            await common.sleep(sleepInSeconds);
            let response = await bot.post(post);
            if (response.success) {
                logger.log(`POSTED! POST LINK : ${response.post.post_link}`);
                scheduler.posted(post);
                postMade = true;
            } else {
                process.exit();
            }
        }

        resolve();
        return;

    });

}

async function promote() {

    return new Promise(async (resolve, reject) => {

        let post = scheduler.getPostToPromote();

        if (post) {
            let response = await sproutgigs.postJob(post);
            if (response.success) {
                logger.log(`PROMOTED! JOB ID : ${response.jobId}`);
                scheduler.promoted(post, response.jobId);
            } else {
                process.exit();
            }
        }

        resolve();
        return;

    });

}

async function test() {

    return new Promise(async (resolve, reject) => {

        await bot.test();

        resolve();
        return;

    });

}

async function postIsInvalid(post) {

    return new Promise(async (resolve, reject) => {

        try {

            if (post.title.length < 5 || post.title.length > 299) {

                logger.log(`POST ${JSON.stringify(post)} TITLE IS TOO SHORT OR TOO LONG`);
                resolve(true);
                return;

            }

            let response = await axios({
                method: 'GET',
                url: post.link,
                validateStatus: () => true
            });

            let linkExists = response.status === 200;

            if (!linkExists) {

                logger.log(`POST ${JSON.stringify(post)} REDGIF LINK DOES NOT EXIST`);

            }

            resolve(response.status !== 200);
            return;

        } catch (err) {

            logger.logError(err);
            resolve(true);
            return;

        }

    });

}
