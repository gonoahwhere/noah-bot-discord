const { QuickDB } = require('quick.db');
const db = new QuickDB();

// db.fetch()
const getHugCooldown = (guildId, userId) => db.get(`userhugcooldown_${guildId}_${userId}`)
const getInfoCooldown = (guildId, userId) => db.get(`userinfocooldown_${guildId}_${userId}`)
const getHelpCooldown = (guildId, userId) => db.get(`userhelpcooldown_${guildId}_${userId}`)

const getHugSlashCooldown = (guildId, userId) => db.get(`userhugslashcooldown_${guildId}_${userId}`)
const getInfoSlashCooldown = (guildId, userId) => db.get(`userinfoslashcooldown_${guildId}_${userId}`)
const getHelpSlashCooldown = (guildId, userId) => db.get(`userhelpslashcooldown_${guildId}_${userId}`)
// db.add()

// db.subtract()

// db.set()
const setHugCooldown = (guildId, userId, date) => db.set(`userhugcooldown_${guildId}_${userId}`, date)
const setInfoCooldown = (guildId, userId, date) => db.set(`userinfocooldown_${guildId}_${userId}`, date)
const setHelpCooldown = (guildId, userId, date) => db.set(`userhelpcooldown_${guildId}_${userId}`, date)

const setHugSlashCooldown = (guildId, userId, date) => db.set(`userhugslashcooldown_${guildId}_${userId}`, date)
const setInfoSlashCooldown = (guildId, userId, date) => db.set(`userinfoslashcooldown_${guildId}_${userId}`, date)
const setHelpSlashCooldown = (guildId, userId, date) => db.set(`userhelpslashcooldown_${guildId}_${userId}`, date)

module.exports = {
    getHugCooldown,
    getInfoCooldown,
    getHelpCooldown,

    getHugSlashCooldown,
    getInfoSlashCooldown,
    getHelpSlashCooldown,

    setHugCooldown,
    setInfoCooldown,
    setHelpCooldown,

    setHugSlashCooldown,
    setInfoSlashCooldown,
    setHelpSlashCooldown,
}