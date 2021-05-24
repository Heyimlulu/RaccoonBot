const { Command } = require('discord-akairo');
const { Client } = require('pg');
const Discord = require('discord.js');

class QuotaCommand extends Command {
    constructor() {
        super('quota', {
            aliases: ['quota'],
            category: 'owner',
            ownerOnly: true,
            description: {
                content: '',
                usage: '',
                example: ['']
            }
        });
    }

    async exec(message) {

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setImage('https://jomarieblog.files.wordpress.com/2013/09/sweaty-cat.jpg')
            .setFooter('Heroku PostGreSQL, Hobby Dev');

        async function logsDatabase() {
            // Database connection
            const pgClient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });

            pgClient.connect();

            let query = `SELECT * FROM logs`;

            pgClient.query(
                query,
                (err, res) => {
                    console.log(err, res);
                    embed.setTitle(`${res.rowCount}/10000 rows used`);
                    message.channel.send(embed);
                    pgClient.end();
                }
            );
        }

        try {
            logsDatabase();
        } catch {
            return;
        }


    }
}

module.exports = QuotaCommand;