const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class ChooseCommand extends Command {
    constructor() {
        super('choose', {
            aliases: ['choose'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'choices',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Randomly choose between the choices you provide. (use | to separate choices)',
                usage: '[choice1 | choice2 | choice3]',
                examples: ['cats | dogs | others']
            }
        });
    }

    async exec(message, args) {

        if (!args.choices) return;

        let choices = args.choices.trim().split('|');

        if (!choices.includes(choices[1])) return message.channel.send('I need at least 2 arguments to make a choice ;)');

        let i = Math.floor((Math.random() * choices.length));

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(choices[i]);

        await message.channel.send(embed);

    }
}

module.exports = ChooseCommand;