const { Listener } = require('discord-akairo');
const { statsChannel } = require('../config.json');
const Discord = require('discord.js');
const fs = require('fs');

class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(error, message, command) {

        const channel = this.client.channels.resolve(statsChannel);
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Something went wrong!')
            .addField('Command', command.id, true)
            .addField('Error', error, true)
            .addField('Message', message, true);

        if (message.author) errorEmbed.addField('Author', `${message.author.tag} (${message.author.id})`);
        if (message.guild) errorEmbed.addField('Guild', `${message.guild.name} (${message.guild.id})`);

        console.error(`Something went wrong on command: ${command.id}\n${error}\nOn the message: ${message}!`);
        channel.send(errorEmbed);

        // Get current date
        let today = new Date();

        let dd = today.getDate(); // Day
        let mm = today.getMonth() + 1; // Month
        let yyyy = today.getFullYear(); // Year
        
        today = mm + '/' + dd + '/' + yyyy; // US date format

        // Get current hour
        let time = new Date();
        let currentTime = time.getHours() + '_' + time.getMinutes() + '_' + time.getSeconds();

        fs.writeFile(`./error/${today}/${currentTime}.txt`, `Something went wrong on command: ${command.id}\n${error}\nOn the message: ${message}`, function (err) {

            if (err) {
                console.log(err);
            }

            console.log(`Successfully logged error in ./error/${today}/${currentTime}.txt`);

        });

    }
}

module.exports = ErrorListener;