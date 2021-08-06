const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            category: 'admin',
            args: [
                {
                    id: 'member',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want to kick?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                },
                {
                    id: 'reason',
                    type: 'string',
                    prompt: {
                        start: "What's the reason?",
                        optional: true
                    },
                    match: "rest"
                }
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            channel: 'guild',
            description: {
                content: 'Kick user',
                usage: '[@user] [reason]',
                examples: ['@user he was a douche', 'userID he was a douche']
            }
        });
    }

    async exec(message, args) {

        let member = args.member;
        let reason = args.reason;

        if (!reason) {
            reason = 'Nothing has been specified';
        }

        if (member == '829230505123119164') {
            return message.channel.send('Why do you want to kick me? :(');
        }

        if (member == message.author.id) {
            return message.channel.send('Why do you want to kick yourself?');
        }

        // Send a dm to the kicked member
        await member.send(`You have been kicked from **${message.guild.name}** for the following reasons: "**${reason}**"`, {files: ['./asset/img/yoshi-you-have-been-banned.gif']})
            .catch(() => console.log("I couldn't send message to that user"));

        // Kick the member from the guild
        return member.kick({reason: `Kicked by : ${message.author.username} for the following reasons : ${reason}`})
            // Send reply to the message author
            .then(() => message.reply(`${member.user.username} was successfully kicked with the following reasons "${reason}"`))
            .catch(err => console.error(err));

    }
}

module.exports = KickCommand;