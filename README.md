dont_starve_bot

Setup:
get NPM (https://www.npmjs.com/)

get Node.js (https://nodejs.org/en/)

make a folder anywhere, go inside, open the command prompt and use the commands:

`npm install node.js`

`npm install discord.js`

`npm install moment`

copy bot.js into the root directory of the folder so it looks a bit like this

![bot directory](https://i.imgur.com/MOYhru6.png)

now for the bot, go to https://discord.com/developers/applications, make a new application, and make a new bot

get the bot token, not the client secret, and paste it into the last line of the bot script where it says `'bot login here'`

if you have installed dont starve together somewhere else, you will also need to change the path variables up at the top to point to where dont starve is located

on first startup, you should start the discord bot first and then don't starve to prevent a crash

2 commands: `dst!dstlink` will tell the discord bot to copy all messages sent in dont starve to the current channel, this can be a dm directly to it. `!send<message>` to send messages to dont starve.

the bot will not remember what channel to send to after a shutdown

!send will work no matter the channel as long as the bot has permissions to read

if you are having trouble, feel free to ask me on discord @ Anumania#0261

