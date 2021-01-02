/*
module.exports = (client) => {
    const channelId = '413795421354459146'; // welcome channel

    client.on('guildMemberRemove', (member) => {
        //console.log(member);

        const message = `<@${member.id}> left the server!`;
        const channel = member.guild.channels.cache.get(channelId);

        channel.send(message);
    })
}

 */