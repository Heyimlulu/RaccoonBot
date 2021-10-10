const { Command } = require('discord-akairo');
const Jimp = require('jimp');
const os = require('os');

class RotateCommand extends Command {
    constructor() {
        super('rotate', {
            aliases: ['rotate'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    unordered: true,
                    prompt: {
                        start: 'Which image do you want to rotate?',
                        retry: 'It doesn\'t seem to be a valid link, please try again'
                    }
                },
                {
                    id: 'degrees',
                    type: 'integer',
                    unordered: true
                }
            ],
            description: {
                content: 'Rotate the image from the link you provide',
                usage: '[Link-to-Image] [radius]',
                examples: ['link-to-image 50']
            }
        });
    }

    async exec(message, args) {

        let output = `${os.tmpdir()}/rotated${message.id}.jpg`;

        let url;
        let degrees;

        if (!args.link) {
            return;
        } else {
            url = args.link.href;
        }

        if (!args.degrees) {
            degrees = 10;
        } else {
            degrees = args.degrees
        }

        await message.channel.send('Processing image...').then(msg => {
            Jimp.read({
                url: url
            }).then(image => {
                image
                    .rotate(degrees)
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

module.exports = RotateCommand;