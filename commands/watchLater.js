const request = require("request");
const Data = require("../models/userModel");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${args[0]}`;
  console.log(url);

  request({ url: url }, async (err, response) => {
    if (err) {
      console.log(err);
    } else {
      const anime = JSON.parse(response.body).data[0].attributes.titles.en_us;
      console.log(anime);
      Data.findOne({ uid: user.id }, async (err, data) => {
        if (!data) {
          const newData = new Data({
            uid: user.id,
            name: bot.users.cache.get(user.id).username,
            watchList: [],
            watchLater: [anime],
            recommended: [],
          });

          await newData.save().catch((e) => console.log(e));
          message.channel.send("Anime added to Watch Later!");
        } else {
          data.watchLater.push(anime);
          await data.save().catch((e) => console.log(e));
          console.log(data);
          message.channel.send("Anime added to Watch Later!");
        }
      });
    }
  });
};
  
module.exports.help = {
    name: 'later',
    aliases: ['watchlater','watchLater','wlater','wl','l'],
};
  