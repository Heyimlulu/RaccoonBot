const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { owner, prefix } = require('../../config.json');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'about'],
            category: 'utility',
            description: {
                content: 'Send some informations about the developer',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        const attachment = new Discord.MessageAttachment('./asset/img/Pet-Raccoons.png', 'Pet-Raccoons.png');

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setTitle('About me')
            .setDescription('I\'m a multipurpose discord bot with moderation, fun, general, utilities commands and more. I\'m also a cute raccoon ;3')
            .addField('Owner', `${this.client.users.resolve(owner).tag} (${this.client.users.resolve(owner).id})`)
            .addField('My GitHub profile', 'https://github.com/Heyimlulu')
            .addField('Total commands', `${this.client.commandHandler.modules.size - 12}`)
            .addField('Support server', 'none yet')
            .addField('Contact', `Use ${prefix[0]} feedback <\message\> to let me know what you think of my bot ;3`)
            .attachFiles(attachment)
            .setImage('attachment://Pet-Raccoons.png')
            .setFooter(`${this.client.user.tag} made with 💛 by ${this.client.users.resolve(owner).tag}`)
            .setTimestamp()

        await message.channel.send(embed);

    }
}

module.exports = InfoCommand;