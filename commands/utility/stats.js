const Discord = require('discord.js');
const os = require('os');
const config = require("../../json/config.json");

module.exports = (client) => {
    client.on('message', message => {

        var uptime = process.uptime();
        const date = new Date(uptime*1000);
        const days = date.getUTCDate() - 1,
            hours = date.getUTCHours(),
            minutes = date.getUTCMinutes(),
            seconds = date.getUTCSeconds();


        let segments = [];

        // Format the uptime string.
        if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
        if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
        if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
        if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
        const dateString = segments.join(', ');

        const bytesToSize = (bytes) => {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };

        if (message.content === `${config.prefix}stats`) {
            try {
                const statsEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Bot stats')
                    .setAuthor('RacoonBot')
                    .addField('Servers', client.guilds.cache.size, true)
                    .addField('Channels', client.channels.cache.size, true)
                    .addField('Users', client.users.cache.size, true)
                    .addField('Uptime', dateString, true)
                    //.addField('Ram usage', `${bytesToSize(process.memoryUsage().heapUsed)}/${bytesToSize(os.totalmem)}`, false)
                    //.addField('CPU', `${os.cpus()[0].model} (${os.cpus().length} core)`, false)
                    // .addField('CPU architecture', `${os.arch()}`)
                    //.addField('OS', `${os.platform()} ${os.release()}`, false)
                    // .addField('OS', `${os.version()}`, true)
                    //.addField('Nodejs version', process.version, false)
                    //.addField('Discord.js version', '12.2.0', false)
                    .setTimestamp();

                message.channel.send(statsEmbed);
            } catch (error) {
                console.log(error);
            }
        }
    })
}