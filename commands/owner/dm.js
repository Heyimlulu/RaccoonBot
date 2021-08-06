const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const feedbackID = require('../../json/feedbackID.json');
const { prefix } = require('../../config.json');

class DmCommand extends Command {
    constructor() {
        super('dm', {
            aliases: ['dm'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'user',
                    type: 'string',
                    prompt: {
                        start: 'Who do you want to send that dm?'
                    }
                },
                {
                    id: 'text',
                    type: 'string',
                    prompt: {
                        start: 'What do you want to say to that user?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Send a dm to a user',
                usage: '[userID] [text]',
                example: ['265896171384340480 "Hello World ;)"']
            }
        });
    }

    async exec(message, args) {

        function uuidv4() {
            return 'xxxxxxxxx'.replace(/[x]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const uuid = uuidv4();
        feedbackID[uuid] = args.text;

        let user = this.client.users.resolve(args.user);
        if (!user) return message.channel.send('Not a valid user ID');
        let text = args.text;

        const embed = new Discord.MessageEmbed()
            .setTitle('You got a message from the developer')
            .setDescription(text)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setFooter(`If you wish to respond use the following command: ${prefix}feedback --reply ${uuid} <\message\>`)
            .setTimestamp()

        let Attachment = (message.attachments).array();
        if (Attachment[0]) {

            embed.setImage(Attachment[0].url)

            user.send(embed)
                .then(() => {
                    return message.channel.send(`DM sent to ${user.username}`);
                })
                .catch(() => {
                    return message.channel.send(`Could not send a DM to ${user.username}`);
                });

        } else {

            user.send(embed)
                .then(() => {
                    return message.reply(`Your message has been sent to ${user.tag}!`);
                })
                .catch(() => {
                    return message.channel.send(`Could not send a DM to ${user.tag}`)
                })

        }

    }
}

module.exports = DmCommand;