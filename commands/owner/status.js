const config = require("../../json/config.json");

module.exports = (client) => {
    client.on('message', message => {

        if (!message.content.startsWith(`${config.prefix}status`) || message.author.bot) return;

        if (message.member.id === '265896171384340480') {
            try {
                let statusName = message.content.split(`${config.prefix}status`).join("").trim();

                if (!statusName) {
                    return message.reply('Which status should I have?');
                }

                client.user.setActivity(statusName, {type: "PLAYING"});

                message.channel.send(`Status have been set to **${statusName}**`);
            } catch (e) {
                console.log(e);
            }
        } else {
            message.reply('You did not have permissions to run that command!');
        }
    })
}