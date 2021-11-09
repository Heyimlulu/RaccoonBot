const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const {statsChannel} = require("../../config.json");
const userBlacklist = require('../../models').userBlacklist;

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

        /*
        const blacklist = await userBlacklist.findOne({where: {userID: message.author.id}});

        if (blacklist) return;

         */

        if (message.author.bot) return;

        const channel = this.client.channels.resolve('906644176182054933');

        let embed = new MessageEmbed()
            .setThumbnail('https://emoji.gg/assets/emoji/5239_ping.png')
            .setTitle('Who pinged me?')
            .setDescription(`Server : ${message.guild.name}\nChannel : ${message.channel.name}\n\n${message.author.username}#${message.author.discriminator} : ${message.content}`)
            .setTimestamp();

        if (message.mentions.has(this.client.user.id)) {
            channel.send(embed);

            console.log(`
░██╗░░░░░░░██╗██╗░░██╗░█████╗░  ██████╗░██╗███╗░░██╗░██████╗░███████╗██████╗░  ███╗░░░███╗███████╗  ░█████╗░
░██║░░██╗░░██║██║░░██║██╔══██╗  ██╔══██╗██║████╗░██║██╔════╝░██╔════╝██╔══██╗  ████╗░████║██╔════╝  ██╔══██╗
░╚██╗████╗██╔╝███████║██║░░██║  ██████╔╝██║██╔██╗██║██║░░██╗░█████╗░░██║░░██║  ██╔████╔██║█████╗░░  ╚═╝███╔╝
░░████╔═████║░██╔══██║██║░░██║  ██╔═══╝░██║██║╚████║██║░░╚██╗██╔══╝░░██║░░██║  ██║╚██╔╝██║██╔══╝░░  ░░░╚══╝░
░░╚██╔╝░╚██╔╝░██║░░██║╚█████╔╝  ██║░░░░░██║██║░╚███║╚██████╔╝███████╗██████╔╝  ██║░╚═╝░██║███████╗  ░░░██╗░░
░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝░╚════╝░  ╚═╝░░░░░╚═╝╚═╝░░╚══╝░╚═════╝░╚══════╝╚═════╝░  ╚═╝░░░░░╚═╝╚══════╝  ░░░╚═╝░░
\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   User : ${message.author.username}
   ID : ${message.author.id}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
            `)
        }

    }
}

module.exports = MessageListener;
