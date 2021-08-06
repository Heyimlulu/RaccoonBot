const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class LoveCommand extends Command {
    constructor() {
        super('love', {
            aliases: ['love'],
            category: 'fun',
            args: [
                {
                    id: 'member',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want me to verify your compatibility?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                }
            ],
            description: {
                content: 'Tell a user the love he/she has to another person',
                usage: '[@user]',
                examples: ['@user']
            }
        });
    }

    exec(message, args) {

        let member = args.member;
        let text = '';
        
        let love = Math.random() * 100; // Generate a random number between 0 and 100
        let loveIndex = Math.floor(love / 10);
        //let loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

        if (love <= 25) text = 'It\'s low, but don\'t give up';
        if (love > 25) text = 'Still low, try again';
        if (love == 50) text = 'It\'s a fifty fifty'
        if (love > 50) text = 'You have your chance';
        if (love >= 75) text = 'I can say it is a match';
        if (love == 100) text = 'It\'s a perfect match!';

        if (message.mentions.users.first()) {

            member = message.mentions.members.first();

            const Embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .setTitle(text)
                .setDescription(`${message.author} + ${member} = 💟 ${Math.floor(love)}%`)
                //.addField('📊', loveLevel)

            message.channel.send(Embed)

        } else {
            message.reply(`You did not mentionned a user!`)
        }

    }
}

module.exports = LoveCommand;