const request = require("request");
const Data = require("../models/userModel");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${args[0]}`;
  //   const url = `https://jsonplaceholder.typicode.com/todos/1`;
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
            watchList: [anime],
            watchLater: [],
            recommended: [],
          });

          await newData.save().catch((e) => console.log(e));
          message.channel.send("Anime added!");
        } else {
          data.watchList.push(anime);
          await data.save().catch((e) => console.log(e));
          console.log(data);
          message.channel.send("Anime added!");
        }
      });
    }
  });
};

module.exports.help = {
  name: "set",
  aliases: ["s"],
};
