const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');

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

    exec(message, args) {

        fetch("http://api.adviceslip.com/advice").then((response) => {
            return response.json();

        }).then((response) => {
            const adviceEmbed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(`${this.client.user.username}`)
                .setTitle('Random advice')
                .setDescription(response.slip.advice)

            message.channel.send(adviceEmbed);
        })

    }
}

module.exports = AdviceCommand;