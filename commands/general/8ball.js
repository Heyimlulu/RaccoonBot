const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const answer = require('../../json/commands/8ball.json');

class EightBallCommand extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball', 'eightball'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'say',
                    type: 'string',
                    prompt: {
                        start: 'You need to ask the 8ball a question!'
                    },
                    match: "rest"
                }
            ],
            description: {
                content: 'Fortune-telling or seeking advice',
                usage: '[text]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let ask = args.say;
        let reply = answer[Math.floor(Math.random() * answer.length) + 1];

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(ask)
            .setDescription(reply)

        await message.channel.send(embed);

    }
}

module.exports = EightBallCommand;