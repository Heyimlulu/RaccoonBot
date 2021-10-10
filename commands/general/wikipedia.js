const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const extract = require('meta-extractor');

class WikipediaCommand extends Command {
    constructor() {
        super('wikipedia', {
            aliases: ['wikipedia'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Displays random wikipedia article',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let res = await extract({ uri: 'https://en.wikipedia.org/wiki/Special:Random' });

        let title = res.ogTitle.replace('- Wikipedia', '');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(title)
            .setDescription(`**Click [here](https://en.wikipedia.org/wiki/${title.replace(' ', '%20').trim()}) to see this article**`)
            .setImage(res.ogImage);

        await message.channel.send(embed);
    }
}

module.exports = WikipediaCommand;