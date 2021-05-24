const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const extract = require('meta-extractor');

class PrntscCommand extends Command {
    constructor() {
        super('prntsc', {
            aliases: ['prntsc', 'screenshot'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Fetch a random screenshot from Lightshot. (Images may be NSFW, so be careful!) (You must use this command in a NSFW channel!)',
                usage: '[]',
                example: ['']
            }
        });
    }

    async exec(message) {

        if (!message.channel.nsfw) return message.channel.send('You must be in a NSFW channel only to use this command!');

        let url = generator();

        function generator() {
            return 'xxyyyy'.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const embed = new MessageEmbed();

        await extract({ uri: `https://prnt.sc/${url}/` }, (err, res) => {

            console.log(res);

            if(!res.hasOwnProperty('ogImage')) return console.log('Could not fetch screenshot');

            embed.setTitle(res.ogTitle)
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setDescription(res.ogDescription)
                .setURL(res.ogImage)
                .setImage(res.ogImage)
                .setThumbnail('https://st.prntscr.com/2021/04/08/1538/img/footer-logo.png')
                .setFooter(res.title);

            return message.channel.send(embed);
        });

    }
}

module.exports = PrntscCommand;