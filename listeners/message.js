const { Listener } = require('discord-akairo');
const userBlacklist = require('../dbObjects').userBlacklist;

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

        const blacklist = await userBlacklist.findOne({where: {userID: message.author.id}});

        if (blacklist) return;

    }
}

module.exports = MessageListener;