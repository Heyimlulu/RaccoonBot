const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config.json');

class RaccoonBotClient extends AkairoClient {

    constructor() {
        super({
            ownerID: config.owner,
            presence: {
                status: 'online',
                activity: {
                    type: 'PLAYING',
                    name: 'Getting everything ready...',
                }
            }
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: config.prefix,
            argumentDefaults: {
                prompt: {
                    timeout: 'Time ran out, command has been cancelled.',
                    ended: 'Too many retries, command has been cancelled.',
                    retry: 'Could not find your argument, please try again!',
                    cancel: 'Command has been cancelled.',
                    retries: 4,
                    time: 30000
                }
            }
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
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

const client = new RaccoonBotClient({ intent: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGE']});

client.login(process.env.BOT_TOKEN);