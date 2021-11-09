const { Command } = require('discord-akairo');
const axios = require("axios");
const config = require('../../config/bot-sites.json');

class GuildCountCommand extends Command {
    constructor() {
        super('guildcount', {
            aliases: ['guildcount'],
            category: 'owner',
            ownerOnly: true,
            description: {
                content: "Get guilds count",
                usage: '[]',
                example: ['']
            }
        });
    }

    async exec(message) {

        let body;

        if (config.topgg) {
            body = JSON.parse(config.topgg.body.replace('{{SERVER_COUNT}}', this.client.guilds.cache.size));

            await guildCounter(config.topgg.url, config.topgg.authorization, body)
        }

        if (config.discordbotlist) {
            body = JSON.parse(config.discordbotlist.body);

            body.guilds = this.client.guilds.cache.size;
            body.users = this.client.users.cache.size;

            await guildCounter(config.discordbotlist.url, config.discordbotlist.authorization, body);
        }

        async function guildCounter(url, auth, body) {

            await axios.post(url, body, {
                'Content-Type': 'application/json',
                'Authorization': auth
            })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

        }

    }
}

module.exports = GuildCountCommand;
