const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const censor = require("../../json/censor.json");

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

        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_SECRET_KEY}&q=${search}&limit=10&offset=0&rating=g&lang=en`).then((response) => {
            
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

                let title;
                const i = Math.floor((Math.random() * response.data.length));

                if (response.data[i].hasOwnProperty('title')){
                    title = response.data[i].title;
                } else {
                    title = 'Untitled';
                }

                message.channel.send(`**${title}**\n${response.data[i].url}`);

            }

        });

    }
}

module.exports = GiphyCommand;