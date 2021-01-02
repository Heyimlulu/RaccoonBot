const config = require('../../json/config.json');

module.exports = {
    name: 'sayd',
    description: 'Write something you want the bot to repeat',
    execute(message) {

        let sayd = message.content.split(`${config.prefix}sayd`).join("").trim(); // Listen to user's input

        if (!sayd) {
            return message.reply('');
        }

        try {
            message.delete(); // Delete user message
            message.channel.send(sayd); // Send message
        } catch {
            message.channel.send("I do not have permissions to delete message");
        }
    },
};