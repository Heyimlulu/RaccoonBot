const { Command } = require('discord-akairo');

class AvatarCommand extends Command {
    constructor() {
        super('botavatar', {
            aliases: ['botavatar'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'image',
                    type: 'url',
                    prompt: {
                        start: 'Which avatar should I have?'
                    }
                }
            ],
            description: {
                content: "Change the bot's avatar",
                usage: '[url]',
                example: ['url']
            }
        });
    }

    async exec(message, args) {

        let image = args.image;

        if (!image) {

            return message.channel.send('You did not provide any image')

        }

        this.client.user.setAvatar(image).catch(() => {

            message.channel.send("I couldn't set this avatar! Is it a picture?")

        })

        await message.channel.send('My avatar has been changed!')

    }
}

module.exports = AvatarCommand;
