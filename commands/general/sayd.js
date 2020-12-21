const config = require('../../json/config.json');

module.exports = {
    name: 'sayd',
    description: 'Write something you want the bot to repeat',
    execute(message) {

        let sayd = message.content.split(`${config.prefix}sayd`).join("").trim(); // Listen to user's input

        if (!sayd) {
            return message.reply('');
        }

        message.delete(); // Delete user message
        message.channel.send(sayd); // Send the message from input
    },
};