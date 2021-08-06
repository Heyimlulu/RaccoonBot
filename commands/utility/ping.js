const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'utility',
            description: {
                content: 'Ping the bot',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        const loadingEmbed = new Discord.MessageEmbed().setTitle('Pinging...');

        await message.reply(loadingEmbed).then(sent => {
            
            const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Pong 🏓')
                .setDescription(`🔂\u2000**RTT**: ${timeDiff} ms\n💟\u2000**Heartbeat**: ${Math.round(this.client.ws.ping)} ms`)
                .setTimestamp()

            return sent.edit(embed);

        })
    }
}

module.exports = PingCommand;