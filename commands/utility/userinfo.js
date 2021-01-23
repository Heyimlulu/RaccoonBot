const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Show info about a user!',
    execute(message, args) {

        let user = message.author;

        if(message.mentions.users.first()){
            user = message.mentions.users.first();
        }

        let member = message.guild.member(user);
        
        const Embed = new Discord.MessageEmbed()
            .setAuthor('RacoonBot')
            .setTitle('User information')
            .setColor(member ? member.displayHexColor : "RANDOM")
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
    },
};