const { Listener } = require('discord-akairo');

class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, type, missing) {

        switch(type) {
            case 'client': // The bot
                if (missing == 'SEND_MESSAGES') {
                    return;
                } else {
                    message.reply(`I'm missing theses permissions: \u0060${missing}\u0060 for the ${command.id} command!`);
                }
                break;
            case 'user': // The users
                if (missing == 'SEND_MESSAGES') {
                    return;
                } else {
                    message.reply(`You are missing theses permissions: \u0060${missing}\u0060 for the ${command.id} command!`);
                }
                break;
        }

    }
}

module.exports = MissingPermissionsListener;