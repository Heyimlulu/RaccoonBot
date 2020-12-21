const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Send some information about the server!',
    execute(message) {
        let botCount = message.guild.members.cache.filter(member => member.user.bot).size;
        const serverInfo = new Discord.MessageEmbed()
            .setAuthor('RacoonBot')
            .setColor("RANDOM")
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
    },
};