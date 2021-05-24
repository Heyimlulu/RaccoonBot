const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');

class NekoCommand extends Command {
    constructor() {
        super('neko', {
            aliases: ['neko'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random neko anime character. (Some images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

        fetch('https://waifu.pics/api/sfw/neko').then(response => {
            return response.json();
        }).then(response => {

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setImage(response.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);


        })

    }
}

module.exports = NekoCommand;