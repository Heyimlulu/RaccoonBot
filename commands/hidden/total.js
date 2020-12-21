/*
const Discord = require('discord.js');

const config = require("../../json/config.json");
const guilds = require('../../json/guilds.json');

module.exports = (client) => {
    client.on('message', message => {

        if (message.author.bot) return;

        if (message.content.startsWith(`${config.prefix}glist`)){
            if (message.author.id === '265896171384340480'){

                console.log(guilds);
                message.channel.send('```' + `Informations have been displayed in the console` + '```');
            } else {
                message.reply(`You did not have permissions to execute that command!`);
            }
        }

        if (message.content.startsWith(`${config.prefix}guild`)) {

            let guildID = message.content.split(`${config.prefix}guild`).join('').trim()

            if (message.author.id === '265896171384340480') {
                if (!guildID) {
                    return message.reply('No Guild ID specified');
                } else {
                    try {
                        const totalEmbed = new Discord.MessageEmbed();
                        totalEmbed.setTitle('Total commands used')
                            .addField(client.guilds.resolve(`${guildID}`).name, guilds[guildID].messageCount, false)
                            .setTimestamp()

                        message.channel.send(totalEmbed);
                    } catch (e) {
                        console.log(e);
                        message.reply('Guild not found, please try again');
                    }

                }
            } else {
                message.reply(`You did not have permissions to execute that command!`);
            }
        }
    })
}

 */