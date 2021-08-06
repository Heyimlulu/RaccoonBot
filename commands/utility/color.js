const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ColorCommand extends Command {
    constructor() {
        super('color', {
            aliases: ['color'],
            category: 'utility',
            args: [
                {
                    id: 'color',
                    type: 'string',
                    prompt: {
                        start: 'Please input a color'
                    },
                }
            ],
            description: {
                content: 'Set you a role to a specified color',
                usage: '[#800080]',
                example: ['#800080']
            }
        });
    }

    async exec(message, args) {

        let embed = new Discord.MessageEmbed()
            .setColor(args.color);

        // If color input match "#800080" format
        if (args.color.match(/^#[0-9A-F]{6}$/i)) {

            let role = message.guild.roles.cache.find(role => role.name === args.color);

            // If role doesn't exist
            if (!role) {
                await message.guild.roles.create({
                    data: {
                        name: args.color,
                        color: args.color.toUpperCase()
                    },
                    reason: `Color command executed by ${message.author.username}`
                });

                embed.setTitle('Role created! try again to apply it to yourself!')

                return message.channel.send(embed);

            } else if (message.guild.member(message.author).roles.cache.has(role.id)) { // If author has the specified color role

                embed.setTitle('Role removed!')

                await message.guild.member(message.author).roles.remove(role);
                return message.channel.send(embed);
                
            }

            embed.setTitle('Role added!')

            // Add role to the message author
            await message.guild.member(message.author).roles.add(role);
            return message.channel.send(embed);

        } else {

            embed.setTitle(`${args.color} is not a valid color`)

            return message.channel.send(embed);

        }

    }
}

module.exports = ColorCommand;