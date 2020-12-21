const Discord = require('discord.js');

module.exports = {
    name: 'menu',
    description: 'Give you a random menu!',
    category: 'owner',
    execute(message) {

        if (message.author.id !== '265896171384340480') {
            message.reply(`You did not have permissions to run that command!`);
            return;
        }

        var plats = [
            'Salade (au choix)',
            'Sandwich dinde',
            'Sandwich roastbeef',
            'Sandwich salami',
            'Sandwich jambon-fromage',
            'Taboulet',
            'Croissant',
            'Pain au chocolat',
            'Pizza'];
        var plat = plats[Math.floor(Math.random()*plats.length)];

        var boissons = [
            'Coca-Cola',
            'Coca-Cola Zero',
            'Redbull',
            'Monster energy drink',
            'Ovomaltine',
            'Evian'];
        var boisson = boissons[Math.floor(Math.random()*boissons.length)];

        var desserts = [
            'Biscuits Ovomaltine',
            'Chips'];
        var dessert = desserts[Math.floor(Math.random()*desserts.length)];

        const Embed = new Discord.MessageEmbed();
        Embed.setColor("RANDOM")
            .setTitle(`Menu ${message.author.tag}`)
            .setDescription('Coop Special')
            .addField('Main', plat, true)
            .addField('Drink', boisson, true)
            .addField('Dessert', dessert, true)

        message.channel.send(Embed);
    },
};