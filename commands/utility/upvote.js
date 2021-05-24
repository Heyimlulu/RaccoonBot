const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class UpvoteCommand extends Command {
    constructor() {
        super('upvote', {
            aliases: ['upvote', 'vote'],
            category: 'utility',
            description: {
                content: 'Send you a link to vote for my bot',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        const attachment = new Discord.MessageAttachment('./asset/img/racoon-for-me.jpg', 'racoon-for-me.jpg');
        const UpvoteEmbed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle('You can vote for my bot if you like it!')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setDescription('[top.gg](https://top.gg/bot/734426328002068481) | [discordbotlist.com](https://discordbotlist.com/bots/racoonbot)')
            .attachFiles(attachment)
            .setImage('attachment://racoon-for-me.jpg')
            .setTimestamp()
            .setFooter('💛 Thanks for the upvote', message.author.displayAvatarURL());

        message.channel.send(UpvoteEmbed);

    }
}

module.exports = UpvoteCommand;