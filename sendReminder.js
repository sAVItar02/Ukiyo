const Data = require("./models/reminderModel");
const cron = require("node-cron");
const discord = require("discord.js");

const SendReminders = (bot) => {
  cron.schedule(
    "0 0 0,9,16 * * *",
    () => {
      let currentDate = new Date(Date.now());
      japanDate = new Date(currentDate.getTime() - (-540*60*1000))
      const date = japanDate.toISOString().split("T")[0];
      console.log(date);
      Data.find({ date }, async (err, data) => {
        data.forEach(async (element) => {
          let user = await bot.users.fetch(element.uid).catch((e) => {
            console.log(e);
          });
          const remindEmbed = new discord.MessageEmbed()
            .setColor("#F4D03F")
            .setAuthor("New episode has come out!")
            .setTitle(element.anime.title)
            .addFields({
              name: "Episode Number",
              value: `\`${element.anime.episode}\``,
              inline: true,
            });
          user.send(remindEmbed);
          element.remove();
        });
      });
    },
    {
      timezone: "Asia/Tokyo",
    }
  );
};

module.exports = SendReminders;
