const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

// db.fetch()
const getHugCooldown = (guildId, userId, usersId) => db.fetch(`hug_${guildId}_${userId}_${usersId}`)
// db.add()

// db.subtract()

// db.set()
const setHugCooldown = (guildId, userId, usersId) => db.set(`hug_${guildId}_${userId}_${usersId}`)

module.exports = {
    getHugCooldown,

    setHugCooldown,
}