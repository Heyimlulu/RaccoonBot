const Discord = require('discord.js');

module.exports = {
    name: 'love',
    description: `Tell a user the love he have to another person.`,
    category: 'fun',
    execute(message) {

        if (message.mentions.users.first()) {

            const love = Math.random() * 100
            const loveIndex = Math.floor(love / 10)
            const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex)

            const User = message.mentions.users.first()

            const loveEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Love')
                .addField(`**${message.author.tag}** loves **${User.tag}** this much`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
                .setThumbnail(User.displayAvatarURL())

            message.delete()
            message.channel.send(loveEmbed)
        } else {
            message.reply(`You did not specified a user!`)
        }
    },

};