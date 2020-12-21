const Discord = require('discord.js');
const config = require("../../json/config.json");

module.exports = (client) => {
    client.on('message', message => {

        if (!message.content.startsWith(`${config.prefix}feedback`) || message.author.bot) return;

        try {
            let dm = message.content.split(`${config.prefix}feedback`).join("").trim();

            if (!dm) return message.reply('What do you want to say to the developer?');

            // Don't let new account use this command to prevent spam, if they have an UUID its fine to skip it
            // Snippet code by Supositware ;)
            let date = new Date();
            if (message.author.createdAt > date.setDate(date.getDate() - 7)) {
                return message.channel.send('Your account is too new to be able to use this command!');
            }

            const user = client.users.resolve(`265896171384340480`); // <-- It will sent to my discord ID <-- Yuki 💜#0001
            //const user = client.users.cache.get('265896171384340480');

            const embedDM = new Discord.MessageEmbed();
            embedDM.setTitle('You got a new feedback!')
                .setDescription(`${message.author.id}`)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .addField('Server', `${message.guild.name}`, false)
                .addField('Message', `${dm}`, false)
                .setTimestamp()

            user.send(embedDM)
                .then(() => {
                    return message.reply("Your feedback has been sent!");
                })
                .catch(() => {
                    return message.channel.send('Could not send feedback, please try again')
                })

        } catch (e) {
            console.log(e);
        }
    })
}