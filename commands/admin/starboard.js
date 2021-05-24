const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');

class StarBoardCommand extends Command {
    constructor() {
        super('starboard', {
            aliases: ['starboard'],
            category: 'admin',
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    id: 'emote',
                    type: 'string',
                    prompt: {
                        start: 'What emote should be used to enter the starboard?',
                        optional: true
                    },
                    default: '👍',
                },
                {
                    id: 'count',
                    type: 'integer',
                    prompt: {
                        start: 'How many times should that emote be reacted to enter the starboard?',
                        optional: true
                    },
                    default: '10',
                },
                {
                    id: 'remove',
                    match: 'flag',
                    flag: '--remove'
                }
            ],
            channel: 'guild',
            description: {
                content: 'Set starboard to the current channel. --remove to remove the starboard',
                usage: '[emote] [minimum number required to enter starboard]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        // Get the channelID
        let starboardChannel = message.channel.id;

        if (!args.remove) {

            fs.writeFile(`./board/star${message.guild.id}.json`, `{"starboard": "${starboardChannel}", "emote": "${args.emote}", "count": "${args.count}"}`, function (err) {

                if (err) {
                    console.log(err);
                }

            });

            return message.channel.send(`This channel have been set as the starboard with ${args.emote} with the minimum of ${args.count}`);

        } else {

            fs.unlink(`./board/star${message.guild.id}.json`, function (err) {

                if (err) return message.channel.send('There is no starboard');
                return message.channel.send('Starboard deleted!');

            });

        }

        this.client.on('messageReactionAdd', async (reaction, user) => {
            const handleStarboard = async () => {
                const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
                const msgs = await starboard.messages.fetch({ limit: 100 });
                const existingMsg = msgs.find(msg =>
                    msg.embeds.length === 1 ?
                        (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
                if(existingMsg) existingMsg.edit(`${reaction.count} - ${args.emote}`);
                else {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                        .addField('Url', reaction.message.url)
                        .setDescription(reaction.message.content)
                        .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
                    if(starboard)
                        starboard.send(`1 - ${args.emote}`, embed);
                }
            }
            if(reaction.emoji.name === args.emote) {
                if(reaction.message.channel.name.toLowerCase() === starboardChannel) return;
                if(reaction.message.partial) {
                    await reaction.fetch();
                    await reaction.message.fetch();
                    handleStarboard();
                }
                else
                    handleStarboard();
            }
        });

        this.client.on('messageReactionRemove', async (reaction, user) => {
            const handleStarboard = async () => {
                const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
                const msgs = await starboard.messages.fetch({ limit: 100 });
                const existingMsg = msgs.find(msg =>
                    msg.embeds.length === 1 ?
                        (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
                if(existingMsg) {
                    if(reaction.count === 0)
                        existingMsg.delete({ timeout: 2500 });
                    else
                        existingMsg.edit(`${reaction.count} - ${args.emote}`)
                };
            }
            if(reaction.emoji.name === args.emote) {
                if(reaction.message.channel.name.toLowerCase() === starboardChannel) return;
                if(reaction.message.partial) {
                    await reaction.fetch();
                    await reaction.message.fetch();
                    handleStarboard();
                }
                else
                    handleStarboard();
            }
        });

        console.log(starboardChannel);

    }
}

module.exports = StarBoardCommand;