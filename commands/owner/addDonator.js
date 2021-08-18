const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { Donator } = require('../../models').donator;

class AddDonatorCommand extends Command {
    constructor() {
        super('adddonator', {
            aliases: ['adddonator'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'id',
                    type: 'string'
                },
                {
                    id: 'donation',
                    type: 'string'
                },
                {
                    id: 'remove',
                    match: 'flag',
                    flag: '--remove'
                }
            ],
            description: {
                content: 'Add a donator/supporter to the donators list',
                usage: '[userID] [donation]',
                example: ['userID 2$']
            }
        });
    }

    async exec(message, args) {

        let user = args.id;
        let donations = args.donation;

        const donator = await Donator.findOne({where: {userID: user}});

        if (args.remove) {
            try {
                donator.destroy({where: {userID: user}});
                return message.channel.send('Successfully removed userID from donators!');
            } catch {
                return message.channel.send('I couldn\'t find this userID!');
            }
        }

        if (!donator) {
            const body = {userID: user, donation: donations};
            Donator.create(body);
            return message.channel.send(`Successfuly added a new donator: ${this.client.users.resolve(user).tag} with ${donations} donation!`);
        } else {
            const body = {donation: donations};
            donator.update(body, {where: {userID: user}});
        }
    }
}

module.exports = AddDonatorCommand;