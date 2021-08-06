const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Donator = require('../../dbObjects').Donator;

class DonatorCommand extends Command {
    constructor() {
        super('donator', {
            aliases: ['donator'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Send you the list of currents donators/supporters',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const donator = await Donator.findAll({order: ['id']});

        if (!donator[0]) return message.channel.send(`No one support ${this.client.user.tag} yet`);

        let donatorMessage = `Here\'s every donators that support ${this.client.user.tag} 💛\n`;

        for (let i = 0; i < donator.length; i++) {
            donatorMessage += `\u0060${this.client.users.resolve(donator[i].get('userID').toString()).tag} : ${donator[i].get('donation').toString()}\u0060\n`;
        }

        await message.channel.send(donatorMessage);

    }
}

module.exports = DonatorCommand;