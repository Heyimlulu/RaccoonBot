const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class RandomColorCommand extends Command {
    constructor() {
        super('randomcolor', {
            aliases: ['randomcolor', 'rndcolor'],
            category: 'utility',
            description: {
                content: 'Generate a random HEX color',
                usage: '[]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let color = Math.floor(Math.random() * 16777215).toString(16);

        let embed = new MessageEmbed()
            .setColor('#' + color)
            .setTitle('#' + color);

        await message.channel.send(embed);

    }
}

module.exports = RandomColorCommand;