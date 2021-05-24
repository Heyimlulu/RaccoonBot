const { Listener } = require('discord-akairo');
const { statsChannel } = require('../config.json');
const Discord = require('discord.js');
let report = [];
let time = new Date();

class CommandStartedListener extends Listener {
    constructor() {
        super('commandStarted', {
            emitter: 'commandHandler',
            event: 'commandStarted'
        });
    }

    exec(message, command, args) {
        
        let today = new Date(), lastUpdate;

        if (statsChannel) {

            if (command.category.id === 'owner') return; // Don't count owner command

            let obj = {
                command: command.id
            }

            if (message.guild) obj.guild = 	message.guild.id;

            report.push(obj);

            let uniqueGuild = [];
            let commands = {};
            let executedCommands = 0;

            report.forEach(e => {
                if (!uniqueGuild.includes(e.guild)) {
                    uniqueGuild.push(e.guild);
                }

                if (!commands[e.command]) {
                    commands[e.command] = 1;
                } else {
                    commands[e.command] = commands[e.command] + 1;
                }

                executedCommands++;

            });

            if ( !lastUpdate || ( today.getTime() - lastUpdate.getTime() ) > 30000 ) {
                // Set the last time we checked, and then check if the date has changed.
                lastUpdate = today;
                if ( time.getDate() !== today.getDate() ) {
                    // If the date has changed, set the date to the new date, and refresh stuff.
                    time = today;

                    let arr = Object.values(commands);
                    let max = Math.max(...arr);
                    let min = Math.min(...arr);

                    let embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('Daily usage report!')
                        .addField('Number of unique guild', uniqueGuild.length)
                        .addField('Number of command executed', executedCommands, true)
                        .addField('Last used command', command.id, true)
                        .addField('Most used command', `${getKeyByValue(commands, max)} (${max} times)`, true )
                        .addField('Least used command', `${getKeyByValue(commands, min)} (${min} times)`, true)
                        .setFooter(`Bot usage as of ${today}`);



                    const channel = this.client.channels.resolve(statsChannel);
                    channel.send(embed);

                    uniqueGuild = [];
                    commands = {};
                    report = [];
                }
            }
        }

        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }

    }
}

module.exports = CommandStartedListener;