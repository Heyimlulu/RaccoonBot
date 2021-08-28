const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const extract = require('meta-extractor');

class WikiHowCommand extends Command {
    constructor() {
        super('wikihow', {
            aliases: ['wikihow'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Displays random wikihow help',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let res = await extract({ uri: 'http://www.wikihow.com/Special:Randomizer' });

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(res.ogTitle)
            .setDescription(`${res.ogDescription}\n**Click [here](${res.ogUrl}) to see the full article**`)
            .setImage(res.ogImage);

        await message.channel.send(embed);
    }
}

module.exports = WikiHowCommand;