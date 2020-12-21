const config = require('../../json/config.json');

module.exports = (client) => {
    client.on('message', message => {

        if (message.author.bot) return;

        let id = message.content.split(`${config.prefix}unban`).join("").trim();

        if (message.content.startsWith(`${config.prefix}unban`)) {
            if (message.member.hasPermission("BAN_MEMBERS")) { // If the user has BAN_MEMBERS permissions
                try { // If the user set a valid ID, then continue
                    if (!id) { // if no ID is specified, then error
                        return message.channel.send("This doesn't look like an ID, please try again");
                    } else { // if an ID is specified, then continue
                        message.guild.members.unban(id)
                            .then(() => { // if the user is banned, then unbanned
                                message.channel.send(`<@${id}> has been unbanned!`);
                            })
                            .catch(() => { // If the user is already unbanned, then error
                                message.channel.send("Could not unban this user, is he banned?");
                            });
                    }
                } catch { // If the user set an invalid ID, then error
                    message.channel.send('There was an error with the command, please check if you set a valid ID');
                }
            } else { // If the user does not have BAN_MEMBERS permissions
                message.reply("You do not have permissions to unban");
            }
        }
    })
}