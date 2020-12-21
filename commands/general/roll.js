const Discord = require('discord.js');

module.exports = {
    name: 'roll',
    description: 'Rolls 2 dices.',
    execute(message) {

        let diceOne = Math.floor(Math.random() * 6) + 1;
        let diceTwo = Math.floor(Math.random() * 6) + 1;

        const rollEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('🎲\u2000Roll dice')
            .setDescription(`Dice 1 : **${diceOne}**\nDice 2 : **${diceTwo}**`)

        message.channel.send(rollEmbed);
    },
};