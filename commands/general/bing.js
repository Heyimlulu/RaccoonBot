const { Command } = require('discord-akairo');
const extract = require('meta-extractor');

class BingCommand extends Command {
    constructor() {
        super('bing', {
            aliases: ['bing'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Get the wallpaper of the day from Bing',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        extract({ uri: 'https://bing.gifposter.com/' }, (err, res) => {
            return message.channel.send({files: [res.twitterImage]});
        });

    }
}

module.exports = BingCommand;