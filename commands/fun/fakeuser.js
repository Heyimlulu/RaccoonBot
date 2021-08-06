const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class FakeUserCommand extends Command {
    constructor() {
        super('fakeuser', {
            aliases: ['fakeuser'],
            category: 'fun',
            clientPermissions: ['MANAGE_WEBHOOKS'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Which user should I fake?'
                    }
                },
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What message should I send?'
                    },
                    match: 'rest'
                }
            ],
            channel: 'guild',
            description: {
                content: 'Fake a user using webhook',
                usage: '[user] [text]',
                examples: ['user Hello']
            }
        });
    }

    async exec(message, args) {

        let username = args.user.username;
        let member = message.guild.members.resolve(args.user.id);
        let text = args.text;

        // Show nickname if user is in guild
        if (member) {
            if (member.nickname) {
                username = member.nickname;
            }
        }

        message.channel.createWebhook(username, {
            avatar: args.user.displayAvatarURL(),
            reason: `Fakeuser command triggered by: ${message.author.username}`
        }).then(webhook => {

                webhook.edit({
                    name: username,
                    avatar: args.user.displayAvatarURL(),
                    reason: `Fakeuser command triggered by: ${message.author.username}`
                });

                this.client.fetchWebhook(webhook.id)
                    .then(webhook => {
                        message.delete();

                        webhook.send(text);

                        setTimeout(() => {
                            webhook.delete({
                                reason: `Fakeuser command triggered by: ${message.author.username}`
                            });
                        }, 3000);
                    });

            });

    }
}

module.exports = FakeUserCommand;