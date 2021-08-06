const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');
const messageID = require('../json/messageID.json');

class MessageReactionAddListener extends Listener {
    constructor() {
        super('messageReactionAdd', {
            emitter: 'client',
            event: 'messageReactionAdd'
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

        // If one of the reaction is the author of the message remove 1 to the reaction count
        reaction.users.cache.forEach(user => {
            if (reaction.message.author == user) reactionCount--;
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

            if (reaction.emoji == staremote || reaction.emoji.name == staremote) {
                if (messageID[reaction.message.id] && reactionCount > starcount) {
                    return editEmbed('starboard', staremote, messageID[reaction.message.id], this.client);
                } else if (reactionCount == starcount) {
                    return sendEmbed('starboard', staremote, this.client);
                }
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

            let editEmbed = new Discord.MessageEmbed()
                .setColor(reaction.message.member ? reaction.message.member.displayHexColor : 'RANDOM')
                .setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL())
                .addField('Jump to', `[message](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`, true)
                .addField('Channel', reaction.message.channel, true)
                .setDescription(description)
                .setFooter(`${emote} ${reactionCount}`)
                .setTimestamp();

            if (reaction.message.guild.emojis.resolve(emote)) editEmbed.setFooter(reactionCount, reaction.message.guild.emojis.resolve(emote).url);

            message.edit(editEmbed);
        }

        async function sendEmbed(name, emote, client) {
            let messageAttachments = reaction.message.attachments.map(u=> u.url)[0];
            // Should change this so it automatically pic the channel ( I'm lazy right now )
            let channel = client.channels.resolve(starboardChannel.starboard);

            let sendEmbed = new Discord.MessageEmbed()
                .setColor(reaction.message.member ? reaction.message.member.displayHexColor : 'RANDOM')
                .setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL())
                .addField('Jump to', `[message](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`, true)
                .addField('Channel', reaction.message.channel, true)
                .setFooter(`${emote} ${reactionCount}`)
                .setTimestamp();

            if (reaction.message.guild.emojis.resolve(emote)) sendEmbed.setFooter(reactionCount, reaction.message.guild.emojis.resolve(emote).url);

            let description = '';

            if (reaction.message.embeds[0]) {
                if (reaction.message.embeds[0].type == 'image') {
                    messageAttachments = reaction.message.embeds[0].url;
                }

                if (reaction.message.embeds[0].description) {
                    description = reaction.message.embeds[0].description;
                } else if (reaction.message.content) {
                    description = reaction.message.content;
                }
            } else if (reaction.message.content) {
                description = reaction.message.content;
            }

            // if message come from nsfw channel and the starboard channel isn't nsfw put it in spoiler
            if (reaction.message.channel.nsfw && !channel.nsfw) {
                sendEmbed.setDescription(`||${description}||`);
                if (messageAttachments != '') {
                    let message = await channel.send(`||${messageAttachments}||`, { embed: sendEmbed });
                    messageID[reaction.message.id] = message.id;
                } else {
                    let message = await channel.send({embed: sendEmbed});
                    messageID[reaction.message.id] = message.id;
                }
            } else {
                sendEmbed.setDescription(description);
                let message = await channel.send({ files: [messageAttachments], embed: sendEmbed })
                    .catch(async () =>  channel.send(messageAttachments, { embed: sendEmbed }));
                messageID[reaction.message.id] = message.id;
            }
        }

    }
}

module.exports = MessageReactionAddListener;