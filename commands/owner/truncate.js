const { Command } = require('discord-akairo');
const { Client } = require('pg');

class TruncateCommand extends Command {
    constructor() {
        super('truncate', {
            aliases: ['truncate'],
            category: 'owner',
            description: {
                content: 'Empty the logs table',
                usage: '',
                examples: ['']
            },
            ownerOnly: true,
        });
    }

    async exec(message) {

        async function logsDatabase() {
            // Database connection
            const pgClient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });

            pgClient.connect();

            let query = `TRUNCATE logs`;

            pgClient.query(
                query,
                (err, res) => {
                    console.log(err, res);
                    pgClient.end();
                }
            );
        }

        try {
            logsDatabase();
            message.channel.send('Logs table has been successfully empty!');
        } catch {
              message.channel.send('There was an error deleting all rows!');
        }

    }
}

module.exports = TruncateCommand;