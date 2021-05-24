const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class RemoveRoleCommand extends Command {
    constructor() {
        super('removerole', {
            aliases: ['removerole', 'rmvrole'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'string',
                },
                {
                    id: 'role',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Unassign a role to a member',
                usage: '[@user] [role]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let rmvEmbed = new MessageEmbed();
        let role = message.guild.roles.cache.find(role => role.name === args.role);
        let member = args.member;

        // If a member is mentioned
        if (message.mentions.members.first()) {
            member = message.mentions.members.first();
        }

        if (!role) return message.reply('I couldn\'t find that role!');

        if (message.guild.member(member).roles.cache.has(role.id)) { // If member have the role

            rmvEmbed.setTitle('Role Removed!')
                .setColor(role.hexColor ? role.hexColor : 'RANDOM')
                .addField('Unassigned Role', role)
                .addField('To', member)

            // Remove the role
            await message.guild.member(member).roles.remove(role);
            return message.channel.send(rmvEmbed);

        }

        await message.reply('This member didn\'t have that role!')

    }
}

module.exports = RemoveRoleCommand;