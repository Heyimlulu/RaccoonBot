const Discord = require('discord.js');
const fs = require('fs');
const todo = require('../../json/commands/general/todo.json');

module.exports = {
    name: 'todo',
    description: 'Write a todo list for the developer',
    category: 'general',
    execute(message) {

        if (!message.author.bot || message.content === 'jake todo write') {

            // example
            const todo = {
                name: `Yuki#0001`,
                message: `sleep`,
            }

            const jsonString = JSON.stringify(todo, null, 2) // Make the output more human-readable

            fs.writeFile('./json/todo.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)

                    message.channel.send('Error writing file');
                } else {
                    console.log('Successfully wrote file')

                    message.channel.send('Successfully wrote file');
                }
            })
        }

        if (message.content === 'jake todo read'){
            fs.readFile("./counter.js", "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                console.log("File data:", jsonString);

                message.channel.send('```javascript\n' + jsonString + '```');
            });
        }
    }
}