const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CuteCommand extends Command {
    constructor() {
        super('cute', {
            aliases: ['cute'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'member',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want me to verify cuteness?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                }
            ],
            description: {
                content: 'Tell a user how cute he/she is',
                usage: '[@user]',
                examples: ['@user']
            }
        });
    }

    exec(message, args) {

        let member = args.member;

        let cute = [
            'Not Cute',
            'Ho hum Cute',
            'Ok, maybe a little cute',
            'Awesomely cute',
            'Adorable'
        ];

        let guess = cute[Math.floor(Math.random() * (cute.length))];

        const Embed = new Discord.MessageEmbed();

        if (message.mentions.users.first()) { // IF => member already mentionned

            member = message.mentions.members.first();

            Embed.setTitle('Cute-o-Meter')
                .setDescription(`I guess **${member.user.username}** is **${guess}**`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            message.channel.send(Embed);

        } else { // ELSE => after first prompt message

            message.reply('You did not mentionned a user!');

        }

    }
}

module.exports = CuteCommand;