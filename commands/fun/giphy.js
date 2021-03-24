const fetch = require('node-fetch');
const config = require("../../json/config.json");
const blacklist = require("../../json/blacklist.json");

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: 'giphy',
    description: 'Send some random gif from giphy!',
    category: 'fun',
    execute(message) {

        let giphySearch = message.content.split(`${config.prefix}giphy`).join("")

        if (giphySearch == '') {
            message.reply("Invalid search argument");
        } else {
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_SECRET_KEY}=${giphySearch}`).then((response) => {
                return response.json();
            }).then((response) => {
                if (response.success == 'false') return message.channel.send('An error has occurred');

                let badWordFound = false;

                // Check if blacklist contains user input
                for (var i in blacklist) {
                    if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) {
                        badWordFound = true;
                    }
                }

                if (badWordFound == true) {
                    message.delete;
                    message.channel.send("Sorry, that word is unavailable or has been blacklisted");
                } else {
                    message.channel.send('Please wait...').then((msg) => {
                        setTimeout(() => {
                            const i = Math.floor((Math.random() * response.data.length));

                            if (response.data[i].hasOwnProperty('title')){
                                var noTitle = response.data[i].title;
                            } else {
                                var noTitle = 'Untitled';
                            }

                            msg.edit(`**${noTitle}**\n${response.data[i].url}`); // Edit message
                        }, 2000);
                    });
                }
            });
        }
    },
};