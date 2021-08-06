const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const feedbackID = require('../../json/feedbackID.json');

class FeedbackCommand extends Command {
    constructor() {
        super('feedback', {
            aliases: ['feedback'],
            category: 'utility',
            clientPermissions: 'SEND_MESSAGES',
            args: [
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What do you want to send to the developer?'
                    },
                    match: 'rest'
                },
                {
                    id: 'reply',
                    match: 'option',
                    flag: '--reply'
                }
            ],
            description: {
                content: 'Send a feedback to the developer',
                usage: '[text]',
                example: ['Hello ;)']
            }
        });
    }

    exec(message, args) {

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp();

        if (message.guild) {
            embed.addField('Guild', `${message.guild.name} (${message.guild.id})`, true);
        }

        embed.setTitle('You got a new feedback!')
            .setDescription(args.text);

        if (feedbackID[args.reply]) {
            embed.addField('Responding to', feedbackID[args.reply]);
        }

        // Don't let new account use this command to prevent spam, if they have an UUID its fine to skip it
        let date = new Date();
        if (message.author.createdAt > date.setDate(date.getDate() - 7)) {
            return message.channel.send('Your account is too new to be able to use this command!');
        }

        let Attachment = (message.attachments).array();
        if (Attachment[0]) embed.setImage(Attachment[0].url);

        this.client.users.resolve('265896171384340480').send(embed)
            .then(() => {
                message.channel.send("Your feedback has been sent! Get your dm open if you want an answer from the dev!");
            })
            .catch(() => {
                message.channel.send(`There's was an error sending this feedback, please try again`);
            });

    }
}

module.exports = FeedbackCommand;