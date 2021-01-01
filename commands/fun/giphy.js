// Read .env file and initialize variable
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
const config = require("../../json/config.json");

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
                if (response.success == 'false')
                    return message.channel.send('An error has occurred');

                message.channel.send('Please wait...').then((msg) => {
                    setTimeout(() => {
                        const i = Math.floor((Math.random() * response.data.length));
                        msg.delete(); // Delete previous message

                        if (response.data[i].hasOwnProperty('title')){
                            var noTitle = response.data[i].title;
                        } else {
                            var noTitle = 'Untitled';
                        }

                        message.channel.send(`**${noTitle}**\n${response.data[i].url}`); // Edit from the previous message
                    }, 2000);
                });

                /*
                const i = Math.floor((Math.random() * response.data.length));

                message.channel.send(`**${response.data[i].title}**\n${response.data[i].url}`);

                 */
            });
        }
    },
};