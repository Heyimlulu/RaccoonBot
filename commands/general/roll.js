const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll', 'dice'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'amount',
                    type: 'integer',
                    optional: true
                }
            ],
            description: {
                content: 'Roll 2 dices',
                usage: '[amount]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let dices;
        let dicesNumber;
        let result = 0;
        let j = 1;

        if (args.amount > 9) return message.reply('I can\'t roll more than 9 dices');

        if (args.amount) { dicesNumber = args.amount; }
        else { dicesNumber = 2; }

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('🎲\u2000Roll')

        for (let i = 0; i < dicesNumber; i++) {
            dices = Math.floor(Math.random() * 6) + 1;
            result += dices;
            embed.addField(`Dice ${j++}`, dices, true)
        }

        embed.setDescription(`Total: ${result}`);

        await message.channel.send(embed);

    }
}

module.exports = RollCommand;
