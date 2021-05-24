const { Inhibitor } = require('discord-akairo');
const blacklistID = require('../json/blacklistID.json');

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message) {
        const blacklist = [blacklistID];
        return blacklist.includes(message.author.id);
    }
}

module.exports = BlacklistInhibitor;