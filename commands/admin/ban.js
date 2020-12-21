const config = require('../../json/config.json');

module.exports = (client) => {
    client.on('message', message => {

        if (message.author.bot) return;

        if (message.content.startsWith(`${config.prefix}ban`)) {
            if (message.member.hasPermission("BAN_MEMBERS")) { // If the user has BAN_MEMBERS permissions
                if (message.mentions.members.first()) {
                    try {
                        message.mentions.members.first().ban().then((member) => {
                            message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
                        })
                    } catch {
                        message.reply("I do not have permissions to ban");
                    }
                }
            } else { // If the user does not have BAN_MEMBERS permissions
                message.reply("You do not have permissions to ban");
            }
        }
    })
}