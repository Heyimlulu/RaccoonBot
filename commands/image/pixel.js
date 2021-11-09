const { Command } = require('discord-akairo');
const Jimp = require('jimp');
const os = require('os');

class PixelCommand extends Command {
    constructor() {
        super('pixel', {
            aliases: ['pixel'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    unordered: true,
                    prompt: {
                        start: 'Which image do you want to pixelate?',
                        retry: 'It doesn\'t seem to be a valid link, please try again'
                    }
                },
                {
                    id: 'size',
                    type: 'integer',
                    unordered: true
                }
            ],
            description: {
                content: 'Pixelate the image from the link you provide',
                usage: '[Link-to-Image] [pixel-size]',
                examples: ['link-to-image 20']
            }
        });
    }

    async exec(message, args) {

        let output = `${os.tmpdir()}/pixelled${message.id}.jpg`;

        let url;
        let size;

        if (!args.link) {
            return;
        } else {
            url = args.link.href;
        }

        if (!args.size) {
            size = 10;
        } else {
            size = args.size;
        }

        await message.channel.send('Processing image...').then(msg => {
            Jimp.read({
                url: url
            }).then(image => {
                image
                    .pixelate(size)
                    .write(output);
                msg.delete();
                return message.channel.send({files: [output]});
            }).catch(err => {
                console.error(err);
                return message.channel.send('Uh Oh, an error has occurred! Maybe the format of your image don\'t work?');
            });
        })

    }
}

module.exports = PixelCommand;