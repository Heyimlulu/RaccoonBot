const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const config = require('../../config.json');

class DanbooruCommand extends Command {
    constructor() {
        super('danbooru', {
            aliases: ['danbooru'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Get a random anime picture from Danbooru. (Images may be NSFW, so be careful!) (You must use this command in a NSFW channel!)',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        fetch(`https://danbooru.donmai.us/explore/posts/popular.json?api_key=${process.env.DANBOORU_SECRET_KEY}&login=${config.danbooru.login}&limit=100`).then((response) => {
            return response.json();
        }).then((response) => {

            try {
                const i = Math.floor((Math.random() * response.length));

                if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');
                if (response[i].has_children == true || response[i].has_active_children == true || response[i].has_visible_children == true) {
                    return message.channel.send('I could not send you the image because it contains blacklisted words');
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    .setTitle(response[i].tag_string_artist)
                    .setURL(response[i].source)
                    .setImage(response[i].large_file_url)
                //.setFooter(`tags: ${response[i].tag_string}`)

                message.channel.send(embed);
            } catch {
                return message.channel.send('Something went wrong. Please try again')
            }

        });

    }
}

module.exports = DanbooruCommand;