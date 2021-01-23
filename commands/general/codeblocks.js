const config = require('../../json/config.json');
module.exports = {
    name: 'codeblock',
    description: 'Denote a specific programming language for syntax highlighting',
    category: 'general',
    execute(message, args) {

        let code = message.content.split(`${config.prefix}codeblock ${args[0]}`).join("").trim();

        if (!code) {
            return message.channel.send(`What code snippet do you want to share, ${message.author}?`);
        }

        if (!args.length) {
            return message.channel.send(`You didn't provide a programming language, ${message.author}.`);
        }

        try {
            message.delete(); // Delete message
            message.channel.send(`**${message.author.tag}**\n` + '```' + `${args[0]}\n` + `${code}` + '```');
        } catch {
            message.channel.send("I do not have permissions to delete message");
        }
    }
}