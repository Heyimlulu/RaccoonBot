const { Command } = require('discord-akairo');

class PruneCommand extends Command {
    constructor() {
        super('prune', {
            aliases: ['prune'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    id: 'amount',
                    type: 'integer',
                    prompt: {
                        start: 'For how many days of inactivity do you want to prune members?'
                    }
                },
                {
                    id: 'reason',
                    type: 'string',
                    optional: true,
                    match: 'rest'
                }
            ],
            channel: 'guild',
            description: {
                content: 'Prunes inactive members from a guild',
                usage: '[days] [reason]',
                examples: ['7 too many people']
            }
        });
    }

    async exec(message, args) {

        let days = args.amount;
        let reason = args.reason;

        if (days > 30) return message.channel.send('I can\'t prune users more than 30 days!');

        if (!reason) {
            reason = 'No reason specified';
        }

        // Actually prune the members
        message.guild.members.prune({ days: days, count: false , reason: reason })
            .then((pruned) => {
                if (!pruned) return message.channel.send('I have nobody to prune');
                message.channel.send(`I just pruned \u0060${pruned} people\u0060 with \u0060${days} days of inactivity\u0060!`)
            })
            .catch(console.error);

    }
}

module.exports = PruneCommand;