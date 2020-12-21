module.exports = {
    name: 'shutdown',
    description: `Reboot the bot`,
    category: 'owner',
    execute(message) {

        if (message.author.id !== '265896171384340480') {
            message.reply(`Sorry, you can't do that!`)
            return
        }

        setTimeout(() => {
            process.exit();
        }, 5000)

        console.log('\x1b[31m\x1b[47m\x1b[5mSHUTING DOWN!!!!!\x1b[0m');
        message.channel.send("Ok I'm leaving bye", { files: ['https://cdn.discordapp.com/attachments/582678478994800668/755157949458153532/20200914_202738.jpg']});
        console.log('\x1b[31m\x1b[47m\x1b[5mSHUTING DOWN!!!!!\x1b[0m');
    },
};