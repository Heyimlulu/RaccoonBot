const config = require("../../json/config.json");

module.exports = {
    name: 'spoiler',
    description: 'Send a message using the spoiler tag',
    execute(message) {

        let spoiler = message.content.split(`${config.prefix}spoiler`).join("").trim(); // Listen to user's input

        if (!spoiler) {
            return message.channel.send('What do you want me to say ?');
        }

        try {
            message.delete(); // Delete user message
            message.channel.send('||' + spoiler + '||'); // Send message
        } catch {
            message.channel.send("I do not have permissions to delete message");
        }
    },
};
