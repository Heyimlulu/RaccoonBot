const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { prefix } = require('../../config.json');

class InviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite'],
            category: 'utility',
            description: {
                content: 'Get the invite link for the bot',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setTitle('There\'s the link to invite me in your own server!')
            .setDescription('**Please make sure you are logged in on your Discord account in your browser.**')
            .addField('Invite', '[Click here!](https://discord.com/api/oauth2/authorize?client_id=734426328002068481&permissions=268692502&scope=bot)', true)
            .addField('Commands', `\u0060${prefix} help\u0060`, true)

        await message.channel.send(embed);

    }
}

module.exports = InviteCommand;
