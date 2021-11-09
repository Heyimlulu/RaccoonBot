const { Listener } = require('discord-akairo');
const { statsChannel } = require('../../config.json');
const Discord = require('discord.js');
// const fetch = require('node-fetch');
const config = require('../../config/bot-sites.json');
const axios = require("axios");
const guildBlacklist = require('../../models').guildBlacklist;

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {

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

        await guild.members.fetch();

        const channel = this.client.channels.resolve(statsChannel);
        let botCount = guild.members.cache.filter(member => member.user.bot).size;

        const embed = new Discord.MessageEmbed()
            .setColor('#52e80d')
            .setTitle('Someone invited me in their guild')
            .setThumbnail(guild.iconURL())
            .addField('Guild', `${guild.name} (${guild.id})`)
            .addField('Total number of members', guild.memberCount, true)
            .addField('Number of users', guild.memberCount - botCount, true)
            .addField('Number of bots', botCount, true)
            .addField('Owner', `${guild.owner.user.username} (${guild.owner.id})`, true)
            .setFooter(`I'm now in ${this.client.guilds.cache.size} servers!`)
            .setTimestamp();

        const blacklist = await guildBlacklist.findOne({where: {guildID: guild.id}});

        if (blacklist) {
            guild.leave();
            return channel.send(`${guild.owner.user.username} (${guild.owner.id}) from ${guild.name} (${guild.id}) tried to add me to their guild while being blacklisted!`);
        }

        channel.send(embed);

    }
}

module.exports = GuildCreateListener;
