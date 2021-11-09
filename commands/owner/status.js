const { Command } = require('discord-akairo');

class StatusCommand extends Command {
    constructor() {
        super('status', {
            aliases: ['status'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'status',
                    type: 'string',
                    prompt: {
                        start: 'Which status should I have?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Change the status for the bot',
                usage: '[status]',
                example: ['Hello World!']
            }
        });
    }

    async exec(message, args) {

        await this.client.user.setActivity(args.status);

        await message.channel.send(`Status have been set to **${args.status}**`);

    }
}

module.exports = StatusCommand;
