/*
const fs = require('fs');
const guilds = require('./json/guilds.json');

module.exports = (client) => {
    client.on('message', message => {

        if (!message.author.bot) {
            // If the guild isn't in the JSON file yet, set it up.
            if (!guilds[message.guild.id]) guilds[message.guild.id] = { messageCount: 1 };

            // Otherwise, add one to the guild's message count.
            else guilds[message.guild.id].messageCount++;

            // Write the data back to the JSON file, logging any errors to the console.
            try {
                fs.writeFileSync('./json/guilds.json', JSON.stringify(guilds));
            } catch(err) {
                console.error(err);
            }
        }

    })
}

 */