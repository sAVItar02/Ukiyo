const request = require("request");
const Data = require("../models/userModel");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  if (args.length > 1) {
    args = args.join("-");
  }
  console.log(args);
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${args}`;
  console.log(url);

  request({ url: url }, async (err, response) => {
    if (err) {
      console.log(err);
    } else {
      const animeData = JSON.parse(response.body);
      let anime = {
        title: animeData.data[0].attributes.titles.en_us,
        jp: animeData.data[0].attributes.titles.en_jp,
        image: animeData.data[0].attributes.posterImage.small,
        desc: animeData.data[0].attributes.description.split(".")[0],
        status: animeData.data[0].attributes.status,
        epCount: animeData.data[0].attributes.episodeCount,
      };
      Data.findOne({ uid: user.id }, async (err, data) => {
        if (!data) {
          const newData = new Data({
            uid: user.id,
            name: bot.users.cache.get(user.id).username,
            watchList: [anime.title],
            watchLater: [],
            recommended: [],
          });

          await newData.save().catch((e) => console.log(e));
        } else {
          data.watchList.push(anime.title);
          await data.save().catch((e) => console.log(e));
          console.log(data);
          // message.channel.send("Anime added!");
        }
        const animeEmbed = new discord.MessageEmbed()
          .setColor("#BFFF00")
          .setAuthor("Anime Added!")
          .setTitle(anime.title)
          .setDescription(anime.desc)
          .setThumbnail(anime.image)
          .addFields(
            { name: "Status", value: `\`${anime.status}\``, inline: true },
            {
              name: "Episode Count",
              value: `\`${anime.epCount}\``,
              inline: true,
            }
          );

        message.channel.send(animeEmbed);
      });
    }
  });
};

module.exports.help = {
  name: "watching",
  aliases: ["w", "seeing", "watch", "add"],
};
