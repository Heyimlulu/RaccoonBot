const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../../json/config.json");

module.exports = {
    name: 'urban',
    description: `Fetch an article from urban dictionary`,
    category: 'fun',
    execute(message, args) {

        let urban = message.content.split(`${config.prefix}urban`).join("").trim();

        if (!urban) {
            return message.channel.send(`Which article are you looking for, ${message.author}?`);
        }

        fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${urban}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "12c0aa790amsh33a3e061069f3eep1e856ajsn32d62fb876b6",
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
            }
        }).then(response => {
            return response.json();
        }).then((response) => {
            const i = Math.floor(Math.random() * Math.floor(10));
            console.log(response.list[i]);

            const loading = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Please wait...');

            message.channel.send(loading).then((msg) => {
                setTimeout(() => {
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor('Urban dictionary')
                        .setThumbnail('https://s3.amazonaws.com/mashape-production-logos/apis/53aa4f67e4b0a9b1348da532_medium')
                        .setTitle(response.list[i].word)
                        .setURL(response.list[i].permalink)
                        .addField('Definition', response.list[i].definition, false)
                        .addField('Example', response.list[i].example, false)
                        .setFooter(`✍️${response.list[i].author} | 👍${response.list[i].thumbs_up} | 👎${response.list[i].thumbs_down}`)
                        .setTimestamp()

                    msg.edit(embed); // Send new message
                }, 2000); // Wait 2 seconds before editing message
            })
        });
    },
};