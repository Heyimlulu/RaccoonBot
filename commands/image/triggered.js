const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

class TriggeredCommand extends Command {
    constructor() {
        super('triggered', {
            aliases: ['triggered', 'trigger'],
            category: 'image',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            description: {
                content: 'Get triggered meme',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        const canvas = Canvas.createCanvas(500, 500);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage(message.author.displayAvatarURL({format: 'jpg'}));
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const logo = await Canvas.loadImage('./asset/img/triggered-logo.jpg');
        context.drawImage(logo, 0, 400, 500, 100);

        const attachment = new MessageAttachment(canvas.toBuffer(), `triggered_${message.id}.jpg`);

        await message.channel.send({files:[attachment]});

    }
}

module.exports = TriggeredCommand;