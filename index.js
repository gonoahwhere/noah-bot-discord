console.clear();
console.debug(`Booting up…`);

const Discord = require('discord.js');
const { Client, Collection, Intents } = Discord;
const handler = require("./src/handlers/index");
const fetch = require("node-fetch");

const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});

// Call .env file to get Token
require('dotenv').config();

// Global Variables
bot.discord  = Discord;
bot.commands = new Collection();
bot.slash    = new Collection();
bot.config   = require('./config');
bot.cwd      = require('process').cwd(); // require('path').resolve(``);

module.exports = bot;

// Records commands and events
handler.loadEvents(bot);
handler.loadCommands(bot);
handler.loadSlashCommands(bot);

// Error Handling
process.on("uncaughtException", (err) => {
    console.error('Uncaught Exception:', err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("[FATAL] Possibly Unhandled Rejection at: Promise", promise, "\nreason:", reason.message);
});

//bot.api.application?.commands.set([])
bot.application.commands.delete().then(console.log("I have deleted all possible slash commands."))

// Login Discord Bot Token
bot.login(process.env.token);