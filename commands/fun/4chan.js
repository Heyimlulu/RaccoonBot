const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const boards = require('4chan-boards');
const { MessageEmbed } = require('discord.js');

// Avoid HTML syntax to appear on discord
const Turndown = require('turndown');
let turndown = new Turndown();

class FourChanCommand extends Command {
    constructor() {
        super('4chan', {
            aliases: ['4chan'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
            args: [
                {
                    id: 'board',
                    type: 'string',
                    prompt: {
                        start: 'Which board do you want to browse?',
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Send random images from a 4chan board you choose',
                usage: '[board]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        if (boards.getType(args.board) === boards.NSFW && !message.channel.nsfw) return message.channel.send('Sorry, you should be in a NSFW channel to display this board!');

        if (!args.board) return;

        let i = Math.floor((Math.random() * 5) + 1);

        fetch(`https://a.4cdn.org/${args.board}/${i}.json`).then((response) => {
            return response.json();
        }).then((response) => {

            // IF => no threads found then return
            if (!response.threads) return message.channel.send('I couldn\'t find this board! Are you sure you put a valid board?');

            // Randomly reinitialize variable by all found threads
            i = Math.floor((Math.random() * response.threads.length) + 1);

            // WHILE LOOP => Until it found a threads
            while(!response.threads[i]) {
                i = Math.floor((Math.random() * response.threads.length) + 1);
            }

            // If post is sticky search
            while(response.threads[i].posts[0].sticky == 1 || !response.threads[i].posts) {
                i = Math.floor((Math.random() * response.threads.length));
            }

            let title = response.threads[i].posts[0].sub;
            let description = response.threads[i].posts[0].com;
            let boardName = boards.getName(args.board);

            // IF => No title or description then reinitialize variables
            if (!title) { title = 'No title'; }
            if (!description) { description = 'No description'; }
            if (!boardName) { boardName = args.board; }

            console.log(response.threads[i].posts[0]);

            const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle(turndown.turndown(title))
                .setDescription(turndown.turndown(description))
                .setImage(`https://i.4cdn.org/${args.board}/${response.threads[i].posts[0].tim}${response.threads[i].posts[0].ext}`)
                .setURL(`https://boards.4channel.org/${args.board}/thread/${response.threads[i].posts[0].no}/${response.threads[i].posts[0].semantic_url}`)
                .setFooter(`${boardName} | ${response.threads[i].posts[0].name} | ${response.threads[i].posts[0].no}  | ${response.threads[i].posts[0].now}`);

            // IF => File type doesn't work on embed message then send it as a link
            if (response.threads[i].posts[0].ext == '.webm' || response.threads[i].posts[0].ext == '.pdf' || response.threads[i].posts[0].ext == '.swf') {
                message.channel.send(embed);
                message.channel.send(`https://i.4cdn.org/${args.board}/${response.threads[i].posts[0].tim}${response.threads[i].posts[0].ext}`);
            } else {
                message.channel.send(embed);
            }

        })
            .catch((err) => {
                if (err.type == 'invalid-json') return message.channel.send('I couldn\'t find this board! Are you sure you put a valid board?');
                console.error(err);
                return message.channel.send('Uh-oh, an error has occurred! Please try again!');
            });

    }
}

module.exports = FourChanCommand;