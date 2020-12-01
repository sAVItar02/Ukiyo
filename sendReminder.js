const Data = require("./models/reminderModel");
const cron = require("node-cron");
const discord = require("discord.js");

const SendReminders = (bot) => {
  cron.schedule(
    "0 0 0,8,16 * * *",
    () => {
      const date = new Date(Date.now()).toISOString().split("T")[0];
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
