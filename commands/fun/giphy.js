const { Command } = require('discord-akairo');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const censor = require("../../json/censor.json");
const Infraction = require('../../models').infraction;
const dateUtils = require('../../utils/datetime');

class GiphyCommand extends Command {
    constructor() {
        super('giphy', {
            aliases: ['giphy'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'gif',
                    type: 'string',
                    prompt: {
                        start: 'Which gif would you like to share?'
                    }
                }
            ],
            description: {
                content: 'Send some random animated images from giphy',
                usage: '[cat]',
                examples: ['cat']
            }
        });
    }

    async exec(message, args) {

        let search = args.gif;

        await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_SECRET_KEY}&q=${search}&limit=10&offset=0&rating=g&lang=en`)
        .then(async (response) => {

            const result = await response.data;

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
                    command: 'giphy',
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

                await message.channel.send(`**${title}**\n${result.data[i].url}`);
            }
        }).catch((error) => message.channel.send(`An error has occurred: **${error}**`))
    }
}

module.exports = GiphyCommand;
