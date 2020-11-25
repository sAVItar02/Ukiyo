const request = require("request");
const Data = require("../models/userModel");
const discord = require("discord.js");
const fetch = require("node-fetch");
const query = require("../graphql");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  if (args.length > 1) {
    args = args.join("-");
  } else {
    args = args[0];
  }
  console.log(args);

  const url = `https://graphql.anilist.co`;

  let variables = {
    search: args,
    page: 1,
    perPage: 10,
  };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);

      const animeData = result.data.Page;
      let anime = {
        title: animeData.media[0].title.romaji,
        english: animeData.media[0].title.english,
        image: animeData.media[0].coverImage.medium,
        desc: animeData.media[0].description.split(".")[0],
        status: animeData.media[0].status,
        epCount: animeData.media[0].episodes,
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
          .setAuthor("Anime Added! 🙇‍♀️")
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
    });
};

module.exports.help = {
  name: "watching",
  aliases: ["w", "seeing", "watch", "add"],
};
