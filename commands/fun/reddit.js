const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');

class RedditCommand extends Command {
    constructor() {
        super('reddit', {
            aliases: ['reddit'],
            category: 'fun',
            args: [
                {
                    id: 'subreddit',
                    type: 'string',
                    prompt: {
                        start: 'Which user do you want me to verify cuteness?'
                    }
                }
            ],
            description: {
                content: 'Send random images from the subreddit you choose',
                usage: '[ProgrammerHumor]',
                examples: ['ProgrammerHumor']
            }
        });
    }

    exec(message, args) {

        let search = args.subreddit;

        fetch('https://www.reddit.com/r/' + search + '.json?limit=100').then((response) => {
            return response.json();
        }).then((response) => {

            if (response.error == 404) return message.channel.send('Not a valid subreddit');

            if (response.data.dist == 0) return message.channel.send('Not a valid subreddit');

            let i = Math.floor((Math.random() * response.data.children.length));

            if (response.data.children[i].data.over_18 == true && !message.channel.nsfw) return message.channel.send('No nsfw');

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle(response.data.children[i].data.title)
                .setDescription(response.data.children[i].data.selftext)
                .setURL('https://reddit.com' + response.data.children[i].data.permalink)
                .setImage(response.data.children[i].data.url_overridden_by_dest)
                .setFooter(`/r/${response.data.children[i].data.subreddit} | ⬆ ${response.data.children[i].data.ups} 🗨 ${response.data.children[i].data.num_comments}`);

            message.channel.send(embed);

        });

    }
}

module.exports = RedditCommand;