const query = require("../graphql");
const fetch = require("node-fetch");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const url = `https://graphql.anilist.co`;
  if (!args[0]) {
    message.channel.send("You need to mention the anime😒");
    return;
  }
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

  message.channel.startTyping();
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      try {
        const animeData = result.data.Page;

        let anime = {
          title: animeData.media[0].title.romaji,
          english: animeData.media[0].title.english,
          image: animeData.media[0].coverImage.large,
          desc: animeData.media[0].description,
          status: animeData.media[0].status,
          epCount: animeData.media[0].episodes,
          duration: animeData.media[0].duration,
          genres: animeData.media[0].genres,
        };
        let genre = "";
        anime.genres.forEach((element) => {
          genre += `\`${element}\` `;
        });
        const animeEmbed = new discord.MessageEmbed()
          .setColor("#FF7F49")
          .setTitle(anime.title)
          .setDescription(anime.desc)
          .setThumbnail(anime.image)
          .addFields(
            { name: "Status", value: `\`${anime.status}\``, inline: true },
            {
              name: "Episode Count",
              value: `\`${anime.epCount}\``,
              inline: true,
            },
            {
              name: "Duration",
              value: `\`${anime.duration}m\``,
              inline: true,
            },
            {
              name: "Genre",
              value: `${genre}`,
              inline: true,
            }
          );

        message.channel.send(animeEmbed);
        message.channel.stopTyping();
      } catch (err) {
        console.log(err);
        message.channel.send("😕You sure that is the anime's name?");
        message.channel.stopTyping();
      }
    });
};

module.exports.help = {
  name: "describe",
  aliases: ["desc", "d"],
};
