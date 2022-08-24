const {MessageEmbed} = require("discord.js")
const { QuickDB } = require('quick.db');
const db = new QuickDB();

// db.fetch()
const getHugCooldown = (guildId, userId) => db.fetch(`userhugcooldown_${guildId}_${userId}`)
// db.add()

// db.subtract()

// db.set()
const setHugCooldown = (guildId, userId) => db.set(`userhugcooldown_${guildId}_${userId}`)

module.exports = {
    getHugCooldown,

    setHugCooldown,
}