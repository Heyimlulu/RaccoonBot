const { Command } = require('discord-akairo');
const cheerio = require('cheerio');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

class PetitTubeCommand extends Command {
    constructor() {
        super('petittube', {
            aliases: ['petittube'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Fetch a random video from https://petittube.com/. (Some videos might be NSFW, so be careful!)',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        if (!message.channel.nsfw) return message.channel.send('Sorry, you must be in a NSFW channel to fetch a random video!')

        await axios.get('https://petittube.com/')
        .then(async (response) => {

            const body = response.data;

            const $ = cheerio.load(body);
            const url = $('iframe')[0].attribs.src;
            
            let embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(`Click [here](${url}) to view the video!`)
                .setThumbnail('https://petittube.com/title.png')
                .setFooter('Videos might be NSFW so be careful')

            await message.channel.send(embed);
        });
    }
}

module.exports = PetitTubeCommand;
