const { Command } = require('discord-akairo');
const textToSpeech = require('@google-cloud/text-to-speech');
const gclient = new textToSpeech.TextToSpeechClient();
const fs = require('fs');
const os = require('os');

class TTSVcCommand extends Command {
    constructor() {
        super('ttsvc', {
            aliases: ['ttsvc'],
            category: 'fun',
            clientPermissions: ['SPEAK'],
            args: [
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What do you want me to say with the google text-to-speech?'
                    },
                    match: "rest"
                }
            ],
            description: {
                content: 'Say what you wrote in a voice channel',
                usage: '[text]',
                examples: ['text']
            }
        });
    }

    async exec(message, args) {

        let text = args.text;
        let output = `${os.tmpdir()}/${message.id}_tts.mp3`; // filename

        // Construct the request
        const request = {
            input: { text: text },
            // Select the language and SSML Voice Gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            // Select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Performs the Text-to-Speech request
        await gclient.synthesizeSpeech(request, (err, response) => {
            if (err) {

                return console.error('ERROR:', err);

            }

            console.log(response);

            // Write the binary audio content to a local file
            fs.writeFile(output, response.audioContent, 'binary', async err => {
                if (err) {

                    console.error('ERROR:', err);
                    await message.channel.send('An error has occurred, the message is probably too long');
                    return;

                }

                const voiceChannel = message.member.voice.channel;

                if (!voiceChannel) return message.channel.send('You must be in a voice channel first');

                try {

                    const connection = await voiceChannel.join();
                    const dispatcher = connection.play(output);
                    dispatcher.once('finish', () => voiceChannel.leave());
                    dispatcher.once('error', () => voiceChannel.leave());
                    return null;

                } catch (err) {

                    voiceChannel.leave();
                    return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);

                }

            });

        });

    }
}

module.exports = TTSVcCommand;