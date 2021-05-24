const { Command } = require('discord-akairo');

class SlowModeCommand extends Command {
    constructor() {
        super('slowmode', {
            aliases: ['slowmode'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
            args: [
                {
                    id: 'delay',
                    prompt: {
                        start: 'How much the message interval should be?',
                    },
                    type: 'integer'
                },
                {
                    id: 'realtime',
                    prompt: {
                        start: 'For how long should the slowmode last?',
                        optional: true
                    },
                    type: 'integer'
                }
            ],
            channel: 'guild',
            description: {
                content: 'Enable slowmode in a channel',
                usage: '[Message interval in seconds] [Number of minutes the slowmode stay active]',
                examples: ['5 60']
            }
        });
    }

    async exec(message, args) {

        try {
            let delay = args.delay;
            let realtime = args.realtime;

            if (delay > 120) return message.channel.send('Slowmode can only be set to 120 seconds or lower!');

            message.channel.setRateLimitPerUser(delay, 'Slowmode command');

            if (realtime) {
                let time = 60000 * realtime;

                message.channel.send(`Slowmode have been set to \u0060${delay} seconds\u0060 and will end in \u0060${realtime} minutes\u0060!`);

                setTimeout (function (){
                    message.channel.setRateLimitPerUser(0);
                    return message.channel.send('Slowmode is now disabled!');
                }, time);

            } else {

                if (delay == 0) { return message.channel.send('Slowmode is now disabled!') }
                return message.channel.send(`Slowmode have been set to \u0060${delay} seconds\u0060!`);

            }
            
        } catch (err) {
            console.error(err);
        }

    }
}

module.exports = SlowModeCommand;