const racoonFacts = require('../../json/commands/general/fact.json');

module.exports = {
    name: 'fact',
    description: 'Show some random racoon facts',
    execute(message) {
        var fact = racoonFacts[Math.floor(Math.random()*racoonFacts.length)];

        message.channel.send(fact)
    },
};

// https://fungenerators.com/random/facts/animal/raccoon