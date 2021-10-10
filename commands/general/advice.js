const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

class AdviceCommand extends Command {
    constructor() {
        super('advice', {
            aliases: ['advice'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Send a message using the spoiler tag',
                usage: '[Hello World]',
                examples: ['Hello World']
            }
        });
    }

    async exec(message, args) {

        await axios.get('http://api.adviceslip.com/advice')
        .then(async (response) => {

            const result = response.data;

            const adviceEmbed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(`${this.client.user.username}`)
            .setTitle('Random advice')
            .setDescription(result.slip.advice)

            await message.channel.send(adviceEmbed);

        })

    }
}

module.exports = AdviceCommand;