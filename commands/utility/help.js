const Discord = require('discord.js');
const help = require('../../json/commands/utility/help.json');
const config = require('../../json/config.json');

module.exports = {
    name: 'help',
    description: 'Displays the list of commands for the bot.',
    category: 'utility',
    execute(message) {

        const helpCommandEmbed = new Discord.MessageEmbed();

        // Admin commands
        if (message.content.startsWith(`${config.prefix}help ban`)){
            helpCommandEmbed.setTitle(help.admin.ban.name)
                .setDescription(help.admin.ban.description)
                .addField('Example', help.admin.ban.example, true)
                .addField('User permission', 'BAN_MEMBERS', true)
                .addField('Bot permission', 'BAN_MEMBERS', true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help unban`)){
            helpCommandEmbed.setTitle(help.admin.unban.name)
                .setDescription(help.admin.unban.description)
                .addField('Example', help.admin.unban.example, true)
                .addField('User permission', 'BAN_MEMBERS', true)
                .addField('Bot permission', 'BAN_MEMBERS', true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help kick`)){
            helpCommandEmbed.setTitle(help.admin.kick.name)
                .setDescription(help.admin.kick.description)
                .addField('Example', help.admin.kick.example, true)
                .addField('User permission', 'KICK_MEMBERS', true)
                .addField('Bot permission', 'KICK_MEMBERS', true)

            return message.channel.send(helpCommandEmbed);
        }

        // Fun command
        if (message.content.startsWith(`${config.prefix}help cute`)){
            helpCommandEmbed.setTitle(help.fun.cute.name)
                .setDescription(help.fun.cute.description)
                .addField('Example', help.fun.cute.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help explosm`)){
            helpCommandEmbed.setTitle(help.fun.explosm.name)
                .setDescription(help.fun.explosm.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help giphy`)){
            helpCommandEmbed.setTitle(help.fun.giphy.name)
                .setDescription(help.fun.giphy.description)
                .addField('Example', help.fun.giphy.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help imgur`)){
            helpCommandEmbed.setTitle(help.fun.imgur.name)
                .setDescription(help.fun.imgur.description)
                .addField('Example', help.fun.imgur.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help love`)){
            helpCommandEmbed.setTitle(help.fun.love.name)
                .setDescription(help.fun.love.description)
                .addField('Example', help.fun.love.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help reddit`)){
            helpCommandEmbed.setTitle(help.fun.reddit.name)
                .setDescription(help.fun.reddit.description)
                .addField('Example', help.fun.reddit.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help steam`)){
            helpCommandEmbed.setTitle(help.fun.steam.name)
                .setDescription(help.fun.steam.description)
                .addField('Example', help.fun.steam.example, true)

            return message.channel.send(helpCommandEmbed);
        }

        // General commands
        if (message.content.startsWith(`${config.prefix}help 8ball`)){
            helpCommandEmbed.setTitle(help.general["8ball"].name)
                .setDescription(help.general["8ball"].description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help advice`)){
            helpCommandEmbed.setTitle(help.general.advice.name)
                .setDescription(help.general.advice.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help bing`)){
            helpCommandEmbed.setTitle(help.general.bing.name)
                .setDescription(help.general.bing.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help fact`)){
            helpCommandEmbed.setTitle(help.general.fact.name)
                .setDescription(help.general.fact.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help flip`)){
            helpCommandEmbed.setTitle(help.general.flip.name)
                .setDescription(help.general.flip.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help roll`)){
            helpCommandEmbed.setTitle(help.general.roll.name)
                .setDescription(help.general.roll.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help sayd`)){
            helpCommandEmbed.setTitle(help.general.sayd.name)
                .setDescription(help.general.sayd.description)
                .addField('Example', help.general.sayd.example, true)

            return message.channel.send(helpCommandEmbed);
        }

        // Utility commands
        if (message.content.startsWith(`${config.prefix}help download`)){
            helpCommandEmbed.setTitle(help.utility.download.name)
                .setDescription(help.utility.download.description)
                .addField('Example', help.utility.download.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help feedback`)){
            helpCommandEmbed.setTitle(help.utility.feedback.name)
                .setDescription(help.utility.feedback.description)
                .addField('Example', help.utility.feedback.example, true)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help info`)){
            helpCommandEmbed.setTitle(help.utility.info.name)
                .setDescription(help.utility.info.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help invite`)){
            helpCommandEmbed.setTitle(help.utility.invite.name)
                .setDescription(help.utility.invite.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help ping`)){
            helpCommandEmbed.setTitle(help.utility.ping.name)
                .setDescription(help.utility.ping.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help role`)){
            helpCommandEmbed.setTitle(help.utility.role.name)
                .setDescription(help.utility.role.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help serverinfo`)){
            helpCommandEmbed.setTitle(help.utility.serverinfo.name)
                .setDescription(help.utility.serverinfo.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help stats`)){
            helpCommandEmbed.setTitle(help.utility.stats.name)
                .setDescription(help.utility.stats.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help upvote`)){
            helpCommandEmbed.setTitle(help.utility.upvote.name)
                .setDescription(help.utility.upvote.description)

            return message.channel.send(helpCommandEmbed);
        }
        if (message.content.startsWith(`${config.prefix}help userinfo`)){
            helpCommandEmbed.setTitle(help.utility.userinfo.name)
                .setDescription(help.utility.userinfo.description)
                .addField('Example', help.utility.userinfo.example, true)

            return message.channel.send(helpCommandEmbed);
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setAuthor('RacoonBot')
            .setColor("RANDOM")
            .setTitle('Help commands list')
            .setDescription('Use **racoon help command** for commands detail and example, E.g. racoon help role')
            .addField('⚡\u2000Admin commands', `\u0060${help.admin.ban.name}\u0060 \u0060${help.admin.unban.name}\u0060 \u0060${help.admin.kick.name}\u0060`, false) // Admin commands
            .addField('🎉\u2000Fun commands', `\u0060${help.fun.cute.name}\u0060 \u0060${help.fun.explosm.name}\u0060 \u0060${help.fun.giphy.name}\u0060 \u0060${help.fun.imgur.name}\u0060 \u0060${help.fun.love.name}\u0060 \u0060${help.fun.reddit.name}\u0060 \u0060${help.fun.steam.name}\u0060`, false) // Fun commands
            .addField('📝\u2000General commands', `\u0060${help.general["8ball"].name} \u0060 \u0060${help.general.advice.name}\u0060 \u0060${help.general.bing.name}\u0060 \u0060${help.general.fact.name}\u0060 \u0060${help.general.flip.name}\u0060 \u0060${help.general.roll.name}\u0060  \u0060${help.general.sayd.name}\u0060`, false) // General commands
            .addField('🔩\u2000Utility commands', `\u0060${help.utility.download.name}\u0060 \u0060${help.utility.feedback.name}\u0060 \u0060${help.utility.info.name}\u0060 \u0060${help.utility.invite.name}\u0060  \u0060${help.utility.ping.name}\u0060 \u0060${help.utility.role.name}\u0060 \u0060${help.utility.serverinfo.name}\u0060 \u0060${help.utility.stats.name}\u0060 \u0060${help.utility.upvote.name}\u0060 \u0060${help.utility.userinfo.name}\u0060`, false) // Utility commands

        //message.author.send(helpEmbed); // Send a dm to the user
        //message.reply("I've sent you a DM with the commands list details.");

        message.channel.send(helpEmbed);
    },
};