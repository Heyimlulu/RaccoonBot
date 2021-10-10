const { Command } = require('discord-akairo');
const Jimp = require('jimp');
const os = require('os');

class GaussianCommand extends Command {
    constructor() {
        super('gaussian', {
            aliases: ['gaussian'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    unordered: true,
                    prompt: {
                        start: 'Which image do you want to add gaussian blur?',
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
                content: 'Glaussian blur the image from the link you provide',
                usage: '[Link-to-Image] [radius]',
                examples: ['link-to-image 50']
            }
        });
    }

    async exec(message, args) {

        let output = `${os.tmpdir()}/gaussianblurred${message.id}.jpg`;

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

        Jimp.read({
            url: url
        }).then(image => {
            image
                .gaussian(radius)
                .write(output);
            return message.channel.send({files: [output]});
        }).catch(err => {
            console.error(err);
            return message.channel.send('Uh Oh, an error has occurred! Maybe the format of your image don\'t work?');
        });

    }
}

module.exports = GaussianCommand;