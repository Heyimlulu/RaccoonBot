const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ServerInfoCommand extends Command {
    constructor() {
        super('serverinfo', {
            aliases: ['serverinfo', 'server'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Show info about a guild',
                usage: '',
                example: ['']
            }
        });
    }

    exec(message, args) {

        let botCount = message.guild.members.cache.filter(member => member.user.bot).size;

        const serverInfo = new Discord.MessageEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .addField('Number of users', message.guild.memberCount - botCount, false)
            .addField('Number of bots', botCount, false)
            .addField('Total number of members', message.guild.memberCount, false)
            .addField('Number of channels', message.guild.channels.cache.size, false)
            .addField('Date when server created', message.guild.createdAt, false)
            .addField('Owner', message.guild.owner, false)
            .setTimestamp();

        message.channel.send(serverInfo);

    }
}

module.exports = ServerInfoCommand;