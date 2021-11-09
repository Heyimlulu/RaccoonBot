const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class RPSCommand extends Command {
    constructor() {
        super('rps', {
            aliases: ['rps'],
            category: 'minigame',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'selection',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Simple rock-paper-scissors',
                usage: '[rock|paper|scissors]',
                examples: ['paper']
            }
        });
    }

    async exec(message, args) {

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setFooter('Rock-Paper-Scissors')
            .setTimestamp();


        let pcHand = Math.floor((Math.random()*3)+1);
        let playerHand = args.selection;

        switch (playerHand) {
            case 'rock':
                if (pcHand==1) {
                    embed.setTitle('We both chose rock, Draw!');
                    message.channel.send(embed);
                } else if (pcHand==2) {
                    embed.setTitle('I chose paper, you lose!');
                    message.channel.send(embed);
                } else {
                    embed.setTitle('I chose scissors, you win!');
                    message.channel.send(embed);
                }
                break;
            case 'paper':
                if (pcHand==1) {
                    embed.setTitle('We both chose paper, Draw!');
                    message.channel.send(embed);
                } else if (pcHand==2) {
                    embed.setTitle('I chose scissors, you lose!');
                    message.channel.send(embed);
                } else {
                    embed.setTitle('I chose rock, you win!');
                    message.channel.send(embed);
                }
                break;
            case 'scissors':
                if (pcHand==1) {
                    embed.setTitle('We both chose scissors, Draw!');
                    message.channel.send(embed);
                } else if (pcHand==2) {
                    embed.setTitle('I chose rock, you lose!');
                    message.channel.send(embed);
                } else {
                    embed.setTitle('I chose paper, you win!');
                    message.channel.send(embed);
                }
                break;

            default:
                embed.setTitle(`You entered \u0060${playerHand}\u0060 which is an incorrect choice.`);
                message.channel.send(embed);
                break;
        }

    }
}

module.exports = RPSCommand;