const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            category: 'admin',
            args: [
                {
                    id: 'member',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want to ban?',
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
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            channel: 'guild',
            description: {
                content: 'Ban user by mentions or by user ID',
                usage: '[@user] [reason] or [userID] [reason]',
                examples: ['@user he was mean', 'userID he was mean']
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
            return message.channel.send('Why do you want to ban me? :(');
        }

        if (member == message.author.id) {
            return message.channel.send('Why do you want to ban yourself?');
        }

        if (message.mentions.members.first()) { // IF => member already mentionned

            member = message.mentions.members.first();

            // Send a dm to the banned member
            await member.send(`You have been banned from **${message.guild.name}** for the following reasons: "**${reason}**"`, {files: ['./asset/gif/yoshi-you-have-been-banned.gif']})
                .catch(() => console.log("I couldn't send message to that user"));

            // Ban the member from the guild
            return member.ban({reason: `Banned by : ${message.author.username} for the following reasons : ${reason}`})
                // Send reply to the message author
                .then(() => message.reply(`${member.user.username} was successfully banned with the following reasons "${reason}".`))
                .catch(err => console.error(err));

        } else { // ELSE => after first prompt message

            message.guild.members.ban(member, {reason: `Banned by : ${message.author.username} for the following reasons : ${reason}`})
                .then(() => message.reply(`Member with ID : ${member} was successfully banned with the following reasons "${reason}"`))
                .catch(err => console.error(err));
        }

    }
}

module.exports = BanCommand;