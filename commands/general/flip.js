const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class FlipCommand extends Command {
    constructor() {
        super('flip', {
            aliases: ['flip', 'coin'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Flip a coin',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let coin = [
            'Tails',
            'Heads'
        ];

        let coinFlip = coin[Math.floor(Math.random() * (coin.length))];

        const flipEmbed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('🪙\u2000Coin flip')
            .setDescription(`It's **${coinFlip}**`)

        await message.channel.send(flipEmbed);

    }
}

module.exports = FlipCommand;
