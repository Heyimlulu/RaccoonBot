const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping the bot!',
    category: 'utility',
    execute(message) {

        var ping = Date.now() - message.createdTimestamp + " ms";

        message.channel.send('Pinging...').then((msg) => {
            setTimeout(() => {
                msg.delete(); // Delete previous message
                const Embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Pong 🏓')
                    .setDescription("Your ping is " + `${ping}`)
                    .setTimestamp()

                message.channel.send(Embed); // Send new message
            }, 1000); // Wait 1 seconds before editing message
        })
    }
};