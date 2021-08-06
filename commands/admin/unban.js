const { Command } = require('discord-akairo');

class UnbanCommand extends Command {
    constructor() {
        super('unban', {
            aliases: ['unban'],
            category: 'admin',
            args: [
                {
                    id: 'member',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want to unban?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                }
            ],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            channel: 'guild',
            description: {
                content: 'Unban user by user ID',
                usage: '[userID]',
                examples: ['829230505123119164']
            }
        });
    }

    async exec(message, args) {

        let member = args.member.toString();

        message.guild.members.unban(member)
            .then(() => message.reply(`Member with ID : ${member} was successfully unbanned`))
            .catch(err => console.error(err));

    }
}

module.exports = UnbanCommand;