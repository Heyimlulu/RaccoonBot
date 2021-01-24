const config = require('../../json/config.json');

module.exports = {
    name: 'block',
    description: 'Send a message in a block',
    category: 'general',
    execute(message, args) {

        let text = args.slice(config.prefix).join(' ').trim();

        if (!text) {
            return message.channel.send(`Block cannot be empty, ${message.author}`);
        }

        /*
        try {
            message.delete(); // Delete message
            message.channel.send(`**${message.author.tag}**\n` + '```' + `${args[0]}\n` + `${text.slice(args[0].length)}` + '```');
        } catch {
            message.channel.send("I do not have permissions to delete message");
        }

         */

        try {
            message.delete(); // Delete message
            message.channel.send(`**${message.author.tag}**\n` + '```' + `${text}` + '```');
        } catch {
            message.channel.send("I do not have permissions to delete message");
        }
    }
}