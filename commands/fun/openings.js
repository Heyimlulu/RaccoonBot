const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { MessageEmbed } = require('discord.js');

class OpeningsCommand extends Command {
    constructor() {
        super('openings', {
            aliases: ['openings', 'endings'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Fetch a random anime opening or ending from https://openings.moe/',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let video;

        const response = await fetch('https://openings.moe/api/list.php');
        const list = await response.json();

        const i = Math.floor((Math.random() * list.length) + 1);
        console.log(list[i].uid);

        video = list[i].uid; // Get video UID

        const getDetails = await fetch(`https://openings.moe/api/details.php?name=${video}`);
        const details = await getDetails.json();
        console.log(details);

        let embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`${details.song.title} by ${details.song.artist} (from ${details.source})`)
            .setDescription(`[mp4](https://openings.moe/video/${details.file}.mp4) | [webm](https://openings.moe/video/${details.file}.webm)`)
            .setThumbnail('https://openings.moe/assets/logo/512px.png')
            .setFooter('Powered by https://openings.moe/')

        await message.channel.send(embed);

    }
}

module.exports = OpeningsCommand;