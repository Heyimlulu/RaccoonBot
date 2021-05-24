const { Command } = require('discord-akairo');
const fs = require('fs');
const fetch = require('node-fetch');
const os = require('os');

class DoesntExistCommand extends Command {
    constructor() {
        super('doesntexist', {
            aliases: ['doesntexist', 'thispersondoesnotexist'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Fetch a random image from thispersondoesnotexist.com',
                usage: '[]',
                example: ['']
            }
        });
    }

    async exec(message) {

        let output = `${os.tmpdir()}/${message.id}_image.png`; // filename

        fetch('https://thispersondoesnotexist.com/image').then(res => {

            const dest = fs.createWriteStream(output);
            res.body.pipe(dest);
            dest.on('finish', () => {
                return message.channel.send({files: [output]});
            });

        });

    }
}

module.exports = DoesntExistCommand;