const Data = require("../models/userModel");
const fetch = require("node-fetch");
const discord = require("discord.js");
const query = require("../graphql");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  const url = `https://graphql.anilist.co`;

  if (args.length > 1) {
    args = args.join("-");
  } else {
    args = args[0];
  }

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
            watchList: [],
            watchLater: [anime.title],
            recommended: [],
          });

          await newData.save().catch((e) => console.log(e));
        } else {
          data.watchLater.push(anime.title);
          await data.save().catch((e) => console.log(e));
        }

        const watchLaterEmbed = new discord.MessageEmbed()
          .setColor("#F4D03F")
          .setAuthor("Anime added to watch later 🙇‍♀️")
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

        message.channel.send(watchLaterEmbed);
      });
    });
};

module.exports.help = {
  name: "later",
  aliases: ["watchlater", "watchLater", "wlater", "wl", "l"],
};
