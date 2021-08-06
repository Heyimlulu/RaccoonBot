const { Command } = require('discord-akairo');
const os = require('os');
const fs = require('fs');
const asciify = require('asciify-image');

class AsciifyCommand extends Command {
    constructor() {
        super('asciify', {
            aliases: ['asciify'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url'
                }
            ],
            description: {
                content: 'Transform your image into ASCII. (It may be a bit spammy so be careful!)',
                usage: '[url to image or attachment]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let url;
        let Attachment = (message.attachments).array();

        if (!args.url) return message.reply('I need an URL or attachment to asciify image!')

        if (args.url) {
            url = args.link.href;
        } else {
            url = Attachment[0].url;
        }

        let output = `${os.tmpdir()}/${message.id}ascii.txt`; // filename
        let options = {
            fit:    'box',
            width:  200,
            height: 50
        }

        asciify(url, options).then(function (asciified) {

                // Print asciified image to console
                console.log(asciified);

                // Write asciified image into a text file
                fs.writeFile(output, asciified, function (err) {

                    if (err) {
                        console.log(err);
                    }

                    return message.channel.send({files: [output]});
                });
            })
            .catch(function (err) {
                // Print error to console
                console.error(err);
            });

    }
}

module.exports = AsciifyCommand;