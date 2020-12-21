const config = require('../../json/config.json');

module.exports = (client) => {
    client.on('message', message => {

        if (message.author.bot) return;

        if (message.content.startsWith(`${config.prefix}kick`)) {
            if (message.member.hasPermission("KICK_MEMBERS")) { // If the user has KICK_MEMBERS permissions
                if (message.mentions.members.first()) {
                    try {
                        message.mentions.members.first().kick().then((member) => {
                            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
                        })
                    } catch {
                        message.reply("I do not have permissions to kick");
                    }
                }
            } else { // If the user does not have KICK_MEMBERS permissions
                message.reply("You do not have permissions to kick");
            }
        }
    })
}