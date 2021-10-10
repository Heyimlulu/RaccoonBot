const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

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

        await axios.get(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${search}`, {
            headers: {
                "x-rapidapi-key": process.env.URBAN_DICTIONARY_SECRET_KEY,
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
            }
        })
        .then(async (response) => {

            const result = response.data.list;

            const i = Math.floor(Math.random() * result.length);

            const embed = new Discord.MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setAuthor('Urban dictionary')
                .setThumbnail('https://s3.amazonaws.com/mashape-production-logos/apis/53aa4f67e4b0a9b1348da532_medium')
                .setTitle(result[i].word)
                .setURL(result[i].permalink)
                .addField('Definition', result[i].definition, false)
                .addField('Example', result[i].example, false)
                .setFooter(`✍️${result[i].author} | 👍${result[i].thumbs_up} | 👎${result[i].thumbs_down}`)
                .setTimestamp()

            message.channel.send(embed);
        }).catch(() => message.channel.send("I cannot find that word, maybe it doesn't exist?"))
    }
}

module.exports = UrbanCommand;