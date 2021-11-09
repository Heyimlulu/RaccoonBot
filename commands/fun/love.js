const { Command } = require('discord-akairo');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

class LoveCommand extends Command {
    constructor() {
        super('love', {
            aliases: ['love', 'lovecalc'],
            category: 'fun',
            args: [
                {
                    id: 'firstMember',
                    type: 'member',
                    prompt: {
                        start: 'Which user do you want me to calculate love percentage?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                },
                {
                    id: 'secondMember',
                    type: 'member',
                    prompt: {
                        start: 'Which second user do you want me to calculate love percentage?',
                        retry: "It doesn't seem to be a valid user, please try again!"
                    }
                }
            ],
            description: {
                content: 'Calculate the love percentage between two users.',
                usage: '[@user1 @user2]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        // Get members
        let firstMember = args.firstMember;
        let secondMember = args.secondMember;

        if (!firstMember || !secondMember) return;

        let description;
        let heart = '💗';
        
        let love = Math.floor((Math.random() * 101)); // Generate a random number between 0 and 100

        if (love == 0) {
            description = 'Not a chance';
            heart = '💔';
        } else if (love < 50) {
            description = 'It\'s low, but don\'t give up';
            heart = '💔';
        } else if (love == 50) {
            description = 'It\'s a fifty fifty';
        } else if (love > 50) {
            description = 'You have your chance';
        } else if (love == 100) {
            description = 'Get married!';
        }

        const canvas = Canvas.createCanvas(425, 200);
        const context = canvas.getContext('2d');

        const firstAvatar = await Canvas.loadImage(firstMember.user.displayAvatarURL({format: 'jpg'}));
        const SecondAvatar = await Canvas.loadImage(secondMember.user.displayAvatarURL({format: 'jpg'}));

        context.drawImage(firstAvatar, 0, 0, 200, 200);
        context.drawImage(SecondAvatar, 225, 0, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'couple.png');

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setDescription(`**${firstMember.user.username} + ${secondMember.user.username}** = __${Math.floor(love)}%__ of Love ${heart}\n${description}`)
            .attachFiles(attachment)
            .setImage('attachment://couple.png')

        await message.channel.send(embed);

    }
}

module.exports = LoveCommand;