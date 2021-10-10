const { Command } = require('discord-akairo');
const Jimp = require('jimp');
const os = require('os');

class ResizeCommand extends Command {
    constructor() {
        super('resize', {
            aliases: ['resize'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'link',
                    type: 'url',
                    prompt: {
                        start: 'Which image do you want to resize?',
                        retry: 'It doesn\'t seem to be a valid link, please try again'
                    }
                },
                {
                    id: 'options',
                    type: 'string',
                    prompt: {
                        start: 'What should be the width and height for this image? (separate options by |)',
                        retry: 'Please input a valid width and height (separated by |)'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Resize an image from the link you provide. (separate options by |)',
                usage: '[Link-to-Image] [width | height]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let output = `${os.tmpdir()}/resized${message.id}.jpg`;

        let url;
        let options = args.options.trim().split('|');

        if (!args.link) {
            return;
        } else {
            url = args.link.href;
        }

        if (!options) return;

        await message.channel.send('Processing image...').then(msg => {
            Jimp.read({
                url: url
            }).then(image => {
                image
                    .resize(parseInt(options[0]), parseInt(options[1]))
                    .write(output);
                msg.delete();
                return message.channel.send({files: [output]});
            }).catch(err => {
                console.error(err);
                return message.channel.send('Uh Oh, an error has occurred! Maybe the size of your image is invalid?');
            });
        })

    }
}

module.exports = ResizeCommand;