const { Command } = require('discord-akairo');

class SpoilerCommand extends Command {
    constructor() {
        super('spoiler', {
            aliases: ['spoiler'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES" ,'MANAGE_MESSAGES'],
            args: [
                {
                    id: 'spoil',
                    type: 'string',
                    prompt: {
                        start: 'What do you want me to spoil?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Send a message using the spoiler tag',
                usage: '[Hello World]',
                examples: ['Hello World']
            }
        });
    }

    exec(message, args) {

        let spoiler = args.spoil;

        message.delete();
        message.channel.send('||' + spoiler + '||');

    }
}

module.exports = SpoilerCommand;