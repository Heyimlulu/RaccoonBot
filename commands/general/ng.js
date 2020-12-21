const extract = require('meta-extractor');
const Discord = require('discord.js');

module.exports = {
    name: 'ng',
    description: `Give some informations about racoons with national geographic`,
    category: 'fun',
    execute(message) {
        extract({ uri: 'https://www.nationalgeographic.com/animals/mammals/r/raccoon/' }, (err, res) => {
            //console.log(res);
            //return message.channel.send({files: [res.ogImage]});

            const ngEmbed = new Discord.MessageEmbed();
            ngEmbed.setColor("RANDOM")
                .setURL(res.ogUrl)
                .setTitle(res.title)
                .setDescription(res.description)
                .setImage(res.ogImage)
                .setFooter(res.keywords)

            return message.channel.send(ngEmbed);
        });
    },
};
