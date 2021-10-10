const { Command } = require('discord-akairo');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const censor = require("../../json/censor.json");
const Infraction = require('../../models').infraction;
const dateUtils = require('../../utils/datetime');

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

        await axios.get(`https://api.imgur.com/3/gallery/search/viral/top/0?q=${search}`, {
            headers: {
                "Authorization": `Client-ID ${process.env.IMGUR_SECRET_KEY}`
            }
        }).then(async (response) => {

            const result = response.data;

            let badWordFound = false;

            // Check if user input contains censored word
            for (let findWord in censor) {
                if (search.toLowerCase().includes(censor[findWord].toLowerCase())) {
                    badWordFound = true;
                }
            }

            if (badWordFound == true) {
                let date = await dateUtils();

                const body = {
                    user: message.author.tag,
                    userID: message.author.id,
                    message: message.content,
                    command: 'imgur',
                    createdAt: date,
                    updatedAt: date
                };

                Infraction.create(body);

                await message.delete();
                await message.channel.send('Sorry, that word is unavailable or has been blacklisted');
            } else {
                const i = Math.floor((Math.random() * result.data.length));

                if (result.data[i].hasOwnProperty('title')) {
                    var title = result.data[i].title;
                } else {
                    var title = 'Untitled';
                }

                await message.channel.send(`**${title}**\n${result.data[i].link}`)
            }
        }).catch((error) => {
            return message.channel.send(`An error has occurred: ${error}`);
        })
    }
}

module.exports = ImgurCommand;