const { QuickDB } = require('quick.db');
const db = new QuickDB();

// db.fetch()
const getBiteCooldown = (guildId, userId) => db.get(`userbitecooldown_${guildId}_${userId}`)
const getBlushCooldown = (guildId, userId) => db.get(`userblushcooldown_${guildId}_${userId}`)
const getBonkCooldown = (guildId, userId) => db.get(`userbonkcooldown_${guildId}_${userId}`)
const getBoredCooldown = (guildId, userId) => db.get(`userboredcooldown_${guildId}_${userId}`)
const getConfusedCooldown = (guildId, userId) => db.get(`userconfusedcooldown_${guildId}_${userId}`)
const getCryCooldown = (guildId, userId) => db.get(`usercrycooldown_${guildId}_${userId}`)
const getCuddleCooldown = (guildId, userId) => db.get(`usercuddlecooldown_${guildId}_${userId}`)
const getDanceCooldown = (guildId, userId) => db.get(`userdancecooldown_${guildId}_${userId}`)
const getHappyCooldown = (guildId, userId) => db.get(`userhappycooldown_${guildId}_${userId}`)
const getHighfiveCooldown = (guildId, userId) => db.get(`userhighfivecooldown_${guildId}_${userId}`)
const getHugCooldown = (guildId, userId) => db.get(`userhugcooldown_${guildId}_${userId}`)
const getKickCooldown = (guildId, userId) => db.get(`userkickcooldown_${guildId}_${userId}`)
const getKillCooldown = (guildId, userId) => db.get(`userkillcooldown_${guildId}_${userId}`)
const getKissCooldown = (guildId, userId) => db.get(`userkisscooldown_${guildId}_${userId}`)
const getNervousCooldown = (guildId, userId) => db.get(`usernervouscooldown_${guildId}_${userId}`)
const getPatCooldown = (guildId, userId) => db.get(`userpatcooldown_${guildId}_${userId}`)
const getPunchCooldown = (guildId, userId) => db.get(`userpunchcooldown_${guildId}_${userId}`)
const getSadCooldown = (guildId, userId) => db.get(`usersadcooldown_${guildId}_${userId}`)
const getScreamCooldown = (guildId, userId) => db.get(`userscreamcooldown_${guildId}_${userId}`)
const getSlapCooldown = (guildId, userId) => db.get(`userslapcooldown_${guildId}_${userId}`)
const getSmileCooldown = (guildId, userId) => db.get(`usersmilecooldown_${guildId}_${userId}`)
const getStareCooldown = (guildId, userId) => db.get(`userstarecooldown_${guildId}_${userId}`)
const getThinkingCooldown = (guildId, userId) => db.get(`userthinkingcooldown_${guildId}_${userId}`)
const getWaveCooldown = (guildId, userId) => db.get(`userwavecooldown_${guildId}_${userId}`)
const getWinkCooldown = (guildId, userId) => db.get(`userwinkcooldown_${guildId}_${userId}`)
const getYeetCooldown = (guildId, userId) => db.get(`useryeetcooldown_${guildId}_${userId}`)
const getYesCooldown = (guildId, userId) => db.get(`useryescooldown_${guildId}_${userId}`)
const getInfoCooldown = (guildId, userId) => db.get(`userinfocooldown_${guildId}_${userId}`)
const getHelpCooldown = (guildId, userId) => db.get(`userhelpcooldown_${guildId}_${userId}`)

const getHugSlashCooldown = (guildId, userId) => db.get(`userhugslashcooldown_${guildId}_${userId}`)
const getInfoSlashCooldown = (guildId, userId) => db.get(`userinfoslashcooldown_${guildId}_${userId}`)
const getHelpSlashCooldown = (guildId, userId) => db.get(`userhelpslashcooldown_${guildId}_${userId}`)

const getTotalCommandCountGuild = (guildId) => db.get(`totalcommandcountguild_${guildId}`)

// db.add()
const addTotalCommandCountGuild = (guildId, amount) => db.add(`totalcommandcountguild_${guildId}`, amount)

// db.subtract()

// db.set()
const setBiteCooldown = (guildId, userId, date) => db.set(`userbitecooldown_${guildId}_${userId}`, date)
const setBlushCooldown = (guildId, userId, date) => db.set(`userblushcooldown_${guildId}_${userId}`, date)
const setBonkCooldown = (guildId, userId, date) => db.set(`userbonkcooldown_${guildId}_${userId}`, date)
const setBoredCooldown = (guildId, userId, date) => db.set(`userboredcooldown_${guildId}_${userId}`, date)
const setConfusedCooldown = (guildId, userId, date) => db.set(`userconfusedcooldown_${guildId}_${userId}`, date)
const setCryCooldown = (guildId, userId, date) => db.set(`usercrycooldown_${guildId}_${userId}`, date)
const setCuddleCooldown = (guildId, userId, date) => db.set(`usercuddlecooldown_${guildId}_${userId}`, date)
const setDanceCooldown = (guildId, userId, date) => db.set(`userdancecooldown_${guildId}_${userId}`, date)
const setHappyCooldown = (guildId, userId, date) => db.set(`userhappycooldown_${guildId}_${userId}`, date)
const setHighfiveCooldown = (guildId, userId, date) => db.set(`userhighfivecooldown_${guildId}_${userId}`, date)
const setHugCooldown = (guildId, userId, date) => db.set(`userhugcooldown_${guildId}_${userId}`, date)
const setKickCooldown = (guildId, userId, date) => db.set(`userkickcooldown_${guildId}_${userId}`, date)
const setKillCooldown = (guildId, userId, date) => db.set(`userkillcooldown_${guildId}_${userId}`, date)
const setKissCooldown = (guildId, userId, date) => db.set(`userkisscooldown_${guildId}_${userId}`, date)
const setNervousCooldown = (guildId, userId, date) => db.set(`usernervouscooldown_${guildId}_${userId}`, date)
const setPatCooldown = (guildId, userId, date) => db.set(`userpatcooldown_${guildId}_${userId}`, date)
const setPunchCooldown = (guildId, userId, date) => db.set(`userpunchcooldown_${guildId}_${userId}`, date)
const setSadCooldown = (guildId, userId, date) => db.set(`usersadcooldown_${guildId}_${userId}`, date)
const setScreamCooldown = (guildId, userId, date) => db.set(`userscreamcooldown_${guildId}_${userId}`, date)
const setSlapCooldown = (guildId, userId, date) => db.set(`userslapcooldown_${guildId}_${userId}`, date)
const setSmileCooldown = (guildId, userId, date) => db.set(`usersmilecooldown_${guildId}_${userId}`, date)
const setStareCooldown = (guildId, userId, date) => db.set(`userstarecooldown_${guildId}_${userId}`, date)
const setThinkingCooldown = (guildId, userId, date) => db.set(`userthinkingcooldown_${guildId}_${userId}`, date)
const setWaveCooldown = (guildId, userId, date) => db.set(`userwavecooldown_${guildId}_${userId}`, date)
const setWinkCooldown = (guildId, userId, date) => db.set(`userwinkcooldown_${guildId}_${userId}`, date)
const setYeetCooldown = (guildId, userId, date) => db.set(`useryeetcooldown_${guildId}_${userId}`, date)
const setYesCooldown = (guildId, userId, date) => db.set(`useryescooldown_${guildId}_${userId}`, date)
const setInfoCooldown = (guildId, userId, date) => db.set(`userinfocooldown_${guildId}_${userId}`, date)
const setHelpCooldown = (guildId, userId, date) => db.set(`userhelpcooldown_${guildId}_${userId}`, date)

const setHugSlashCooldown = (guildId, userId, date) => db.set(`userhugslashcooldown_${guildId}_${userId}`, date)
const setInfoSlashCooldown = (guildId, userId, date) => db.set(`userinfoslashcooldown_${guildId}_${userId}`, date)
const setHelpSlashCooldown = (guildId, userId, date) => db.set(`userhelpslashcooldown_${guildId}_${userId}`, date)

module.exports = {
    getBiteCooldown,
    getBlushCooldown,
    getBonkCooldown,
    getBoredCooldown,
    getConfusedCooldown,
    getCryCooldown,
    getCuddleCooldown,
    getDanceCooldown,
    getHappyCooldown,
    getHighfiveCooldown,
    getHugCooldown,
    getKickCooldown,
    getKillCooldown,
    getKissCooldown,
    getNervousCooldown,
    getPatCooldown,
    getPunchCooldown,
    getSadCooldown,
    getScreamCooldown,
    getSlapCooldown,
    getSmileCooldown,
    getStareCooldown,
    getThinkingCooldown,
    getWaveCooldown,
    getWinkCooldown,
    getYeetCooldown,
    getYesCooldown,
    getInfoCooldown,
    getHelpCooldown,

    getHugSlashCooldown,
    getInfoSlashCooldown,
    getHelpSlashCooldown,

    getTotalCommandCountGuild,

    addTotalCommandCountGuild,
    
    setBiteCooldown,
    setBlushCooldown,
    setBonkCooldown,
    setBoredCooldown,
    setConfusedCooldown,
    setCryCooldown,
    setCuddleCooldown,
    setDanceCooldown,
    setHappyCooldown,
    setHighfiveCooldown,
    setHugCooldown,
    setKickCooldown,
    setKillCooldown,
    setKissCooldown,
    setNervousCooldown,
    setPatCooldown,
    setPunchCooldown,
    setSadCooldown,
    setScreamCooldown,
    setSlapCooldown,
    setSmileCooldown,
    setStareCooldown,
    setThinkingCooldown,
    setWaveCooldown,
    setWinkCooldown,
    setYeetCooldown,
    setYesCooldown,
    setInfoCooldown,
    setHelpCooldown,

    setHugSlashCooldown,
    setInfoSlashCooldown,
    setHelpSlashCooldown,

}