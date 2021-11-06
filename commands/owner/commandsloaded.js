const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CommandsLoadedCommand extends Command {
    constructor() {
        super('commandloaded', {
            aliases: ['commandloaded', 'cmdloaded'],
            category: 'owner',
            ownerOnly: true,
            description: {
                content: "Display how many commands are loaded",
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setTitle(`There are \u0060${this.client.commandHandler.modules.size - 9}\u0060 commands loaded!`);

        await message.channel.send(embed);

    }
}

module.exports = CommandsLoadedCommand;
