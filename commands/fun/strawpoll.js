const fetch = require('node-fetch');
const config = require("../../json/config.json");

module.exports = {
    name: 'strawpoll',
    description: `Simply create strawpoll`,
    category: 'fun',
    execute(message, args) {

        let title = args.slice(config.prefix).join(' ').trim().split('-');
        console.log(title);

        let options = args.slice(args[0].length).join(' ').trim().split('|');
        console.log(options);

        let request = {
            'title': title,
            'options': options,
            'multi': '--multi'
        };

        console.log(JSON.stringify(request));

        /*
        try {
            fetch('https://www.strawpoll.me/api/v2/polls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            }).then((response) => {
                return response.json();
            }).then((response) => {
                return message.channel.send(`Your strawpoll is ready! https://www.strawpoll.me/${response.id}`);
            });
        } catch {
            return message.channel.send(`There was an error creating the poll, ${message.author}`);
        }
        
         */



        /*
        let title = message.content.split(`${config.prefix}strawpoll ${args}`).join("").trim();

        if (!title) {
            return message.channel.send(`What should be the title of the poll, ${message.author}?`);
        }

        if (!args.length) {
            return message.channel.send(`What option for the poll should be, ${message.author}.`);
        }

        message.channel.send(args);

         */
    },
};