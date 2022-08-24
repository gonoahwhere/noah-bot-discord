const mongoose = require("mongoose");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };
    
    mongoose.connect(process.env.MongoURI, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;
    
    var db = mongoose.connection;
    
    db.on("connected", () => {
      console.log("[MONGOOSE] Mongoose has successfully connected");
    });
    
    db.on("err", err => {
      console.error(`[MONGOOSE] Mongoose connection error: \n${err.stack}`);
    });
    
    db.on("disconnected", () => {
      console.warn("[MONGOOSE] Mongoose connection lost");
    });
  }
}