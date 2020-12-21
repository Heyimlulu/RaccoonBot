const Discord = require('discord.js');

module.exports = {
    name: 'flip',
    description: 'Flips a coin.',
    execute(message) {

        var coin = [
            'Tails',
            'Heads'];

        let coinFlip = coin[Math.floor(Math.random() * (coin.length))];

        const flipEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('🪙\u2000Coin flip')
            .setDescription(`It's **${coinFlip}**`)

        message.channel.send(flipEmbed);
    },
};