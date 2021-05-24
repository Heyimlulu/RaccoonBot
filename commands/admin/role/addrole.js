const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AddRoleCommand extends Command {
    constructor() {
        super('addrole', {
            aliases: ['addrole'],
            category: 'admin',
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'string',
                },
                {
                    id: 'role',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Assign a role to a member',
                usage: '[@user] [role]',
                example: ['']
            }
        });
    }

    async exec(message, args) {

        let addEmbed = new MessageEmbed();
        let role = message.guild.roles.cache.find(role => role.name === args.role);
        let member = args.member;

        // If a member is mentioned
        if (message.mentions.members.first()) {
            member = message.mentions.members.first();
        }

        if (!role) return message.reply('I couldn\'t find that role!');

        if (!message.guild.member(member).roles.cache.has(role.id)) { // If member doesnt have the role

            addEmbed.setTitle('Role Added!')
                .setColor(role.hexColor ? role.hexColor : 'RANDOM')
                .addField('Assigned Role', role)
                .addField('To', member)

            // Add role
            await message.guild.member(member).roles.add(role);
            return message.channel.send(addEmbed);

        }

        await message.reply(`This member has already that role!`)

    }
}

module.exports = AddRoleCommand;