const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    optional: 'true'
                }
            ],
            description: {
                content: 'Show avatar of the mentioned user or yourself',
                usage: '[serverId] or [none]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        const embed = this.client.util.embed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())

        if (!args.user) {

            embed.setTitle(message.author.username);

            if (message.author.displayAvatarURL().endsWith('.gif')) {
                embed.setDescription(`[gif](${message.author.displayAvatarURL({ format: 'gif', size: 2048 })})`);
                embed.setImage(message.author.displayAvatarURL({ format: 'gif', size: 2048 }));
            } else {
                embed.setDescription(`[png](${message.author.displayAvatarURL({ format: 'png', size: 2048 })}) | [jpeg](${message.author.displayAvatarURL({ format: 'jpg', size: 2048 })}) | [webp](${message.author.displayAvatarURL({ format: 'webp', size: 2048 })})`);
                embed.setImage(message.author.displayAvatarURL({ format: 'png', size: 2048 }));
            }
        } else {
            if (args.user.displayAvatarURL().endsWith('.gif')) {
                embed.setDescription(`[gif](${args.user.displayAvatarURL({ format: 'gif', size: 2048 })})`);
                embed.setImage(args.user.displayAvatarURL({ format: 'gif', size: 2048 }));
            } else {
                embed.setDescription(`[png](${args.user.displayAvatarURL({ format: 'png', size: 2048 })}) | [jpeg](${args.user.displayAvatarURL({ format: 'jpg', size: 2048 })}) | [webp](${args.user.displayAvatarURL({ format: 'webp', size: 2048 })})`);
                embed.setImage(args.user.displayAvatarURL({ format: 'png', size: 2048 }));
            }
        }

        message.channel.send(embed);

    }
}

module.exports = AvatarCommand;