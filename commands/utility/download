const { Command } = require('discord-akairo');
const fs = require('fs');
const ytdl = require('ytdl-core');
const os = require('os');

class DownloadCommand extends Command {
    constructor() {
        super('download', {
            aliases: ['download'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'url',
                    type: 'string'
                }
            ],
            description: {
                content: 'Download videos from youtube',
                usage: '[url to video]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let url = args.url;

        if (!url) return message.reply('You put an invalid link. Please try again!');

        let output = `${os.tmpdir()}/${message.id}video.mp4`; // filename

        if (url.includes("http") || url.includes("www")) {

            const video = ytdl(url, { filter: format => format.container === 'mp4' });

            video.pipe(fs.createWriteStream(output));

            video.on('error', function(err) {
                console.log('error :', err);
                message.channel.send("An error has occured, i can't download from the link you provided.")
            });

            video.on('end', function() {
                message.channel.send(`Video downloaded by ${message.author.username}`, { files: [output] })
                    .catch(error => message.channel.send('Uh Oh... File is too big to be send on discord'));
            });

        } else {
            await message.channel.send("You need to input a valid link");
        }

    }
}

module.exports = DownloadCommand;