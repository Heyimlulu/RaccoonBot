const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ServerIconCommand extends Command {
    constructor() {
        super('servericon', {
            aliases: ['servericon'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'serverid',
                    type: 'integer',
                    optional: 'true'
                }
            ],
            description: {
                content: 'Show the server icon from other guild or yours',
                usage: '[serverID] or [none]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())

        if (!args.serverid) {

            embed.setTitle(message.guild.name);
            
            if (message.guild.iconURL().endsWith('.gif')) {
                embed.setDescription(`[gif](${message.guild.iconURL({ format: 'gif', size: 2048 })})`);
                embed.setImage(message.guild.iconURL({ format: 'gif', size: 2048 }));
            } else {
                embed.setDescription(`[png](${message.guild.iconURL({ format: 'png', size: 2048 })}) | [jpeg](${message.guild.iconURL({ format: 'jpg', size: 2048 })}) | [webp](${message.guild.iconURL({ format: 'webp', size: 2048 })})`);
                embed.setImage(message.guild.iconURL({ format: 'png', size: 2048 }));
            }

        } else {

            // Need a Try-Catch or it will crash
            try {
                embed.setTitle(this.client.guilds.cache.find(guild => guild.id == args.serverid).name);

                if (this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL().endsWith('.gif')) {
                    embed.setDescription(`[gif](${this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL({ format: 'gif', size: 2048 })})`);
                    embed.setImage(this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL({ format: 'gif', size: 2048 }));
                } else {
                    embed.setDescription(`[png](${this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL({ format: 'png', size: 2048 })}) | [jpeg](${this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL({ format: 'jpg', size: 2048 })}) | [webp](${this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL({ format: 'webp', size: 2048 })})
                `);
                    embed.setImage(this.client.guilds.cache.find(guild => guild.id == args.serverid).iconURL({ format: 'png', size: 2048 }));
                }
            } catch {
                return message.reply('I couldn\'t get this server icon!');
            }
            
        }

        message.channel.send(embed);

    }
}

module.exports = ServerIconCommand;