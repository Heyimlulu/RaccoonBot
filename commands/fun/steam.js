const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

class SteamCommand extends Command {
    constructor() {
        super('steam', {
            aliases: ['steam'],
            category: 'fun',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'string',
                    prompt: {
                        start: 'Which steam user should I show infos?'
                    }
                }
            ],
            description: {
                content: 'Send stats for a steam user',
                usage: '[steamID]',
                examples: ['']
            }
        });
    }

    async exec(message, args) {

        let steamID = args.user;
        if (!steamID) return message.reply('You did not specified a valid steamID!')

        let doesExist = await checkSteamID();
        if (doesExist === true) return message.reply('I could not find a steam user with that ID!');

        let player = await getPlayerSummaries();
        let decoder = await decodeCountries(player.country, player.state, player.city);
        let friendsList = await getFriends();
        let games = await getGames();
        let VAC = await getPlayerBan();
        let recentGame = await getRecentlyPlayedGame();

        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 'RANDOM')
            .setTitle(`${player.userName} (${steamID})`)
            .setDescription(`Realname : \u0060${player.realName}\u0060`)
            .setURL(player.url)
            .setThumbnail(player.avatar)
            .addField('Profile visibility', player.stateProfile, false)
            .addField('Country', decoder.country, true)
            .addField('State', decoder.state, true)
            .addField('City', decoder.city, true)
            .addField('Friends count', friendsList, true)
            .addField('Games count', games, true)
            .addField('VAC banned?', VAC, true)
            .addField('Recent game', recentGame, false)
            .addField('Last logoff', player.lastlogoffTime, false)
            .addField('Created at', player.dateCreatedAt, false)

        await message.channel.send(embed);

        async function checkSteamID() {
            const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_SECRET_KEY}&steamids=${steamID}`);
            const checkSteamID = await response.json();

            if (!checkSteamID.response.players[0]) return true;
        }

        async function getPlayerSummaries() {
            let avatar,
                userName,
                url,
                realName,
                stateProfile,
                country,
                state,
                city,
                lastlogoffTime,
                dateCreatedAt;

            const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_SECRET_KEY}&steamids=${steamID}`);
            const playerSummaries = await response.json();

            avatar = playerSummaries.response.players[0].avatarfull; // Get player's avatar
            userName = playerSummaries.response.players[0].personaname; // Get player's username
            url = playerSummaries.response.players[0].profileurl; // Get link to player's steam profile

            // Get player's realname if any
            if (playerSummaries.response.players[0].hasOwnProperty('realname')) {
                realName = playerSummaries.response.players[0].realname;
            } else {
                realName = 'unknown';
            }

            // Check if the profile is public or private
            if (playerSummaries.response.players[0].communityvisibilitystate == 1) {
                stateProfile = 'Private';
            }
            if (playerSummaries.response.players[0].communityvisibilitystate == 3) {
                stateProfile = 'Public';
            }

            // Get steam user location if any
            if (playerSummaries.response.players[0].hasOwnProperty('loccountrycode')) {
                country = playerSummaries.response.players[0].loccountrycode;
            } else {
                country = 'Unknown';
            }

            if (playerSummaries.response.players[0].hasOwnProperty('locstatecode')) {
                state = playerSummaries.response.players[0].locstatecode;
            } else {
                state = 'Unknown';
            }

            if (playerSummaries.response.players[0].hasOwnProperty('loccityid')) {
                city = playerSummaries.response.players[0].loccityid;
            } else {
                city = 'Unknown';
            }

            // Display the last time the user was seen online and set it in a variable that will convert into a readable format for human
            let unix_timestamp = playerSummaries.response.players[0].lastlogoff;

            // Create a new JavaScript Date object based on the timestamp
            let dateLogoff = new Date(unix_timestamp * 1000); // multiplied by 1000 so that the argument is in milliseconds and not seconds
            let hh = dateLogoff.getHours() + 1; // Hours
            let mm = "0" + dateLogoff.getMinutes(); // Minutes
            let ss = "0" + dateLogoff.getSeconds(); // Seconds
            lastlogoffTime = hh + ':' + mm.substr(-2) + ':' + ss.substr(-2); // Will display time in 00:00:00 format

            // Display the date when the user created his profile and convert it into a correct and readable date format
            let unixTime = playerSummaries.response.players[0].timecreated;
            dateCreatedAt = new Date(unixTime * 1000);

            // return values
            return {
                avatar,
                userName,
                url,
                realName,
                stateProfile,
                country,
                state,
                city,
                lastlogoffTime,
                dateCreatedAt
            };

        }

        async function decodeCountries(countries, states, cities) {

            let country,
                state,
                city;

            const response = await fetch('https://raw.githubusercontent.com/Holek/steam-friends-countries/master/data/steam_countries.json');
            const decoder = await response.json();

            if (countries) {
                country = decoder[countries].name;
            } else {
                country = 'Unknown';
            }

            if (states) {
                state = decoder[countries].states[states].name;
            } else {
                state = 'Unknown';
            }

            if (cities) {
                city = decoder[countries].states[states].cities[cities].name;
            } else {
                city = 'Unknown';
            }

            return {
                country,
                state,
                city
            };
        }

        async function getFriends() {

            let friendsCount;

            const response = await fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_SECRET_KEY}&steamid=${steamID}&relationship=friend`);
            const friends = await response.json();

            // Count how many friends the player have
            if (friends.hasOwnProperty('friendslist')) {
                // Friends counter
                function length(obj) {
                    return Object.keys(obj).length;
                }

                // Store the result in a variable
                friendsCount = length(friends.friendslist.friends);
            } else {
                friendsCount = 'unknown';
            }

            return friendsCount;
        }

        async function getGames() {

            let gameCount;

            const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_SECRET_KEY}&steamid=${steamID}&format=json`);
            const games = await response.json();

            // Count how many games the player have
            if (games.response.hasOwnProperty('game_count')) {
                gameCount = games.response.game_count;
            } else {
                gameCount = 'unknown';
            }

            return gameCount;
        }

        async function getPlayerBan() {

            let vacBanned;

            const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${process.env.STEAM_SECRET_KEY}&steamids=${steamID}`);
            const VAC = await response.json();

            if (VAC.players[0].hasOwnProperty('VACBanned')) {
                let vacCheck = VAC.players[0].VACBanned;

                if (vacCheck === true) {
                    vacBanned = 'Yes';
                } else {
                    vacBanned = 'No';
                }
            }

            return vacBanned;
        }

        async function getRecentlyPlayedGame() {

            let recentGame;

            const response = await fetch(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_SECRET_KEY}&steamid=${steamID}&format=json`);
            const recentlyPlayedGame = await response.json();

            if (recentlyPlayedGame.response.hasOwnProperty('games')){
                recentGame = recentlyPlayedGame.response.games[0].name;
            } else {
                recentGame = 'unknown';
            }

            return recentGame;
        }
    }
}

module.exports = SteamCommand;