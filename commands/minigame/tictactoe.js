const { Command } = require('discord-akairo');

class TTTCommand extends Command {
    constructor() {
        super('ttt', {
            aliases: ['tictactoe', 'ttt'],
            category: 'minigame',
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: 'Play Tic Tac Toe!',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message) {

        await message.channel.send('Here we go!', {
            components: [
                {type: 1, components: [
                        {type: 2, label: "_", style: 2, custom_id: "ttt11"},
                        {type: 2, label: "_", style: 2, custom_id: "ttt12"},
                        {type: 2, label: "_", style: 2, custom_id: "ttt13"},
                    ]},
                {type: 1, components: [
                        {type: 2, label: "_", style: 2, custom_id: "ttt21"},
                        {type: 2, label: "_", style: 2, custom_id: "ttt22"},
                        {type: 2, label: "_", style: 2, custom_id: "ttt23"},
                    ]},
                {type: 1, components: [
                        {type: 2, label: "_", style: 2, custom_id: "ttt31"},
                        {type: 2, label: "_", style: 2, custom_id: "ttt32"},
                        {type: 2, label: "_", style: 2, custom_id: "ttt33"},
                    ]},
            ]
        });

    }
}

module.exports = TTTCommand;