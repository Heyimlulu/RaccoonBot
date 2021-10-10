const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Leaderboard = require('../../models').leaderboard;

class GuessCommand extends Command {
    constructor() {
        super('guess', {
            aliases: ['guess'],
            category: 'minigame',
            clientPermissions: ['SEND_MESSAGES'],
            args: [
                {
                    id: 'easy',
                    match: 'flag',
                    flag: '--easy'
                },
                {
                    id: 'normal',
                    match: 'flag',
                    flag: '--normal'
                },
                {
                    id: 'hard',
                    match: 'flag',
                    flag: '--hard'
                },
                {
                    id: 'leaderboard',
                    match: 'flag',
                    flag: '--leaderboard'
                }
            ],
            description: {
                content: 'Guess the number',
                usage: '[]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        if (args.leaderboard) {
            const leaderboard = await Leaderboard.findAll({order: ['try']});

            let top = [];
            let embed = new MessageEmbed()
                .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
                .setTitle('Leaderboard');

            for (let i = 0; i < leaderboard.length; i++) {
                this.client.users.fetch(leaderboard[i].get('userID'))
                    .then(user => {
                        let body = `**${user.username}**\nTry: ${leaderboard[i].get('try')}`;
                        top.push(body);

                        if (leaderboard[i].get('difficulty') == 'Easy') {
                            embed.addField('Easy', body, true);
                        } else if (leaderboard[i].get('difficulty') == 'Normal') {
                            embed.addField('Normal', body, true);
                        } else if (leaderboard[i].get('difficulty') == 'Hard') {
                            embed.addField('Hard', body, true);
                        }

                        if (i + 1 == leaderboard.length) {
                            return message.channel.send(embed);
                        }
                    });
            }
            return;
        }

        let difficulty = '';
        let max = 0;
        let numberTry = 0;

        if (args.easy) { max = 100; difficulty = 'Easy'; }
        else if (args.normal) { max = 1000; difficulty = 'Normal'; }
        else if (args.hard) { max = 10000; difficulty = 'Hard'; }
        else { return message.reply('It looks like you set an invalid difficulty. Please try again!'); }

        let secretNumber = Math.floor((Math.random() * max));
        console.log(secretNumber);

        const filter = m =>  m.content && m.author.id == message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
            .then(input => {
                checkNumber(input.map(input => input.content)[0]);
            })
            .catch(() => {
                return message.reply('Times out!')
            });

        async function checkNumber(input) {
            numberTry++;
            if (input != secretNumber) {
            await tryAgain(input);
            } else {
                const leaderboard = await Leaderboard.findOne({where: {userID: message.author.id, difficulty: difficulty}});

                if (!leaderboard) {
                    const body = {userID: message.author.id, try: numberTry, difficulty: difficulty};
                    await Leaderboard.create(body);
                } else {
                    const body = {userID: message.author.id, try: numberTry, difficulty: difficulty};
                    await Leaderboard.update(body, {where: {memberID: message.author.id, difficulty: difficulty}});
                }

                if (numberTry > 1) {
                    return message.reply(`Congratulations! You won! It took you ${numberTry} tries!`);
                } else {
                    return message.reply('Congratulations! You won! You get it One shot!');
                }
            }
        }

        async function tryAgain (input) {
            if (input != secretNumber) {
                if (input > secretNumber) {
                    await message.reply('Its less!');
                } else if (input < secretNumber) {
                    await message.reply('Its more!');
                }
            }
            message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
                .then(input => {
                    checkNumber(input.map(input => input.content)[0]);
                })
                .catch(() => {
                    return message.reply('Times out!')
                });
        }

    }
}

module.exports = GuessCommand;