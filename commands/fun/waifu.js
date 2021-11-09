const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const axios = require('axios');

class WaifuCommand extends Command {
    constructor() {
        super('waifu', {
            aliases: ['waifu'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Get a random Waifu. (Some images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        // if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

        await axios.get('https://waifu.pics/api/sfw/waifu')
        .then(async (response) => {

            const result = response.data;

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setImage(result.url)
                .setFooter('Powered by waifu.pics')

            message.channel.send(embed);

        })

    }
}

module.exports = WaifuCommand;