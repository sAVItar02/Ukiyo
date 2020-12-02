const query = require("../graphQl/genreQuery");
const fetch = require("node-fetch");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const url = `https://graphql.anilist.co`;

  const randomPage = Math.floor(Math.random() * 100);

  let variables = {
    perPage: 5000,
    page: randomPage,
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
      const animeData =
        result.data.Page.media[
          Math.floor(Math.random() * result.data.Page.media.length)
        ];

      if (!animeData) {
        message.channel.send("Try some other genre!");
        return;
      }

      let anime = {
        title: animeData.title.romaji,
        english: animeData.title.english,
        image: animeData.coverImage.large,
        desc: animeData.description,
        status: animeData.status,
        epCount: animeData.episodes,
        duration: animeData.duration,
        genres: animeData.genres,
      };
      let genre = "";
      anime.genres.forEach((element) => {
        genre += `\`${element}\` `;
      });
      const animeEmbed = new discord.MessageEmbed()
        .setColor("#146BC8")
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
    });
};

module.exports.help = {
  name: "random",
  aliases: ["random"],
};
