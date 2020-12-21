const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../../json/config.json");

module.exports = {
    name: 'reddit',
    description: 'Send random images from the subreddit you choose!',
    category: 'fun',
    execute(message) {

        let redditSearch = message.content.split(`${config.prefix}reddit`).join('').trim()
        
        if (redditSearch == '') {
            message.channel.send("No subreddit specified");
        } else {
            fetch('https://www.reddit.com/r/' + redditSearch + '.json?limit=100').then((response) => {
                return response.json();
            }).then((response) => {
                if (response.error == 404)
                    return message.channel.send('Not a valid subreddit');

                if (response.data.dist == 0)
                    return message.channel.send('Not a valid subreddit');

                let i = Math.floor((Math.random() * response.data.children.length));

                if (response.data.children[i].data.over_18 == true && !message.channel.nsfw)
                    return message.channel.send('No nsfw');

                message.channel.send('Please wait...').then((msg) => {
                    setTimeout(() => {
                        msg.delete(); // Delete previous message
                        const redditEmbed = new Discord.MessageEmbed()
                        redditEmbed.setColor("RANDOM")
                            .setTitle(response.data.children[i].data.title)
                            .setDescription(response.data.children[i].data.selftext)
                            .setURL('https://reddit.com' + response.data.children[i].data.permalink)
                            .setImage(response.data.children[i].data.url_overridden_by_dest)
                            .setFooter(`/r/${response.data.children[i].data.subreddit} | ⬆ ${response.data.children[i].data.ups} 🗨 ${response.data.children[i].data.num_comments}`);
                        message.channel.send(redditEmbed); // Send new message
                    }, 2000); // Wait 2 seconds before editing message
                })
            });
        }
    },
};