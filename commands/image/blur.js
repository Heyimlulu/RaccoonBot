const { Command } = require('discord-akairo');
const Jimp = require('jimp');
const os = require('os');

class BlurCommand extends Command {
    constructor() {
        super('blur', {
            aliases: ['blur'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    unordered: true,
                    prompt: {
                        start: 'Which image do you want to blur?',
                        retry: 'It doesn\'t seem to be a valid link, please try again'
                    }
                },
                {
                    id: 'radius',
                    type: 'integer',
                    unordered: true
                }
            ],
            description: {
                content: 'Blur the image from the link you provide',
                usage: '[Link-to-Image] [radius]',
                examples: ['link-to-image 50']
            }
        });
    }

    async exec(message, args) {

        let output = `${os.tmpdir()}/blurred${message.id}.jpg`;

        let url;
        let radius;

        if (!args.link) {
            return;
        } else {
            url = args.link.href;
        }

        if (!args.radius) {
            radius = 10;
        } else {
            radius = args.radius
        }

        await message.channel.send('Processing image...').then(msg => {
            Jimp.read({
                url: url
            }).then(image => {
                image
                    .blur(radius)
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

module.exports = BlurCommand;