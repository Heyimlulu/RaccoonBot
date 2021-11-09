const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');
const messageID = require('../../json/messageID.json');

class MessageReactionRemoveListener extends Listener {
    constructor() {
        super('messageReactionRemove', {
            emitter: 'client',
            event: 'messageReactionRemove'
        });
    }

    async exec(reaction) {

        if (reaction.partial) {
            await reaction.fetch()
                .catch(err => {
                    return console.error(err);
                });
        }

        if (reaction.message.partial) {
            await reaction.message.fetch()
                .catch(err => {
                    return console.error(err);
                });
        }

        await reaction.message.guild.members.fetch();

        let starboardChannel;
        let reactionCount = reaction.count;

        // If one of the reaction removed is the author of the message add 1 to the reaction count
        reaction.users.cache.forEach(user => {
            if (reaction.message.author == user) reactionCount++;
        });

        //	Starboard
        if (fs.existsSync(`./board/star${reaction.message.guild.id}.json`)) {
            starboardChannel = require(`../board/star${reaction.message.guild.id}.json`);
            let staremote = starboardChannel.emote;
            let starcount = starboardChannel.count;
            delete require.cache[require.resolve(`../board/star${reaction.message.guild.id}.json`)]; // Delete the boardChannel cache so it can reload it next time

            // Get name of the custom emoji
            if (reaction.message.guild.emojis.resolve(staremote.replace(/\D/g,''))) {
                staremote = reaction.message.guild.emojis.resolve(staremote.replace(/\D/g,''));
            }

            if (messageID[reaction.message.id] && (reaction.emoji == staremote || reaction.emoji.name == staremote) && reactionCount < starcount) {
                let channel = this.client.channels.resolve(starboardChannel.starboard);
                let message = await channel.messages.resolve(messageID[reaction.message.id]);
                delete messageID[reaction.message.id];
                // If it didn't find any message don't do anything
                if (!message) return;

                message.delete();
            } else if ((reaction.emoji == staremote || reaction.emoji.name == staremote) && reactionCount >= starcount) {
                return editEmbed('starboard', staremote, messageID[reaction.message.id], this.client);
            }
        }

        async function editEmbed(name, emote, boardID, client) {
            let channel = client.channels.resolve(starboardChannel.starboard);

            let message = await channel.messages.resolve(boardID);

            // If the message doesn't have embeds assume it got deleted so don't do anything
            if (!message) return;

            // If the original embed description is empty make this embed empty ( and not undefined )
            let description = message.embeds[0].description;
            if (!message.embeds[0].description || message.embeds[0].description == undefined)
                description = '';

            let Embed = new Discord.MessageEmbed()
                .setColor(reaction.message.member ? reaction.message.member.displayHexColor : 'RANDOM')
                .setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL())
                .addField('Jump to', `[message](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`, true)
                .addField('Channel', reaction.message.channel, true)
                .setDescription(description)
                .setFooter(`${emote} ${reactionCount}`)
                .setTimestamp();

            if (reaction.message.guild.emojis.resolve(emote)) Embed.setFooter(reactionCount, reaction.message.guild.emojis.resolve(emote).url);

            message.edit({ embed: Embed });
        }

    }
}

module.exports = MessageReactionRemoveListener;