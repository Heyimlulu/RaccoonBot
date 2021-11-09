const { Command } = require('discord-akairo');

class ShutdownCommand extends Command {
    constructor() {
        super('reboot', {
            aliases: ['reboot'],
            category: 'owner',
            ownerOnly: true,
            description: {
                content: 'Reboot the bot',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        setTimeout(() => {
            process.exit();
        }, 5000)

        console.log('\x1b[31m\x1b[47m\x1b[5mSHUTING DOWN!!!!!\x1b[0m');
        await message.channel.send("Ok I'm leaving bye", { files: ['./asset/gif/okay-im-leaving-bye.gif']});
        console.log('\x1b[31m\x1b[47m\x1b[5mSHUTING DOWN!!!!!\x1b[0m');

    }
}

module.exports = ShutdownCommand;
