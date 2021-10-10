const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const dotenv = require('dotenv');
dotenv.config();

// config.json
const fs = require('fs');
if (!fs.existsSync('./config.json')) throw new Error('\x1b[31mI could not find config.json, are you sure you have it?\x1b[0m');
const { owner, prefix } = require('./config.json');

// Intents
const { Intents } = require('discord.js');
let intents = new Intents(Intents.ALL);
intents.remove('GUILD_PRESENCES');

// Tic Tac Toe
const updateGrid = require('./event/misc/updateGrid');

class RaccoonBotClient extends AkairoClient {

    constructor() {
        super({
            ownerID: owner,
            presence: {
                status: 'online',
                activity: {
                    type: 'PLAYING',
                    name: 'Getting everything ready...',
                }
            }
        }, {
            partials: ['MESSAGE'],
            disableMentions: 'everyone',
            intents: intents
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: prefix,
            argumentDefaults: {
                prompt: {
                    timeout: 'Time ran out, command has been cancelled.',
                    ended: 'Too many retries, command has been cancelled.',
                    retry: 'Could not find your argument, please try again!',
                    cancel: 'Command has been cancelled.',
                    retries: 4,
                    time: 30000
                }
            },
            commandUtil: true,
			commandUtilLifetime: 60000,
			allowMention: true,
			handleEdits: true,
			ignorePermissions: owner,
			ignoreCooldown: owner,
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './event/inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './event/listeners/'
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
            process: process
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
    }

}

const client = new RaccoonBotClient();
require("discord-buttons")(client);

client.login(process.env.BOT_TOKEN);

client.on('clickButton', async button => {
    // Tic Tac Toe
    await updateGrid(button);
});
