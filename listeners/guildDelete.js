const { Listener } = require('discord-akairo');
const { statsChannel } = require('../config.json');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {

        let body;

        if (config.discordbotlist) {
            body = JSON.parse(config.discordbotlist.body);

            body.guilds = this.client.guilds.cache.size;
            body.users = this.client.users.cache.size;

            await guildCounter(config.discordbotlist.url, config.discordbotlist.authorization, body);
        }

        if (config.topgg) {
            body = JSON.parse(config.topgg.body.replace('{{SERVER_COUNT}}', this.client.guilds.cache.size));

            await guildCounter(config.topgg.url, config.topgg.authorization, body)
        }

        if (config.discordbotsgg) {
            body = JSON.parse(config.discordbotsgg.body.replace('{{SERVER_COUNT}}', this.client.guilds.cache.size));

            await guildCounter(config.discordbotsgg.url, config.discordbotsgg.authorization, body)
        }

        async function guildCounter(url, auth, body) {

            await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                },
                body: JSON.stringify(body)
            }).then((response) => console.log(response));

        }

        await guild.members.fetch();

        const channel = this.client.channels.resolve(statsChannel);
        let botCount = guild.members.cache.filter(member => member.user.bot).size;

        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Someone just removed me from their guild ;(')
            .setThumbnail(guild.iconURL())
            .addField('Guild', `${guild.name} (${guild.id})`)
            .addField('Total number of members', guild.memberCount, true)
            .addField('Number of users', guild.memberCount - botCount, true)
            .addField('Number of bots', botCount, true)
            .addField('Owner', `${guild.owner.user.username} (${guild.owner.id})`, true)
            .setFooter(`I'm now in ${this.client.guilds.cache.size} servers!`)
            .setTimestamp();

        channel.send(embed);

    }
}

module.exports = GuildDeleteListener;