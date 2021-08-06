const { Command } = require('discord-akairo');
const userBlacklist = require('../../dbObjects').userBlacklist;

class UserBlacklistCommand extends Command {
    constructor() {
        super('userblacklist', {
            aliases: ['userblacklist'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'id',
                    type: 'string'
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest'
                },
                {
                    id: 'remove',
                    match: 'flag',
                    flag: '--remove'
                }
            ],
            description: {
                content: 'Add a user to the blacklist',
                usage: '[userID] [reason]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let user = args.id;
        let reason = args.reason;

        const blacklist = await userBlacklist.findOne({where: {userID: user}});

        if (args.remove) {
            try {
                blacklist.destroy({where: {userID: user}});
                return message.channel.send('Successfully removed blacklisted user!');
            } catch {
                return message.channel.send('I couldn\'t find this userID');
            }
        }

        if (!blacklist) {
            const body = {userID: user, reason: reason};
            userBlacklist.create(body);
            return message.channel.send(`Successfuly blacklisted user: **${this.client.users.resolve(user).tag}** with reason: ${reason}!`);
        } else {
            const body = {reason: reason};
            blacklist.update(body, {where: {userID: user}});
        }
    }
}

module.exports = UserBlacklistCommand;