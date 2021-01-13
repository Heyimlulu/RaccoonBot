const extract = require('meta-extractor');

module.exports = {
    name: 'bing',
    description: `Get the wallpaper of the day from Bing`,
    category: 'fun',
    execute(message) {
        extract({ uri: 'https://bing.gifposter.com/' }, (err, res) => {
            return message.channel.send({files: [res.twitterImage]});
        });
    },
};