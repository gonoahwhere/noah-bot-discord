const mongoose = require("mongoose");
const Guild = require("../../models/guild.js");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild){
      guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildID: guild.id,
    guildName: guild.name
  });
  
  guild.save()
  .then(result => console.log(result))
  .catch(err => console.log(err));
  
  console.log("[MONGOOSE] I have joined a new server!");
  }
}