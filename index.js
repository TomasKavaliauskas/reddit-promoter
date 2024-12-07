const fs = require('fs');
const bot = require('./classes/Bot.js');
const common = require('./classes/Common.js');
const scheduler = require('./classes/Scheduler.js');
const logger = require('./classes/Logger.js');
const sproutgigs = require('./classes/Sproutgigs.js');
const env = JSON.parse(fs.readFileSync('./env.json'));

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

            let response = await bot.post(post);

            if (response.success) {

                logger.log(`POSTED! POST LINK : ${response.postUrl}`);
                scheduler.posted(post, response.postUrl);

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