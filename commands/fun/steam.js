const Discord = require('discord.js');

// Read .env file and initialize variable
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
const config = require("../../json/config.json");

module.exports = {
    name: 'steam',
    description: 'Send stats for a steam user',
    category: 'fun',
    execute(message) {

        let steamKey = process.env.STEAM_SECRET_KEY;
        let steamSearch = message.content.split(`${config.prefix}steam`).join("")

        if (steamSearch == '') {
            message.reply("Invalid steamID!");
        } else {
            // Get player summaries
            fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamSearch}`)
                .then((response) => {
                    return response.json(); // <-- return a json response
                }).then((response) => {

                // Decode player country, state and city
                fetch('https://raw.githubusercontent.com/Holek/steam-friends-countries/master/data/steam_countries.json')
                    .then((response) => {
                        return response.json(); // <-- return a json response
                    }).then((responseCheck) => {

                    // Get friend list
                    fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${steamKey}&steamid=${steamSearch}&relationship=friend`)
                        .then((response) => {
                            return response.json(); // <-- return a json file
                        }).then((responseFriend) => {

                        // Get owned games
                        fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${steamSearch}&format=json`)
                            .then((response) => {
                                return response.json(); // <-- return a json file
                            }).then((responseGame) => {

                            // Get player bans
                            fetch(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${steamKey}&steamids=${steamSearch}`)
                                .then((response) => {
                                    return response.json(); // <-- return a json file
                                }).then((responseVAC) => {

                                // Get recently played game
                                fetch(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamKey}&steamid=${steamSearch}&format=json`)
                                    .then((response) => {
                                        return response.json(); // <-- return a json file
                                    }).then((responseRecentGame) => {

                                    // Get the recent game for the user
                                    if (responseRecentGame.response.hasOwnProperty('games')){
                                        var recentGame = responseRecentGame.response.games[0].name;
                                    } else {
                                        var recentGame = 'unknown';
                                    }

                                    // Check if the player has a vac ban in his profile
                                    if (responseVAC.players[0].hasOwnProperty('VACBanned')) {
                                        var vacCheck = responseVAC.players[0].VACBanned;

                                        if (vacCheck === true) {
                                            var vacBanned = 'Yes';
                                        } else {
                                            var vacBanned = 'No';
                                        }
                                    } else {
                                        var varCheck = 'unknown';
                                    }

                                    if (response.response.players[0].hasOwnProperty('realname')) {
                                        var realName = response.response.players[0].realname;
                                    } else {
                                        var realName = 'unknown';
                                    }

                                    // Count how many games the player have
                                    if (responseGame.response.hasOwnProperty('game_count')) {
                                        var gameCount = responseGame.response.game_count;
                                    } else {
                                        var gameCount = 'unknown';
                                    }

                                    // Count how many friends the player have
                                    if (responseFriend.hasOwnProperty('friendslist')) {
                                        // Friends counter
                                        function length(obj) {
                                            return Object.keys(obj).length;
                                        }

                                        // Store the result in a variable
                                        var friendsCount = length(responseFriend.friendslist.friends);
                                    } else {
                                        var friendsCount = 'unknown';
                                    }

                                    // store output from the steam api in a variable
                                    //console.log(response.response.players[0].hasOwnProperty('loccountrycode'));
                                    if (response.response.players[0].hasOwnProperty('loccountrycode')) {
                                        var countryDecode = response.response.players[0].loccountrycode;
                                        var country = responseCheck[countryDecode].name;
                                    } else {
                                        var country = 'Unknown';
                                    }

                                    //console.log(response.response.players[0].hasOwnProperty('locstatecode'));
                                    if (response.response.players[0].hasOwnProperty('locstatecode')) {
                                        var stateDecode = response.response.players[0].locstatecode;
                                        var state = responseCheck[countryDecode].states[stateDecode].name;
                                    } else {
                                        var state = 'Unknown';
                                    }

                                    //console.log(response.response.players[0].hasOwnProperty('loccityid'));
                                    if (response.response.players[0].hasOwnProperty('loccityid')) {
                                        var cityDecode = response.response.players[0].loccityid;
                                        var city = responseCheck[countryDecode].states[stateDecode].cities[cityDecode].name;
                                    } else {
                                        var city = 'Unknown';
                                    }

                                    // Get the exact country, state and city with the variables
                                    /*
                                    console.log(responseCheck[country].name);
                                    console.log(responseCheck[country].states[state].name);
                                    console.log(responseCheck[country].states[state].cities[city].name);
                                     */

                                    // Check if the profile is public or private
                                    if (response.response.players[0].communityvisibilitystate == 1) {
                                        var stateProfile = 'Private';
                                    }
                                    if (response.response.players[0].communityvisibilitystate == 3) {
                                        var stateProfile = 'Public';
                                    }

                                    // Display the last time the user was seen online and set it in a variable that will convert into a readable format for human
                                    let unix_timestamp = response.response.players[0].lastlogoff;

                                    // Create a new JavaScript Date object based on the timestamp
                                    var dateLogoff = new Date(unix_timestamp * 1000); // multiplied by 1000 so that the argument is in milliseconds and not seconds
                                    var hours = dateLogoff.getHours() + 1; // Hours
                                    var minutes = "0" + dateLogoff.getMinutes(); // Minutes
                                    var seconds = "0" + dateLogoff.getSeconds(); // Seconds
                                    var lastlogoffTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); // Will display time in 00:00:00 format

                                    // Display the date when the user created his profile and convert it into a correct and readable date format
                                    const unixTime = response.response.players[0].timecreated;
                                    const dateCreatedat = new Date(unixTime * 1000);

                                    const loadingEmbed = new Discord.MessageEmbed()
                                        .setColor("RANDOM")
                                        .setTitle('Please wait...');

                                    message.channel.send(loadingEmbed).then((msg) => {
                                        setTimeout(() => {
                                            // Display result in a Message Embed
                                            const steamEmbed = new Discord.MessageEmbed()
                                                .setColor("RANDOM")
                                                .setTitle(response.response.players[0].personaname)
                                                .setDescription(`Realname : ${realName}`)
                                                .setURL(response.response.players[0].profileurl)
                                                .addField('SteamID', response.response.players[0].steamid, false)
                                                .addField('Profile visibility', stateProfile, false)
                                                .addField('Country', country, true)
                                                .addField('State', state, true)
                                                .addField('City', city, true)
                                                .addField('Friends count', friendsCount, true)
                                                .addField('Games count', gameCount, true)
                                                .addField('VAC banned?', vacBanned, true)
                                                .addField('Recent game', recentGame, false)
                                                .addField('Last logoff', lastlogoffTime, false)
                                                .addField('Created at', dateCreatedat, false)
                                                .setThumbnail(response.response.players[0].avatarfull)

                                            msg.edit(steamEmbed); // Edit message
                                        }, 2000); // Wait 2 seconds before editing message
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}