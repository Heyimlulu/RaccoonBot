const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ClearCommand extends Command {
    constructor() {
        super('clear', {
            aliases: ['clear'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    id: 'amount',
                    type: 'integer',
                    prompt: {
                        start: 'How many message should I delete?'
                    }
                }
            ],
            channel: 'guild',
            description: {
                content: 'Delete messages in a channel',
                usage: '[amount]',
                examples: ['25']
            }
        });
    }

    async exec(message, args) {

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM");

        if (args.amount >= 100) return message.channel.send("I can't delete more than 100 messages! Please try again");

        message.channel.bulkDelete(args.amount + 1, true).then(() => {

            embed.setTitle('Channel has been cleaned up!');

            message.channel.send(embed);

        });

    }
}

module.exports = ClearCommand;