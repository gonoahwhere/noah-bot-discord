const mongoose = require("mongoose");
const Guild = require("../../models/guild.js");

module.exports = {
  name: "guildDelete",
  async execute(bot, guild){
      Guild.findOneAndDelete({
    guildID: guild.id
  }, (err, res) => {
      if(err) console.error(err)
      console.log("[MONGOOSE] I have been removed from a server!");
  });
  }
}