const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping the bot!',
    category: 'utility',
    execute(message) {

        var ping = Date.now() - message.createdTimestamp + " ms";

        const pingingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Pinging...');

        message.channel.send(pingingEmbed).then((msg) => {
            setTimeout(() => {
                const pongEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Pong 🏓')
                    .setDescription("Your ping is " + `${ping}`)
                    .setTimestamp()

                msg.edit(pongEmbed); // Edit message
            }, 1000); // Wait 1 seconds before editing message
        })
    }
};