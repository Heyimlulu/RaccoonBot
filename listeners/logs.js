const { Listener } = require('discord-akairo');
const { owner, prefix } = require('../config.json');
const Logs = require('../models').logs;

class LogsListener extends Listener {
    constructor() {
        super('logs', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

        // IF => message is from the bot or the owner => ignore it
        if (message.author.bot || message.author.id === owner) return;

        // IF => message does not start with the prefix => ignore it
        if (!message.content.startsWith(prefix)) return;

        let date;
        let today = new Date();

        let dd = today.getDate(); // Day
        let mm = today.getMonth() + 1; // Month
        let yyyy = today.getFullYear(); // Year

        today = yyyy + '-' + mm + '-' + dd;

        // Get current hour
        let time = new Date();
        let currentTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

        date = today + ' ' + currentTime;

        const body = {
            user: message.author.tag,
            userID: message.author.id,
            message: message.content,
            createdAt: date,
            updatedAt: date
        };

        Logs.create(body);

    }
}

module.exports = LogsListener;