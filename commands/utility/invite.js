const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Get the invite link for the bot.',
    execute(message) {

        message.channel.send("You can add me from here: https://discord.com/api/oauth2/authorize?client_id=734426328002068481&permissions=268696823&scope=bot");
    },
};