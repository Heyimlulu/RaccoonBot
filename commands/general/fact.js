const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class FactCommand extends Command {
    constructor() {
        super('fact', {
            aliases: ['fact'],
            category: 'general',
            clientPermissions: ["SEND_MESSAGES"],
            description: {
                content: 'Get a random raccoon facts!',
                usage: '',
                examples: ['']
            }
        });
    }

    async exec(message) {

        let raccoonFacts = [
            "Do you know raccoons have some of the most dexterous hands in nature?",
            "Raccoons are among the rare species that have actually benefited from the spread of humans.",
            "There are six raccoon species native to North and South America.",
            "Do you know racoons can be found across the globe?",
            "They are omnivores (eat plants and animals) and like to eat insects, eggs, small mammals, fruit, berries, seed, garbage...",
            "They have grayish fur, black mask around eyes and long tail covered with black and brown bands. Because of their tail, they are nicknamed ringtail.",
            "Raccoons are solitary (live on their own) and nocturnal creatures (they hunt at night).",
            "Raccoons usually reach 2,5 feet in length and weigh between 12-16 pounds. Raccoons that live in colder climates are larger and heavier.",
            "Raccoons can transmit rabies to domestic animals and people. Their feces often contain roundworms.",
            "Mating season takes place from January to mid March. Two months later, female will give birth to 3-4 babies. Their tails don't have bands, and mask around eyes is still missing."
        ]

        const i = Math.floor((Math.random() * raccoonFacts.length));

        const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(raccoonFacts[i]);

        await message.channel.send(embed);

    }
}

module.exports = FactCommand;