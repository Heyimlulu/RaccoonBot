<p align="center">
  <img width="75%" src="https://repository-images.githubusercontent.com/286796413/a8dbb000-f467-11ea-9d0a-b42efcb9b1a5" alt="RacoonBot" />
</p>

<div align="center">
  <h1>RacoonBot</h1>
  
  <p>RacoonBot is a multipurpose bot for moderation, fun, general, and utility commands. It is also a funny and cute racoon ;3</p>

  <a href="https://top.gg/bot/734426328002068481">
    <img src="https://top.gg/api/widget/734426328002068481.svg" alt="RacoonBot" />
  </a>
</div>

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

## Built with

- Discord.JS - Discord API used
- Discord-akairo - Framework used for Discord.JS

<div>
  <img height="300" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/JetBrains_Logo_2016.svg/1200px-JetBrains_Logo_2016.svg.png">
  <img height="50" src="https://cdn.worldvectorlogo.com/logos/intellijidea.svg">
</div>

## Author

- Heyimlulu

## License

Licensed under the [GNU Affero General Public License v3.0 License.](https://github.com/Heyimlulu/RacoonBot-Dev/blob/main/LICENSE) Click for more information.
