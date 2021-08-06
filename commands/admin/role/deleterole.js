const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class DeleteRoleCommand extends Command {
    constructor() {
        super('deleterole', {
            aliases: ['deleterole'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            channel: 'guild',
            args: [
                {
                    id: 'role',
                    type: 'string',
                    prompt: {
                        start: 'Which role do you want to delete?'
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Delete an existing role',
                usage: '[role]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let embed = new Discord.MessageEmbed()
            .setColor(args.color)
            .setAuthor(message.author.username, message.author.displayAvatarURL());

        if (!args.role) return;

        await message.guild.roles.cache.find(role => role.name === args.role).delete(`deleterole command by ${message.author.username}`);

        embed.setTitle(`\u0060${args.role}\u0060 has been deleted by ${message.author.username}!`)

        return await message.channel.send(embed);

    }
}

module.exports = DeleteRoleCommand;