const config = require('../../json/config.json');
module.exports = {
    name: 'codeblock',
    description: 'Denote a specific programming language for syntax highlighting',
    category: 'general',
    execute(message) {

        // Check if user use a valid format
        //if (message.content.startsWith(`${config.prefix}codeblock`)) return message.delete().then(message.channel.send('Which language do you want to use?'));

        message.delete(); // Delete message before sending code blocks

        if (message.content.startsWith(`${config.prefix}codeblock html`)){
            // Store user input in a variable
            let html = message.content.split(`${config.prefix}codeblock html`).join("").trim();
            // HTML code blocks format
            message.channel.send(` **${message.author.tag}**\n` +
                '```html\n' + `${html}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock css`)){
            // Store user input in a variable
            let css = message.content.split(`${config.prefix}codeblock css`).join("").trim();
            // CSS code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```css\n' + `${css}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock javascript`)){
            // Store user input in a variable
            let javascript = message.content.split(`${config.prefix}codeblock javascript`).join("").trim();
            // Javascript code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```javascript\n' + `${javascript}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock php`)){
            // Store user input in a variable
            let php = message.content.split(`${config.prefix}codeblock php`).join("").trim();
            // Php code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```php\n' + `${php}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock csharp`)){
            // Store user input in a variable
            let csharp = message.content.split(`${config.prefix}codeblock csharp`).join("").trim();
            // C# code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```csharp\n' + `${csharp}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock cpp`)){
            // Store user input in a variable
            let cpp = message.content.split(`${config.prefix}codeblock cpp`).join("").trim();
            // C++ code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```cpp\n' + `${cpp}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock bash`)){
            // Store user input in a variable
            let bash = message.content.split(`${config.prefix}codeblock bash`).join("").trim();
            // Bash code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```bash\n' + `${bash}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock xml`)){
            // Store user input in a variable
            let xml = message.content.split(`${config.prefix}codeblock xml`).join("").trim();
            // Xml code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```xml\n' + `${xml}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock markdown`)){
            // Store user input in a variable
            let markdown = message.content.split(`${config.prefix}codeblock markdown`).join("").trim();
            // Markdown code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```markdown\n' + `${markdown}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock ruby`)){
            // Store user input in a variable
            let ruby = message.content.split(`${config.prefix}codeblock ruby`).join("").trim();
            // Ruby code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```ruby\n' + `${ruby}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock go`)){
            // Store user input in a variable
            let go = message.content.split(`${config.prefix}codeblock go`).join("").trim();
            // Go code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```go\n' + `${go}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock json`)){
            // Store user input in a variable
            let json = message.content.split(`${config.prefix}codeblock json`).join("").trim();
            // Json code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```json\n' + `${json}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock lua`)){
            // Store user input in a variable
            let lua = message.content.split(`${config.prefix}codeblock lua`).join("").trim();
            // Lua code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```lua\n' + `${lua}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock perl`)){
            // Store user input in a variable
            let perl = message.content.split(`${config.prefix}codeblock perl`).join("").trim();
            // Perl code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```perl\n' + `${perl}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock python`)){
            // Store user input in a variable
            let python = message.content.split(`${config.prefix}codeblock python`).join("").trim();
            // Python code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```python\n' + `${python}` + '```');
        }
        if (message.content.startsWith(`${config.prefix}codeblock scss`)){
            // Store user input in a variable
            let scss = message.content.split(`${config.prefix}codeblock scss`).join("").trim();
            // SCSS code blocks format
            message.channel.send(`**${message.author.tag}**\n` +
                '```scss\n' + `${scss}` + '```');
        }
    }
}