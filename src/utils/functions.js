const {MessageEmbed} = require("discord.js")
const { QuickDB } = require('quick.db');
const db = new QuickDB();

// db.fetch()
const getHugCooldown = (guildId, userId, usersId) => await db.fetch(`hug_${guildId}_${userId}_${usersId}`)
// db.add()

// db.subtract()

// db.set()
const setHugCooldown = (guildId, userId, usersId) => await db.set(`hug_${guildId}_${userId}_${usersId}`)

module.exports = {
    getHugCooldown,

    setHugCooldown,
}