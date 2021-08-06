const { Command } = require('discord-akairo');

class SaydCommand extends Command {
    constructor() {
        super('sayd', {
            aliases: ['sayd'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES" ,'MANAGE_MESSAGES'],
            args: [
                {
                    id: 'sentence',
                    type: 'string',
                    prompt: {
                        start: 'What do you want me to say?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Write something you want the bot to repeat',
                usage: '[text]',
                examples: ['Hello ;)']
            }
        });
    }

    exec(message, args) {

        let sayd = args.sentence;

        message.delete();
        message.channel.send(sayd);

    }
}

module.exports = SaydCommand;