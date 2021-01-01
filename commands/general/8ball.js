const answers = require('../../json/commands/general/8ball.json');
const config = require('../../json/config.json');

module.exports = {
    name: '8ball',
    description: 'Fortune-telling or seeking advice',
    execute(message) {

        let ask8ball = message.content.split(`${config.prefix}8ball`).join("").trim(); // Listen to user's input

        if (!ask8ball) {
            return message.reply('What do you want to know?');
        }

        message.channel.send('Let me think about it...').then((msg) => {
            setTimeout(() => {
                var reply = answers[Math.floor(Math.random()*answers.length)];
                msg.delete(); // Delete previous message
                message.reply(reply);
            }, 2000);
        });
    },
};