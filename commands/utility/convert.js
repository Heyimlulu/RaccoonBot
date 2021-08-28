const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const currencyConverter = require('currency-converter-lt')

class ConvertCommand extends Command {
    constructor() {
        super('convert', {
            aliases: ['convert'],
            category: 'utility',
            args: [
                {
                    id: 'from',
                    type: 'string'
                },
                {
                    id: 'to',
                    type: 'string'
                },
                {
                    id: 'amount',
                    type: 'integer'
                }
            ],
            description: {
                content: 'Convert currency value. (Currency must be an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) code.)',
                usage: '[from] [to] [value]',
                example: ['CHF EUR 30']
            }
        });
    }

    async exec(message, args) {

        let embed = new MessageEmbed().setColor(message.member ? message.member.displayHexColor : 'RANDOM');

        let from = args.from;
        let to = args.to;
        let amount = args.amount;

        try {

            let cc = new currencyConverter(
                {
                    from: from,
                    to: to,
                    amount: amount
                });

            message.channel.send('Converting...').then(msg => {

                cc.convert().then((response) => {
                    msg.delete();

                    embed.setTitle('💱 Currency Converter')
                        .addField(from, amount, true)
                        .addField(to, response.toFixed(2), true)

                    return message.channel.send(embed);
                });

            });

        } catch {
            return message.channel.send('There was an error trying to convert currency. Did you use a correct ISO 4217 code format?');
        }

    }
}

module.exports = ConvertCommand;