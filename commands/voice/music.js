const config = require("../../json/config.json");
const ytdl = require('ytdl-core');

module.exports = (client) => {
    client.on('message', async message => {

        let url = message.content.split(`${config.prefix}play`).join("").trim();

        if (!url) {
            //return console.log('Invalid url');
            return;
        }

        if (message.content.startsWith(`${config.prefix}play`)) {

            // Join the same voice channel of the author of the message
            if (message.member.voice.channel) {
                const voiceChannel = message.member.voice.channel;

                if (!voiceChannel) {
                    return message.reply('Please join a voice channel first!');
                }

                voiceChannel.join().then(voiceChannel => {

                    // Play a ReadableStream
                    const stream = ytdl(`${url}`, { filter: "audioonly" });
                    const dispatcher = voiceChannel.play(stream);

                    dispatcher.on('finish', () => voiceChannel.disconnect());
                })

            }
        }

        if (message.content.startsWith(`${config.prefix}stop`)) {
            message.member.voice.channel.leave();
        }
    });
}
