const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Show info about a user!',
    execute(message) {
        if(message.mentions.users.first()) {
            const mentionUser = message.mentions.users.first()
            const mentionUserinfo = new Discord.MessageEmbed()
                .setAuthor('RacoonBot')
                .setTitle('User information')
                .setColor("RANDOM")
                .setThumbnail(mentionUser.displayAvatarURL())
                .addField("Username", `${mentionUser.tag}`, false)
                .addField("User ID", mentionUser.id, false)
                .addField('Status', mentionUser.presence.status, false)
                .addField("Created at", mentionUser.createdAt, false)
            message.channel.send(mentionUserinfo)
        }
        else
        {
            message.reply('You did not mentionned a user')
        }
    },
};