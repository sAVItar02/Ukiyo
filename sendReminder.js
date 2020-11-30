const Data = require("./models/reminderModel");
const discord = require("discord.js");
const cron = require("node-cron");
const bot = new discord.Client();

cron.schedule("* * * * * *", async () => {
  Data.find({ uid: 348472946110496779 }, async (err, data) => {
    console.log(data);
    console.log("1");
    console.log(Date.now());
  });
});
