const { Command } = require('discord-akairo');
const guildBlacklist = require('../../dbObjects').guildBlacklist;

class GuildBlacklistCommand extends Command {
    constructor() {
        super('guildblacklist', {
            aliases: ['guildblacklist'],
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
                content: 'Add a guild to the blacklist',
                usage: '[guildID] [reason]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let guildID = args.id;
        let reason = args.reason;

        const blacklist = await guildBlacklist.findOne({where: {guildID: guildID}});

        if (args.remove) {
            try {
                blacklist.destroy({where: {guildID: guildID}});
                return message.channel.send('Successfully removed blacklisted guild!');
            } catch {
                return message.channel.send('I couldn\'t find this guildID');
            }
        }

        if (!blacklist) {
            const body = {guildID: guildID, reason: reason};
            guildBlacklist.create(body);
            return message.channel.send(`Successfuly blacklisted guild with ID **${guildID}** with reason: ${reason}!`);
        } else {
            const body = {reason: reason};
            blacklist.update(body, {where: {guildID: guildID}});
        }
    }
}

module.exports = GuildBlacklistCommand;