const { Command } = require('discord-akairo');
const cheerio = require('cheerio');
const axios = require('axios');

class DinosCommand extends Command {
    constructor() {
        super('dinos', {
            aliases: ['dinos', 'dinoscomics'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Retrieve a random comic from Dinos and Comics',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const i = Math.floor(Math.random() * 708);
        const response = await axios.get(`https://dinosandcomics.com/page/${i}/`);

        if (response.status >= 400 && response.status <= 499) await message.channel.send('I could not find any comic, please try again');

        const body = await response.data;
        const $ = cheerio.load(body);
        const img = $('div.post-image a img')[0].attribs.src;

        await message.channel.send({files: [img]});

    }
}

module.exports = DinosCommand;
