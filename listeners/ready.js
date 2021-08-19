const { Listener } = require('discord-akairo');
const play = require('../json/status/playing.json');
const watch = require('../json/status/streaming.json');
const listen = require('../json/status/listening.json');

class readyListener extends Listener {

    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        let clientTag = this.client.user.tag; // Bot name
        let guildSize = this.client.guilds.cache.size; // Bot ID
        let userSize = this.client.users.cache.size; // Total users
        let channelSize = this.client.channels.cache.size; // Total channels
        let commandSize = this.client.commandHandler.modules.size - 9; // Total commands
        let clientID = this.client.user.id; // Total servers

        //  Send stats to the console
        console.log('===========[ READY ]===========');
        console.log(`\x1b[32mLogged in as \x1b[34m${clientTag}\x1b[0m! (\x1b[33m${clientID}\x1b[0m)`);
        console.log(`Ready to serve in \x1b[33m${channelSize}\x1b[0m channels on \x1b[33m${guildSize}\x1b[0m servers, for a total of \x1b[33m${userSize}\x1b[0m users. (\x1b[33m${commandSize}\x1b[0m commands loaded)`);
        console.log(`${this.client.readyAt}`);
        console.log('===========[ READY ]===========');

        // Bot status
        setStatus(this.client);

        // Change status every 30 minutes
        setInterval(async () => {
            setStatus(this.client);
        }, 1800000);

        async function setStatus(client) {

            // Generate a random number between 0 and 2
            let random = Math.floor((Math.random() * 4));

            if (random == 0) {

                let status = play[Math.floor(Math.random() * (play.length))];

                await client.user.setActivity(status, { type: "PLAYING" });

            } else if (random == 1) {

                let status = watch[Math.floor(Math.random() * (watch.length))];

                await client.user.setActivity(status, { type: "STREAMING" });

            } else if (random == 2) {

                let status = listen[Math.floor(Math.random() * (listen.length))];

                await client.user.setActivity(status, { type: "LISTENING" });

            }

        }
    }
}

module.exports = readyListener;