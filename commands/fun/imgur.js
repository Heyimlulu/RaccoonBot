const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const censor = require("../../json/censor.json");

class ImgurCommand extends Command {
    constructor() {
        super('imgur', {
            aliases: ['imgur'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'img',
                    type: 'string',
                    prompt: {
                        start: 'Which image would you like to share?'
                    }
                }
            ],
            description: {
                content: 'Send some random images from imgur',
                usage: '[cat]',
                examples: ['cat']
            }
        });
    }

    async exec(message, args) {

        let search = args.img;

        fetch(`https://api.imgur.com/3/gallery/search/viral/top/0?q=${search}`, {
            headers: {'Authorization': `Client-ID ${process.env.IMGUR_SECRET_KEY}`},
        }).then((response) => {
            return response.json();

        }).then((response) => {

            if (response.success == 'false') return message.channel.send('An error has occurred');

            let badWordFound = false;

            // Check if user input contains censored word
            for (let findWord in censor) {
                if (search.toLowerCase().includes(censor[findWord].toLowerCase())) {
                    badWordFound = true;
                }
            }

            if (badWordFound == true) {

                message.delete();
                message.channel.send('Sorry, that word is unavailable or has been blacklisted');

            } else {

                const i = Math.floor((Math.random() * response.data.length));

                if (response.data[i].hasOwnProperty('title')){
                    var title = response.data[i].title;
                } else {
                    var title = 'Untitled';
                }

                message.channel.send(`**${title}**\n${response.data[i].link}`)

            }

        });

    }
}

module.exports = ImgurCommand;