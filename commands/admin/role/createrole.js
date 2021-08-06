const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CreateRoleCommand extends Command {
    constructor() {
        super('createrole', {
            aliases: ['createrole', 'newrole'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            channel: 'guild',
            args: [
                {
                    id: 'color',
                    type: 'string',
                    prompt: {
                        start: 'Which color for the new role?'
                    }
                },
                {
                    id: 'role',
                    type: 'string',
                    prompt: {
                        start: 'What name should I use for the new role?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Create a new role',
                usage: '[hex color] [role]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let embed = new Discord.MessageEmbed()
            .setColor(args.color)
            .setAuthor(message.author.username, message.author.displayAvatarURL());

        if (!args.role) return;

        if (args.color.match(/^#[0-9A-F]{6}$/i)) {

            let role = message.guild.roles.cache.find(role => role.name === args.role);

            // IF => role doesn't exist => Create role
            if (!role) {
                await message.guild.roles.create({
                    data: {
                        name: args.role,
                        color: args.color.toUpperCase()
                    },
                    reason: `createrole command executed by ${message.author.username}`
                });

                embed.setTitle(`\u0060${args.role}\u0060 has been created by ${message.author.username}!`)

                return await message.channel.send(embed);

            }

        } else {

            embed.setTitle(`${args.color} is not a valid color`)

            return await message.channel.send(embed);

        }

    }
}

module.exports = CreateRoleCommand;