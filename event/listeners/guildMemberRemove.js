const { Listener } = require('discord-akairo');
const leaveChannel = require('../../models').leaveChannel;

class guildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {

        /*
        const bye = await leaveChannel.findOne({
            where: { guildID: member.guild.id }
        });

         */

        // if (bye) {}
        if (member.guild.id == '842856705029046282') {
            //const channel = this.client.channels.resolve(bye.get('channelID'));
            const channel = this.client.channels.resolve('881623587335860275');

            //let leaveMessage = bye.get('message');
            let leaveMessage = '[memberPing] just left the server 🦝';

            let invite = new RegExp(/(https?:\/\/)?(www\.)?discord(?:app\.com|\.gg)[/invite/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9-]{2,32})/g);

            let username = member.user.username;
            let user = member.user;
            if (username.match(invite)) {
                username = username.replace(/(https?:\/\/)?(www\.)?discord(?:app\.com|\.gg)[/invite/]?(?:(?!.*[Ii10OolL]).[a-zA-Z0-9]{5,6}|[a-zA-Z0-9-]{2,32})/g, '[REDACTED]');
                user = username;
            }

            leaveMessage = leaveMessage.replace(/\[member\]/, username);
            leaveMessage = leaveMessage.replace(/\[memberPing\]/, user);
            leaveMessage = leaveMessage.replace(/\[server\]/, member.guild.name);

            return channel.send(leaveMessage);


            //return channel.send(`${member.user} just leave the server 🦝`);
        }
    }
}

module.exports = guildMemberAddListener;
