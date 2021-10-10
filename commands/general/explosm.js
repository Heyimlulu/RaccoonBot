const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const cheerio = require('cheerio');
const Canvas = require('canvas');
const axios = require('axios');

class ExplosmCommand extends Command {
    constructor() {
        super('explosm', {
            aliases: ['explosm', 'rcg', 'cyanideandhappiness'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Generate a random comic from Cyanide & Happiness',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let images = [];

        // Get images card from explosm

        await axios.get('https://explosm.net/rcg')
        .then(async (response) => {

            const body = await response.data;
    
            const $ = cheerio.load(body);
    
            for (let i = 0; i < 3; i++) {
                let img = $('div.rcg-panels img')[i].attribs.src;
                images[i] = img
            }
    
            // Create canvas and add all 3 images card
    
            const canvas = Canvas.createCanvas(875, 398);
            const context = canvas.getContext('2d');
    
            const firstImage = await Canvas.loadImage(images[0]);
            const secondImage = await Canvas.loadImage(images[1]);
            const thirdImage = await Canvas.loadImage(images[2]);
    
            // Space between images
            context.drawImage(firstImage, 0, 0, 275, 398);
            context.drawImage(secondImage, 300, 0, 275, 398);
            context.drawImage(thirdImage, 600, 0, 275, 398);
    
            const attachment = new MessageAttachment(canvas.toBuffer(), `${message.id}_rcg.png`);
    
            await message.channel.send({files: [attachment]});

        })

    }
}

module.exports = ExplosmCommand;