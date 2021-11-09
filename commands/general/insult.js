const { Command } = require('discord-akairo');
const axios = require('axios');

class InsultCommand extends Command {
    constructor() {
        super('insult', {
            aliases: ['insult'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            args: [
                {
                    id: 'lang',
                    type: ['cn', 'de', 'el', 'en', 'es', 'fr', 'ru', 'sw'],
                    optional: true
                }
            ],
            description: {
                content: 'Generate an insult from evilinsult.com',
                usage: '[cn, de, el, en, es, fr, ru, sw]',
                examples: ['[language (optional)]']
            }
        });
    }

    async exec(message, args) {

        let lang = 'en';

        if (args.lang) {
            lang = args.lang;
        }

        await axios.get(`https://evilinsult.com/generate_insult.php?lang=${lang}&type=json`)
        .then(async (response) => {

            const result = response.data;

            await message.channel.send(result.insult);

        })

    }
}

module.exports = InsultCommand;