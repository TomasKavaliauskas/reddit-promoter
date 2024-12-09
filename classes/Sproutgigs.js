const fs = require('fs');
const logger = require('./Logger.js');
const axios = require('axios');
const env = JSON.parse(fs.readFileSync('./env.json'));

exports.postJob = async function (post) {

    return new Promise(async (resolve, reject) => {

        let jobId = null;

        logger.log(`PROMOTING POST : ${post.post_link}`);

        try {

            if (!env.hasOwnProperty('sproutgigsApiKey') || !env.sproutgigsApiKey || env.sproutgigsApiKey.length === 0) {

                logger.log("SPROUTGIGS API KEY IS MISSING");
                resolve({
                    success: false,
                    reason: 'NO SPROUTGIGS API KEY PRESENT'
                });

            }

            // let response = await axios({
            //     method: 'post',
            //     url: 'https://sproutgigs.com/api/jobs/post-job.php',
            //     headers: {
            //         'Host': 'sproutgigs.com',
            //         'Authorization': `Basic ${Buffer.from(`${env.sproutgigsUserId}:${env.sproutgigsApiKey}`).toString('base64')}`,
            //         'Content-Type': 'application/json'
            //     },
            //     data: {
            //         "zone_id": "int",
            //         "category_id": "3790",
            //         "title": "Upvote a post",
            //         "instructions": [
            //             `Go to ${post.post_link}`,
            //             "Upvote a post"
            //         ],
            //         "proofs": [
            //             {
            //                 "description": "Reddit username you upvoted with",
            //                 "type": "text"
            //             }
            //         ],
            //         "num_tasks": post.upvotes,
            //         "task_value": 0.04,
            //         "speed": 1000,
            //         "ttr": 7,
            //         "hold_time": 15
            //     }
            // });

            //jobId = response.data.url.split('?Id=').pop();

            jobId = 'test';

        } catch (err) {

            logger.logError(err);

        }

        resolve({
            success: true,
            jobId: jobId
        });
        return;

    });

}