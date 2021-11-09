const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class YearCommand extends Command {
    constructor() {
        super('year', {
            aliases: ['year'],
            category: 'general',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'How many times left before the next year?',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const currentYear = new Date();
        const nextYear = new Date(currentYear);

        nextYear.setFullYear(currentYear.getFullYear() + 1); // Get next year
        nextYear.setHours(0,0,0,0); // Set hours, minutes, seconds and milliseconds to 0
        nextYear.setMonth(0, 1) // Set first month as January

        const duration = nextYear - currentYear;
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / 1000 / 60) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`There are **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds** until **${nextYear.getFullYear()}**`);

        await message.channel.send(embed);

    }
}

module.exports = YearCommand;