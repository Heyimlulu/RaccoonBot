const Discord = require('discord.js');
const fs = require('fs')
const youtubedl = require('youtube-dl')

const config = require('../../json/config.json');

module.exports = {
    name: 'download',
    description: 'Download videos from youtube',
    category: "owner",
    execute(message) {
        const loadingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Downloading...');

        const successEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Download successful!');

        let ytdlUrl = message.content.split(`${config.prefix}download`).join("").trim(); // Listen to user's input

        if (ytdlUrl.includes("http") || ytdlUrl.includes("www")) {
            message.channel.send('Downloading...').then(msg => {
                let video = youtubedl(ytdlUrl); // Get the url from the user

                video.pipe(fs.createWriteStream('./video.mp4')); // Create a video.mp4 file

                // on error
                video.on('error', function error(err) {
                    console.log('error :', err);
                    message.channel.send("An error has occured, i can't download from the link you provided.")
                });

                // on end or if download is finished
                video.on('end', function () {
                    message.channel.send(`Downloaded by ${message.author.username}`, {files: ["./video.mp4"]}).then(msg.edit('**Download successful!**'))
                        .catch(error => message.channel.send('Uh Oh... File is too big'))
                })
            })
        } else {
            message.channel.send("You need to input a valid link");
        }
    },
};