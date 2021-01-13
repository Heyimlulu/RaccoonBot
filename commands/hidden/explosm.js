const extract = require('meta-extractor');

module.exports = {
    name: 'explosm',
    description: `Get a generated comic from Cyanide & Happiness`,
    category: 'fun',
    execute(message) {
        extract({ uri: 'http://explosm.net/rcg' }, (err, res) => {
            message.channel.send({files: [res.ogImage]});
        });
    },
};