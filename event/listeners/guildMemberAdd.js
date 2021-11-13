const { Listener } = require('discord-akairo');
const joinChannel = require('../../models').joinChannel;

class guildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {

        /*
        const welcome = await joinChannel.findOne({
            where: { guildID: member.guild.id }
        });

        console.log(member.guild.id);

         */

        // if (welcome) {}
        if (member.guild.id == '842856705029046282') {
            //const channel = this.client.channels.resolve(welcome.get('channelID'));
            const channel = this.client.channels.resolve('881623587335860275');

            //let welcomeMessage = welcome.get('message');
            let welcomeMessage = 'Hey! [memberPing] just joined the server 🦝 **([server])**';

            let invite = new RegExp(/(https?:\/\/)?(www\.)?discord(?:app\.com|\.gg)[/invite/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9-]{2,32})/g);

            let username = member.user.username;
            let user = member.user;
            if (username.match(invite)) {
                username = username.replace(/(https?:\/\/)?(www\.)?discord(?:app\.com|\.gg)[/invite/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9-]{2,32})/g, '[REDACTED]');
                user = username;
            }

            welcomeMessage = welcomeMessage.replace(/\[member\]/g, username);
            welcomeMessage = welcomeMessage.replace(/\[memberPing\]/g, user);
            welcomeMessage = welcomeMessage.replace(/\[server\]/g, member.guild.name);

            return channel.send(welcomeMessage);

            //return channel.send(`${member.user} just joined the server 🦝`);
        }

    }
}

module.exports = guildMemberAddListener;
