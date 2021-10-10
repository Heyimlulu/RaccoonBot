const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MathCommand extends Command {
    constructor() {
        super('math', {
            aliases: ['math'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'calculation',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Solve basic math calculation',
                usage: '[(1 + 1) * 10]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        try {
            let calculation = args.calculation; // Get user input
            let result = eval(calculation.trim()); // Get result

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Solution')
                .setDescription(`${calculation} = __${result}__`);

            await message.channel.send(embed);
        } catch {
            return message.channel.send('Uh ho.. there was an error with this calculation. Please try again!');
        }

    }
}

module.exports = MathCommand;