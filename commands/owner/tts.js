/*
const textToSpeech = require('@google-cloud/text-to-speech');
const gclient = new textToSpeech.TextToSpeechClient();
const fs = require('fs');

const config = require('../../json/config.json');

module.exports = {
    name: 'tts',
    description: `Return text into a text-to-speech file`,
    category: 'owner',
    execute(message) {

        if (message.author.id !== '265896171384340480') {
            message.reply(`Sorry, you can't do that!`)
            return
        }

        let text = message.content.split(`${config.prefix}tts`).join("").trim(); // Listen to user's input

        // Construct the request
        const request = {
            input: {text: text},
            // Select the language and SSML Voice Gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            // Select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
        };

        // Performs the Text-to-Speech request
        gclient.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error('ERROR:', err);
                return;
            }

            // Write the binary audio content to a local file
            fs.writeFile('tts.mp3', response.audioContent, 'binary', err => {
                if (err) {
                    console.error('ERROR:', err);
                    message.channel.send('An error has occured, the message is probably too long')
                    return;
                }
                console.log('Audio content written to file: tts.mp3');
                message.channel.send({files: ['./tts.mp3']})
            });
        });
    },
};

 */