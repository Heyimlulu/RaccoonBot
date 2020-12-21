const Discord = require('discord.js');

module.exports = {
    name: 'upvote',
    description: 'Send a link to vote for my bot!',
    execute(message) {

        const attachment = new Discord.MessageAttachment('./images/racoon-for-me.jpg', 'racoon-for-me.jpg');
        const UpvoteEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Vote for my bot')
            .setAuthor('RacoonBot')
            .setDescription('You can vote for my bot if you like it!')
            .addField('top.gg', 'https://top.gg/bot/734426328002068481/vote')
            .addField('Discordbotlist.com', 'https://discordbotlist.com/bots/racoonbot/upvote')
            .attachFiles(attachment)
            .setImage('attachment://racoon-for-me.jpg')
            .setTimestamp()
            .setFooter('💛 Thanks for the upvote', message.author.displayAvatarURL());

        message.channel.send(UpvoteEmbed);
    },
};