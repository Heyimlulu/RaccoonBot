const { Command } = require('discord-akairo');
const Jimp = require('jimp');
const os = require('os');

class AutoCropCommand extends Command {
    constructor() {
        super('autocrop', {
            aliases: ['autocrop'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    prompt: {
                        start: 'Which image do you want to blur?',
                        retry: 'It doesn\'t seem to be a valid link, please try again'
                    }
                }
            ],
            description: {
                content: 'Crop an image from the link you provide',
                usage: '[Link-to-Image]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let output = `${os.tmpdir()}/cropped${message.id}.jpg`;

        let url;

        if (!args.link) {
            return;
        } else {
            url = args.link.href;
        }

        await message.channel.send('Processing image...').then(msg => {
            Jimp.read({
                url: url
            }).then(image => {
                image
                    .autocrop()
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

module.exports = AutoCropCommand;