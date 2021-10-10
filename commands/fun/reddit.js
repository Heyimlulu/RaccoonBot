const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

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

    async exec(message, args) {

        let search = args.subreddit;

        await axios.get(`https://www.reddit.com/r/${search}.json?limit=100`)
        .then(async (response) => {

            const result = await response.data;

            if (response.error == 404) return message.channel.send('Not a valid subreddit');
            if (result.data.dist == 0) return message.channel.send('Not a valid subreddit');

            const i = Math.floor((Math.random() * result.data.children.length));

            if (result.data.children[i].over_18 == true && !message.channel.nsfw) return message.channel.send('No nsfw');

            const embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle(result.data.children[i].data.title)
                .setDescription(result.data.children[i].data.selftext)
                .setURL('https://reddit.com' + result.data.children[i].data.permalink)
                .setImage(result.data.children[i].data.url_overridden_by_dest)
                .setFooter(`/r/${result.data.children[i].data.subreddit} | ⬆ ${result.data.children[i].data.ups} 🗨 ${result.data.children[i].data.num_comments}`);

            message.channel.send(embed);

        });
    }
}

module.exports = RedditCommand;