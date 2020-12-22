const Discord = require('discord.js');
const config = require("./json/config.json");
const fs = require('fs');
const client = new Discord.Client();

// import admin commands
//const welcome = require('./commands/admin/welcome');
//const leave = require('./commands/admin/leave');
const kick = require('./commands/admin/kick');
const ban = require('./commands/admin/ban');
const unban = require('./commands/admin/unban');

const stats = require('./commands/utility/stats');
const voice = require('./commands/voice/music');
const status = require('./commands/owner/status');
const feedback = require('./commands/utility/feedback');
const dm = require('./commands/owner/dm');
// const total = require('./commands/owner/total');

// const counter = require('./counter');

// JSON file for activities status
const playingJSON = require('./json/status/playing.json');
const streamingJSON = require('./json/status/streaming.json');
const listeningJSON = require('./json/status/listening.json');

// ===================================== Discord Collection ===================================== //

client.commands = new Discord.Collection();

// set new items in the Collection
// with the key as the command name and the value as the exported module

// fun
const commandFilesFun = fs.readdirSync('./commands/fun').filter(file => file.endsWith('.js'));
for (const file of commandFilesFun) {
    const command = require(`./commands/fun/${file}`);
    client.commands.set(command.name, command);
}

// utility
const commandFilesUtility = fs.readdirSync('./commands/utility').filter(file => file.endsWith('.js'));
for (const file of commandFilesUtility) {
    const command = require(`./commands/utility/${file}`);
    client.commands.set(command.name, command);
}

// general
const commandFilesGeneral = fs.readdirSync('./commands/general').filter(file => file.endsWith('.js'));
for (const file of commandFilesGeneral) {
    const command = require(`./commands/general/${file}`);
    client.commands.set(command.name, command);
}

// admin
const commandFilesAdmin = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));
for (const file of commandFilesAdmin) {
    const command = require(`./commands/admin/${file}`);
    client.commands.set(command.name, command);
}

// voice
const commandFilesVoice = fs.readdirSync('./commands/voice').filter(file => file.endsWith('.js'));
for (const file of commandFilesVoice) {
    const command = require(`./commands/voice/${file}`);
    client.commands.set(command.name, command);
}

// owner
const commandFilesOwner = fs.readdirSync('./commands/owner').filter(file => file.endsWith('.js'));
for (const file of commandFilesOwner) {
    const command = require(`./commands/owner/${file}`);
    client.commands.set(command.name, command);
}

// ==================================== On bot start ==================================== //

client.on('ready', () => {

    // Send stats to the console
    console.log('===========[ READY ]===========');
    console.log(`\x1b[32mLogged in as \x1b[34m${client.user.tag}\x1b[0m! (\x1b[33m${client.user.id}\x1b[0m)`)
    console.log(`Ready to serve in \x1b[33m${client.channels.cache.size}\x1b[0m channels on \x1b[33m${client.guilds.cache.size}\x1b[0m servers, for a total of \x1b[33m${client.users.cache.size}\x1b[0m users.`);
    console.log('===========[ READY ]===========');

    setInterval(() => {
        let activityTypes = ['PLAYING', 'STREAMING', 'LISTENING']
        let randomType = activityTypes[Math.floor((Math.random() * activityTypes.length))]

        if (randomType == 'PLAYING') {

            // set var for playingJSON file
            var playing = playingJSON;

            let activity = playing[Math.floor(Math.random() * (playing.length - 1) + 1)];
            client.user.setActivity(activity, { type: "PLAYING" });
        } else if (randomType == 'STREAMING') {

            // set var for streamingJSON file
            var streaming = streamingJSON;

            let activity = streaming[Math.floor(Math.random() * (streaming.length - 1) + 1)];
            client.user.setActivity(activity, { type: "STREAMING", url: "https://www.twitch.tv/RacoonBot_", name: "RacoonBot_ on Twitch" });
        } else if (randomType == 'LISTENING') {

            // set var for streamingJSON file
            var listening = listeningJSON;

            let activity = listening[Math.floor(Math.random() * (listening.length - 1) + 1)];
            client.user.setActivity(activity, { type: "LISTENING" });
        }
    }, 1800000) // <-- run this every 30 minutes
});

// ================================= On message received ================================= //

//welcome(client);
//leave(client);
kick(client);
ban(client);
unban(client);
stats(client);
voice(client);
status(client);
feedback(client);
dm(client);
// total(client);

// counter(client);

client.on('message', message => {

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
    console.log(message.content);

});

// ======================================= Bot logon ======================================= //

client.login(config.token);
