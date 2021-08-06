const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'user'],
            category: 'utility',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Which user do you want to fetch information?'
                    },
                }
            ],
            description: {
                content: 'Show info about a user',
                usage: '[@user]',
                example: ['user']
            }
        });
    }

    exec(message, args) {

        let user = message.author;

        if(args.user){
            user = args.user;
        }

        let member = message.guild.member(user);

        const Embed = new Discord.MessageEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setTitle('User information')
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setThumbnail(user.displayAvatarURL())
            .addField("Username", `${user.username}`, false)
            .addField("Discriminator", "#" + user.discriminator, false)
            .addField("Date when account is created", user.createdAt, false)
            .setTimestamp();

        // Is the user a bot?
        if (user.bot) Embed.addField('Is a bot?', '✅', false);

        // Show on which platform they are using discord from if its not a bot
        if (user.presence.clientStatus && !user.bot) {
            if (user.presence.clientStatus.mobile) Embed.addField('Using discord on', '📱 ' + user.presence.clientStatus.mobile, true);
            if (user.presence.clientStatus.desktop) Embed.addField('Using discord on', '💻 ' + user.presence.clientStatus.desktop, true);
            if (user.presence.clientStatus.web) Embed.addField('Using discord on', '☁️ ' + user.presence.clientStatus.web, true);
        }

        if (member) {
            // Display the custom Hex color code for this user
            if (member.displayHexColor) Embed.addField('Current Hex color', member ? member.displayHexColor : 'No rank color', true);
            // Show since when this user join the server
            if (member.joinedAt) Embed.addField('Joined guild at', member.joinedAt, true);
            // Show since when this user have been boosting the current guild
            if (member.premiumSince) Embed.addField('Boosting this guild since', member.premiumSince, true);
            // Show guild nickname
            if (member.nickname) Embed.addField('Nickname', member.nickname, true);
            // Show member roles
            if (member.roles) Embed.addField('Roles', `${member.roles.cache.array().join(', ')}`);
        }

        message.channel.send(Embed)

    }
}

module.exports = UserInfoCommand;