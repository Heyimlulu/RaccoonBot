const say = require('../../json/commands/general/say.json');

module.exports = {
    name: 'say',
    description: 'Random sentence',
    category: 'owner',
    execute(message) {

        if (message.author.id !== '265896171384340480') {
            message.reply(`You did not have permissions to run that command!`);
            return;
        }

        var speech = say[Math.floor(Math.random()*say.length)];
        message.channel.send(speech)
    },
};