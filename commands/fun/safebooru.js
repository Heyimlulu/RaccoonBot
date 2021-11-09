const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

class SafebooruCommand extends Command {
    constructor() {
        super('safebooru', {
            aliases: ['safebooru', 'safeb'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Get a random anime picture from Safebooru. (Some images may be NSFW, so be careful!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        // if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

        await axios.get('https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1')
        .then(async (response) => {

            const result = await response.data;

            const i = Math.floor((Math.random() * result.length));

            //console.log(`https://safebooru.org/images/3308/${response[i].image}`);

            console.log(result[i].directory);
            console.log(result[i].image);

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setImage(`https://safebooru.org/images/${result[i].directory}/${result[i].image}`)
                //.setFooter(`tags: ${result[i].tags}`)

            message.channel.send(embed);
        });
    }
}

module.exports = SafebooruCommand;
