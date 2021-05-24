const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class StrawpollCommand extends Command {
    constructor() {
        super('strawpoll', {
            aliases: ['strawpoll'],
            category: 'fun',
            args: [
                {
                    id: 'title',
                    type: 'string',
                    prompt: {
                        start: 'Which title should I have?'
                    }
                },
                {
                    id: 'options',
                    type: 'string',
                    prompt: {
                        start: 'What are the options?'
                    },
                    match: 'rest'
                },
                {
                    id: 'multi',
                    match: 'flag',
                    flag: '--multi'
                }
            ],
            description: {
                content: 'Create a poll (use | to separate options)',
                usage: '[title] [options] [--multi]',
                examples: ['"Am I a cute bot?" yes | no | ofc you are ;3']
            }
        });
    }

    exec(message, args) {

        let options = args.options.trim().split('|');

        let request = {
            'title': args.title,
            'options': options,
            'multi': args.multi
        };

        console.log(JSON.stringify(request));

        fetch('https://www.strawpoll.me/api/v2/polls', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),

        }).then((response) => {
            return response.json();

        }).then((response) => {
            return message.channel.send(`Your strawpoll is ready! https://www.strawpoll.me/${response.id}`);
        });

    }
}

module.exports = StrawpollCommand;