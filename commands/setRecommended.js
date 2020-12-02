const Data = require("../models/userModel");
const discord = require("discord.js");
const fetch = require("node-fetch");
const query = require("../graphql");
const slugify = require("slugify");

module.exports.run = async (bot, message, args) => {
  if (!args[0].startsWith("<@")) {
    message.channel.send(
      "If I were you, I'd recommend that to a user by tagging them 🍜"
    );
    return;
  }

  let user = message.author;
  let tagged = args[0];
  let taggedID = tagged.slice(3, tagged.length - 1);
  if (user.id === taggedID) return;
  args.shift();

  const url = `https://graphql.anilist.co`;
  args = args.join(" ");

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
        image: animeData.media[0].coverImage.medium,
        desc: animeData.media[0].description.split(".")[0],
        status: animeData.media[0].status,
        epCount: animeData.media[0].episodes,
        genre: animeData.media[0].genres,
      };

      Data.findOne({ uid: taggedID }, async (err, data) => {
        if (!data) {
          const newData = new Data({
            uid: taggedID,
            watchList: [],
            watchLater: [],
            recommended: [
              {
                slug: slugify(anime.title, { lower: true }),
                recommendedBy: taggedID,
                anime: anime.title,
                genres: anime.genre,
              },
            ],
          });
          await newData.save().catch((err) => console.log(err));
          SendEmbed();
          message.channel.stopTyping();
        } else {
          for (i = 0; i < data.recommended.length; i++) {
            if (
              data.recommended[i].slug === slugify(anime.title, { lower: true })
            ) {
              message.channel.send(
                "That anime already exists in the users recommended list, why dont you try suggesting another! 🍙"
              );
              return;
            }
          }
          data.recommended.push({
            slug: slugify(anime.title, { lower: true }),
            recommendedBy: user.id,
            anime: anime.title,
            genres: anime.genre,
          });
          await data.save().catch((err) => console.log(err));
          SendEmbed();
          message.channel.stopTyping();
        }

        function SendEmbed() {
          const recommendEmbed = new discord.MessageEmbed()
            .setColor("#5DADEC")
            .setAuthor(`Anime recommended! 📢`)
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
          message.channel.send(recommendEmbed);
        }
      });
    });
};

module.exports.help = {
  name: "recommend",
  aliases: ["r", "rec", "rmd"],
};
