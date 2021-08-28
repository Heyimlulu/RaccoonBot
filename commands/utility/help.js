const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('../../config.json');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'utility',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    prompt: {
                        start: 'Which command do you need help with?',
                        retry: 'Please provide a valid command.',
                        optional: true
                    },
                    match: 'rest'
                }
            ],
            description: {
                content: 'Displays the list of commands for the bot',
                usage: '[]',
                example: ['']
            }
        });
    }

    exec(message, { command, args }) {

        if (!command) return this.execCommandList(message);

        console.log(command);

        const description = Object.assign({
            content: 'No description available.',
            usage: '',
            examples: [],
            fields: []
        }, command.description);

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`\`${command.aliases[0]} ${description.usage}\``)
            .addField('Description', description.content)
            .setFooter(`prefix: ${config.prefix}`);

        for (const field of description.fields) embed.addField(field.name, field.value);

        // Show examples if any
        if (description.examples.length) {
            const text = `${command.aliases[0]}`;
            embed.addField('Examples', `\`${text} ${description.examples.join(`\`\n\`${text} `)}\``, true);
        }

        // Show aliases if any
        if (command.aliases.length > 1) {
            embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);
        }

        // Show required user permissions if any
        if (command.userPermissions) {
            embed.addField('User permission', `\`${command.userPermissions.join('` `')}\``, true);
        }

        // Show required bot permissions if any
        if (command.clientPermissions) {
            embed.addField('Bot permission', `\`${command.clientPermissions.join('` `')}\``, true);
        }

        // Show available flag word for specific commands if any
        if (command.contentParser.flagWords.length) {
            embed.addField('Command flags', `\`${command.contentParser.flagWords.join('` `')}\``, true);
        }

        return message.channel.send(embed);
    }

        async execCommandList(message) {

            for (const category of this.handler.categories.values()) {

                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .addField('Commands List',
                        [
                            "There's a list of commands",
                            `To view details for a command, do \`${config.prefix} help <\command>\ \``
                        ]);

                for (const category of this.handler.categories.values()) {

                    let title;

                    if (message.author.id == this.client.ownerID) {
                        title = {
                            general: '📝\u2000General',
                            fun: '🎉\u2000Fun',
                            owner: '⭐\u2000Owner',
                            utility: '🔩\u2000Utility',
                            minigame: '🎲\u2000Minigame [WIP]',
                            admin: '⚡\u2000Admin',
                        }[category.id];
                    } else {
                        title = {
                            general: '📝\u2000General',
                            fun: '🎉\u2000Fun',
                            utility: '🔩\u2000Utility',
                            minigame: '🎲\u2000Minigame [WIP]',
                            admin: '⚡\u2000Admin',
                        }[category.id];
                    }

                    if (title) embed.addField(title, `\`${category.map(cmd => cmd.aliases[0]).join('` `')}\``);

                }

                try {

                    await message.author.send(embed);
                    message.reply("I've sent you a DM with the command list");

                } catch (err) {

                    message.channel.send(embed);

                }

            return undefined; // avoid spam
        }

    }
}

module.exports = HelpCommand;