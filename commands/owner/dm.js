const Discord = require('discord.js');
const config = require("../../json/config.json");

module.exports = (client) => {
    client.on('message', message => {

        if (!message.content.startsWith(`${config.prefix}dm`) || message.author.bot) return;

        if (message.author.id === '265896171384340480') { // Restrict this command for the bot owner only
            try {
                // Check if user is specified
                let userName = message.mentions.members.first();
                if (!userName) return message.reply('Which user do you want to send your message?');

                // Check if message is filled
                let dm = message.content.split(`${config.prefix}dm ${userName}`).join("").trim();
                if (!dm) return message.reply('What do you want to send to that user?');

                // Convert user discordID into a human readable text
                const user = client.users.resolve(`${userName.id}`);
                //const user = client.users.cache.get('265896171384340480');

                const embedDM = new Discord.MessageEmbed();
                embedDM.setTitle('You got a message from the developer!')
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .addField('Message', `${dm}`, false)
                    .setTimestamp()

                user.send(embedDM)
                    .then(() => {
                        return message.reply("Your message has been sent!");
                    })
                    .catch(() => {
                        return message.channel.send('Could not send a DM to that user')
                    })

            } catch (e) {
                console.log(e);
            }
        } else {
            message.reply(`You did not have permissions to execute that command!`);
        }
    })
}