const { Command } = require('discord-akairo');

class UsernameCommand extends Command {
    constructor() {
        super('username', {
            aliases: ['username'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'username',
                    type: 'string',
                    prompt: {
                        start: 'Which name should I have?'
                    }
                }
            ],
            description: {
                content: "Change the bot's name",
                usage: '[name]',
                example: ['name']
            }
        });
    }

    exec(message, args) {

        this.client.user.setUsername(args.username);

        message.channel.send(`My username has been changed to ${args.username}`);

    }
}

module.exports = UsernameCommand;