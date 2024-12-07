const fs = require('fs');
const common = require('./Common.js');
const env = JSON.parse(fs.readFileSync('./env.json'));

exports.log = (message) => {

    logMessage(message, createLogFileIfDoesNotExist());

}

exports.logError = (err) => {

    exports.log(err.message);
    exports.log(JSON.stringify(err.stack));

}

function createLogFileIfDoesNotExist() {

    let date = new Date();
    date = formatDateForLogMessage(date);
    let currentDay = date.split(' ')[0];

    if (!fs.existsSync(`./logs`)) {
        fs.mkdirSync(`./logs`);
    }

    if (!fs.existsSync(`./logs/${currentDay}.txt`)) {
        fs.writeFileSync(`./logs/${currentDay}.txt`, '');
    }

    return {
        path: `./logs/${currentDay}.txt`,
        date: date
    };

}

function logMessage(message, logFile) {

    if (typeof message === 'object' && !Array.isArray(message) && message !== null) {

        message = JSON.stringify(message);

    }

    console.log(`[${logFile.date}] ${message}`);
    let appendText = `[${logFile.date}] ${message}\n`;
    fs.writeFileSync(logFile.path, appendText, { flag: "a+" });

}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDateForLogMessage(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}