const Data = require("../models/userModel");
const discord = require("discord.js");
const fetch = require("node-fetch");
const query = require("../graphql");
const { default: slugify } = require("slugify");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  args = args.join(" ");

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

  message.channel.startTyping();
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      const animeData = result.data.Page;
      let anime = {
        title: animeData.media[0].title.romaji,
        english: animeData.media[0].title.english,
        image: animeData.media[0].coverImage.large,
        desc: animeData.media[0].description.split(".")[0],
        status: animeData.media[0].status,
        epCount: animeData.media[0].episodes,
        genre: animeData.media[0].genres,
      };

      Data.findOne({ uid: user.id }, async (err, data) => {
        if (!data) {
          const newData = new Data({
            uid: user.id,
            watchList: [
              {
                slug: slugify(anime.title, { lower: true }),
                anime: anime.title,
                genres: anime.genre,
              },
            ],
            watchLater: [],
            recommended: [],
          });

          await newData.save().catch((e) => console.log(e));
          SendEmbed();
          message.channel.stopTyping();
        } else {
          for (i = 0; i < data.watchList.length; i++) {
            if (
              data.watchList[i].slug === slugify(anime.title, { lower: true })
            ) {
              message.channel.send(
                "That anime already exists in the users watching list, why dont you try adding another! 😕"
              );
              return;
            }
          }

          data.watchList.push({
            slug: slugify(anime.title, { lower: true }),
            anime: anime.title,
            genres: anime.genre,
          });
          await data.save().catch((e) => console.log(e));
          SendEmbed();
          message.channel.stopTyping();
        }

        function SendEmbed() {
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
        }
      });
    });
};

module.exports.help = {
  name: "watching",
  aliases: ["w", "seeing", "watch", "add"],
};
