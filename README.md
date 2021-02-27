# RacoonBot-Dev <img height="20rem" src="https://emoji.gg/assets/emoji/6817_Discord_Verified.png">

Multifunctional discord bot made in Javascript [DEV REPOSITORY]

![](https://repository-images.githubusercontent.com/286796413/a8dbb000-f467-11ea-9d0a-b42efcb9b1a5)

![](https://img.shields.io/github/last-commit/Heyimlulu/RacoonBot/master?style=for-the-badge)
![](https://img.shields.io/static/v1?label=Language&message=Javascript&style=for-the-badge&color=yellow)
![](https://img.shields.io/static/v1?label=Dependencie&message=DiscordJS&style=for-the-badge&color=lightblue)
![](https://img.shields.io/static/v1?label=Published&message=DiscordBotList.com&style=for-the-badge&color=green)
![](https://img.shields.io/static/v1?label=Published&message=Top.gg&style=for-the-badge&color=green)
![](https://img.shields.io/static/v1?label=Author&message=Heyimlulu&style=for-the-badge)
![](https://img.shields.io/static/v1?label=Discord&message=Yuki%20🐺%230001&style=for-the-badge)
![](https://img.shields.io/github/license/Heyimlulu/RacoonBot?style=for-the-badge)

## Status

[![Discord Bots](https://top.gg/api/widget/status/734426328002068481.svg?noavatar=true)](https://top.gg/bot/734426328002068481)

## Table of Contents

- [Getting started](getting%20started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running](#running)
    - config.json
    - .env-example
- Using my bot
  - [top.gg](https://top.gg/bot/734426328002068481)
  - [discordbotlist.com](https://discordbotlist.com/bots/racoonbot)
- [Features](#features)
- [APIs](#apis)
- [Dependencies](#dependencies)
- Built with
  - Jetbrains IntelliJ IDEA
- Hosted on
  - Heroku 
- [Author](#author)
- [License](#license)

## Getting started

### Prerequisites

You need to do the following
- Install [NodeJS](https://nodejs.org/) on your computer
- Install the DiscordJS module. You can check their official website and documentation [here.](https://discord.js.org/#/)
  - You can also check their guide [here.](https://discordjs.guide/)
- Install theses modules to get the music command working
  - discordjs/opus
  - ffmpeg, ffmpeg-static, flutent-ffmpeg
  - ytdl-core
- Install the youtube-dl module for the download command
- Register to theses websites to get your API key 
  - imgur 
  - giphy
  - reddit 
  - steam
  - RapidAPI for Urban Dictionary
- A PostGreSQL database for the logging feature

### Installing

```
npm install
```

### Running

#### config.json 

First enter your bot token. You can find it in your applications tab on [Discord Developer Portal](https://discord.com/developers/applications)

```
{
  "token": "your-discord-bot-token", 
  "prefix": "racoon "
}
```

You can also put your bot token in the `.env` file

```
BOT_TOKEN = **************************
```

#### .env-example 

- First rename ``.env-example`` to ``.env``
- Replace ``*`` with your own API Secret Key

```
GIPHY_SECRET_KEY = **************************
IMGUR_SECRET_KEY = **************************
STEAM_SECRET_KEY = **************************
URBAN_DICTIONARY_SECRET_KEY = **************************
```

If you want to use the logging feature, you'll need to get your PostGreSQL URL 

```
DATABASE_URL = **************************
```

Now you can run the bot with

```
npm start
```

## Using my bot

- [x] [discordbotlist.com](https://discordbotlist.com/bots/racoonbot)
- [x] [top.gg](https://top.gg/bot/734426328002068481) 

## Features

- Get a random image from [imgur](https://giphy.com/) and  [giphy.](https://imgur.com/)
- Get a random [subreddit.](https://www.reddit.com/)
- Get player stats from [steam.](https://store.steampowered.com/)
- Get an article from [Urban Dictionary](https://www.urbandictionary.com/)
- Measure your cuteness with the Cute o'meter
- Show for how much you love someone with the *love* command
- Auto-role command! 
- Download videos from youtube
- Kick/Ban commands.

## APIs

- [Imgur](https://api.imgur.com/)
- [Giphy](https://developers.giphy.com/docs/api/)
- [Reddit](https://www.reddit.com/dev/api/)
- [Steam](https://developer.valvesoftware.com/wiki/Steam_Web_API)
- [Urban Dictionary](https://www.urbandictionary.com/)

## Dependencies

- discordjs

## Built with

<img height="300" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/JetBrains_Logo_2016.svg/1200px-JetBrains_Logo_2016.svg.png">
<img height="50px" src="https://cdn.worldvectorlogo.com/logos/intellijidea.svg">

## Hosted on

<img height="200px" src="https://bilalbudhani.com/content/images/2017/11/heroku.png">

## Author

- Heyimlulu

## License

Licensed under the [GNU Affero General Public License v3.0 License.](https://github.com/Heyimlulu/RacoonBot-Dev/blob/main/LICENSE) Click for more information.
