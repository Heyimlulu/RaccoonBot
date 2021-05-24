const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

class UrbanCommand extends Command {
    constructor() {
        super('urban', {
            aliases: ['urban'],
            category: 'fun',
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            args: [
                {
                    id: 'definition',
                    type: 'string',
                    prompt: {
                        start: 'Which word are you looking for?'
                    }
                }
            ],
            description: {
                content: 'Look up for a word on Urban Dictionary',
                usage: '[wat]',
                examples: ['wat']
            }
        });
    }

    async exec(message, args) {

        let search = args.definition;

        const i = Math.floor(Math.random() * Math.floor(10));

        fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${search}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.URBAN_DICTIONARY_SECRET_KEY,
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
            }

        }).then(response => {
            return response.json();

        }).then((response) => {

            try {
                const embed = new Discord.MessageEmbed()
                    .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                    .setAuthor('Urban dictionary')
                    .setThumbnail('https://s3.amazonaws.com/mashape-production-logos/apis/53aa4f67e4b0a9b1348da532_medium')
                    .setTitle(response.list[i].word)
                    .setURL(response.list[i].permalink)
                    .addField('Definition', response.list[i].definition, false)
                    .addField('Example', response.list[i].example, false)
                    .setFooter(`✍️${response.list[i].author} | 👍${response.list[i].thumbs_up} | 👎${response.list[i].thumbs_down}`)
                    .setTimestamp()

                message.channel.send(embed);

            } catch {
                return message.channel.send("I cannot find that word, maybe it doesn't exist?");
            }

        });

    }
}

module.exports = UrbanCommand;