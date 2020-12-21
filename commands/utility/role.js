const Discord = require('discord.js');
const config = require('../../json/config.json');

module.exports = {
    name: 'role',
    description: 'Create yourself some custom roles!',
    category: 'utility',
    execute(message, args) {

        if (message.content === `${config.prefix}role`) {
            const InfoEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor('RacoonBot')
                .setTitle('Role commands help')
                .addField('Creating a new role', 'racoon role create [Role name] [#hex Color] [<= example: #111000 or #111]\n*E.g. racoon role create my new role #111*', false)
                .addField('Deleting a role (require manage roles permission)', 'racoon role delete [Role name]\n*E.g. racoon role delete my new role*', false)
                .addField('Adding a role to a user', 'racoon role add [Role name]\n*E.g. racoon role add my new role*', false)
                .addField('Removing a role to a user', 'racoon role remove [Role name]\n*E.g. racoon role remove my new role*', false)

            message.channel.send(InfoEmbed)
        }  else {

            // Create role to server
            if (args[0].toLowerCase() == 'create') {
                let rName = message.content.split(`${config.prefix}role create`).join("")
                let rColor;
                args.forEach(arg => {
                    if (arg.startsWith("#")) {
                        rColor = arg
                    }
                })

                // Check if the role has a name
                if (!rName) {
                    message.channel.send('You did not specify a name for your role!')
                    return
                }
                // Check if the role has a color
                if (!rColor) {
                    message.channel.send('You did not specify a color for your role!')
                    return
                }

                // Check if the color got a correct Hex Color Code
                if (rColor >= 16777215) message.channel.send(`That hex color range was too big!`)
                if (rColor <= 0) message.channel.send(`That hex color range was too small`)
                rName = rName.replace(`${rColor}`, ``)

                // Create the role with the user's value
                const rNew = message.guild.roles.create({
                    data: {
                        name: rName,
                        color: rColor,
                    }
                })

                // Display the new created role in a MessageEmbed
                const Embed = new Discord.MessageEmbed()
                    .setTitle('New role assigned!')
                    .setDescription(`${message.author.tag} has created the role "${rName}"\n with Hex color code: ${rColor}`)
                    .setColor(rColor)

                // Send the MessageEmbed
                message.channel.send(Embed)
            }

            // Delete role from server.
            // REQUIRE MANAGE ROLE PERMISSION
            else if (args[0].toLowerCase() == 'delete') {

                let roleToDelete = message.content.split(`${config.prefix}role delete`).join("").trim();

                if (!roleToDelete){ // If variable is an empty string
                    message.channel.send('You did not specify a role!')
                    return
                } else { // If variable is not an empty string

                    // Check if member has permission
                    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have manage roles permission!");

                    const role = message.guild.roles.cache.find(r => r.name == roleToDelete)

                    // Delete the role
                    role.delete(roleToDelete);

                    // Display on a embed message
                    const EmbedDelete = new Discord.MessageEmbed()
                        .setTitle('Deleted role!')
                        .setDescription(`${message.author.tag} has deleted the role "${roleToDelete}"`)

                    message.channel.send(EmbedDelete)
                }
            }

            // Add role to user
            else if (args[0].toLowerCase() == 'add') {

                let roleToAdd = message.content.split(`${config.prefix}role add`).join("").trim();

                if (!roleToAdd){
                    message.channel.send('You did not specify a role!')
                    return
                } else {

                    // Check if the role exists
                    const role = message.guild.roles.cache.find(r => r.name == roleToAdd);

                    if (message.guild.member(message.author).roles.cache.has(role.id)) {
                        message.channel.send(`You already have that role! ${message.author.tag}`)
                    } else {
                        message.guild.member(message.author).roles.add(role);

                        const EmbedDelete = new Discord.MessageEmbed()
                            .setTitle('Role added!')
                            .setDescription(`${message.author.tag} has been received the role "${roleToAdd}"`)

                        message.channel.send(EmbedDelete)
                    }
                }
            }

            // Remove role to user
            else if (args[0].toLowerCase() == 'remove') {

                let roleToRemove = message.content.split(`${config.prefix}role remove`).join("").trim();

                if (!roleToRemove){
                    message.channel.send('You did not specify a role!')
                    return
                } else {

                    // Check if the role exists
                    const role = message.guild.roles.cache.find(r => r.name == roleToRemove);

                    if (message.guild.member(message.author).roles.cache.has(role.id)) {
                        message.guild.member(message.author).roles.remove(role);

                        const EmbedDelete = new Discord.MessageEmbed()
                            .setTitle('Role removed!')
                            .setDescription(`${message.author.tag} has been removed the role "${roleToRemove}"`)

                        message.channel.send(EmbedDelete)
                    } else {
                        message.channel.send(`You did not have that role! ${message.author.tag}`)
                    }
                }
            }
        }
    }
}