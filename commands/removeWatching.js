const Data = require("../models/userModel");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  if (message.mentions.users.first()) {
    message.channel.send("Baka! Don't fiddle with other users anime list! 👿");
    return;
  }

  args = args.join(" ");
  console.log(args);

  Data.findOneAndDelete({ watchList: [{ anime: args }] }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("###################");
    console.log(result);
  });
};

module.exports.help = {
  name: "removeWatching",
  aliases: ["rw", "remw", "rmw"],
};
