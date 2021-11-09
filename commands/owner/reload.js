const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            category: 'owner',
            args: [
                {
                    id: 'commandID'
                }
            ],
            description: {
                content: 'Reload a command',
                usage: '[8ball]',
                examples: ['8ball']
            },
            ownerOnly: true,
        });
    }

    async exec(message, args) {

        // `this` refers to the command object.
        this.handler.reload(args.commandID);
        return message.reply(`Reloaded command ${args.commandID}!`);
    }
}

module.exports = ReloadCommand;
