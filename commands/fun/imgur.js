const fetch = require('node-fetch');
const config = require("../../json/config.json");

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: 'imgur',
    description: 'Send some random images from imgur!',
    category: 'fun',
    execute(message) {

        let imgurSearch = message.content.split(`${config.prefix}imgur`).join("")

        if (imgurSearch == '') {
            message.reply("Invalid search argument");
        } else {
            fetch(`https://api.imgur.com/3/gallery/search/viral/top/0?q=${imgurSearch}`, {
                headers: {'Authorization': `Client-ID ${process.env.IMGUR_SECRET_KEY}`},
            }).then((response) => {
                return response.json();
            }).then((response) => {
                if (response.success == 'false')
                    return message.channel.send('An error has occurred');

                message.channel.send('Please wait...').then((msg) => {
                    setTimeout(() => {
                        const i = Math.floor((Math.random() * response.data.length));

                        if (response.data[i].hasOwnProperty('title')){
                            var noTitle = response.data[i].title;
                        } else {
                            var noTitle = 'Untitled';
                        }

                        msg.edit(`**${noTitle}**\n${response.data[i].link}`); // Edit message
                    }, 2000);
                });

                /*
                const i = Math.floor((Math.random() * response.data.length));

                message.channel.send(`**${response.data[i].title}**\n${response.data[i].link}`);

                 */
            });
        }
    },
};