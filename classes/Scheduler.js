const fs = require('fs');
const logger = require('./Logger.js');

exports.getPost = function () {

    let posts = filterOutPosts(JSON.parse(fs.readFileSync('./posts.json', 'utf8')));

    return posts.length > 0 ? posts[0] : null;

}

exports.getPostToPromote = function()
{

    let posts = filterOutPostsForPromotion(JSON.parse(fs.readFileSync('./posts.json', 'utf8')));

    return posts.length > 0 ? posts[0] : null;

}

exports.posted = function (postArg, postUrl)
{

    let posts = JSON.parse(fs.readFileSync('./posts.json', 'utf8'));

    posts = posts.map(function (post) {
        if (post.subreddit === postArg.subreddit && post.title === postArg.title && post.link === postArg.link) {
            post.post_link = postUrl;
        }
        return post;
    });

    fs.writeFileSync('./posts.json', JSON.stringify(posts));

}

exports.promoted = function (postArg, jobId)
{

    let posts = JSON.parse(fs.readFileSync('./posts.json', 'utf8'));

    posts = posts.map(function (post) {
        if (post.subreddit === postArg.subreddit && post.title === postArg.title && post.link === postArg.link) {
            post.sproutgigs_job_id = jobId;
        }
        return post;
    });

    fs.writeFileSync('./posts.json', JSON.stringify(posts));

}

function filterOutPosts(posts) {

    return posts.filter(function (post) {

        if (post.hasOwnProperty('post_link') && post.post_link && post.post_link.length > 0) {
            return false;
        }

        if (!post.hasOwnProperty('post_at') || !post.post_at || post.post_at.length === 0) {
            return false;
        }

        if (!post.hasOwnProperty('title') || !post.title || post.title.length === 0) {
            return false;
        }

        if (!post.hasOwnProperty('link') || !post.link || post.link.length === 0) {
            return false;
        }

        if (post.title.length > 299) {

            logger.log(`POST TITLE IS TOO LONG: ${post.title}`);
            return false;

        }

        return dateInThePast(post.post_at);

    });

}

function filterOutPostsForPromotion(posts)
{

    return posts.filter(function (post) {

        if (post.hasOwnProperty('post_link') && post.post_link && post.post_link.length > 0) {
            
            if(!post.hasOwnProperty('sproutgigs_job_id') || !post.sproutgigs_job_id || post.sproutgigs_job_id.length === 0)
            {

                if(post.hasOwnProperty('upvotes') && post.upvotes > 0)
                {

                    return true;

                }

            }

        }

        return false;

    });

}

function dateInThePast(targetDateString) {

    let currentDate = new Date();
    let targetDate = new Date(targetDateString);

    return currentDate > targetDate;

}