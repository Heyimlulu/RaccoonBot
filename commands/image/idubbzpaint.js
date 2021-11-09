const { Command } = require('discord-akairo');
const { createCanvas, loadImage } = require('canvas');
const superagent = require('superagent');

class IDubbzPaintCommand extends Command {
    constructor() {
        super('idubbzpaint', {
            aliases: ['idubbzpaint', 'idubbz'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'image',
                    type: 'string',
                    optional: true,
                }
            ],
            description: {
                content: 'Get your image paint on a canvas',
                usage: '[attachment]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let image = args.image
        let Attachment = (message.attachments).array();

        if (Attachment[0]) {

            getImages(Attachment[0].url);

        } else {

            if (!image) {
                image = message.author.displayAvatarURL().replace('webp', 'png')
            }

            getImages(image);

        }

        async function getImages(image) {

            const canvas = createCanvas(1274, 677);
            const ctx = canvas.getContext('2d');
            const background = await loadImage(image).catch(() => {
                return message.channel.send('An error as occurred, please try again. Is it a correct image?');
            });
            
            ctx.drawImage(background, 140, 40, 600, 540);
            const { body: buffer } = await superagent.get('https://cdn.discordapp.com/attachments/734432426457301043/834457155066265600/idubbbz-painting-meme.png');
            const bg = await loadImage(buffer);
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffffff';

            message.channel.send({files: [canvas.toBuffer()]}).catch(() => {
                message.channel.send('Something went wrong. Please check the bot/channel permissions');
            });

        }

    }
}

module.exports = IDubbzPaintCommand;