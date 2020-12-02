const Data = require("../models/reminderModel");
const fetch = require("node-fetch");
const query = require("./../graphQl/reminderQuery");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const user = message.author;
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
    .then(async (result) => {
      const animeData = result.data.Page;

      if (!animeData.media[0].nextAiringEpisode) {
        message.channel.send(
          "No airing date available for this anime! 😓 `The anime should be ongoing!` "
        );
        message.channel.stopTyping();
        return;
      }

      let anime = {
        title: animeData.media[0].title.romaji,
        english: animeData.media[0].title.english,
        airDate: animeData.media[0].nextAiringEpisode.airingAt * 1000,
        timeRemaining:
          animeData.media[0].nextAiringEpisode.timeUntilAiring * 1000,
        episodeNumber: animeData.media[0].nextAiringEpisode.episode,
        image: animeData.media[0].coverImage.large,
      };

      let date = new Date(anime.airDate).toISOString().split("T")[0];

      await Data.create({
        uid: user.id,
        anime: {
          episode: anime.episodeNumber,
          title: anime.title,
        },
        date: date,
      });

      const remindEmbed = new discord.MessageEmbed()
        .setColor("#F4D03F")
        .setAuthor("Anime added to Reminders ⏰")
        .setTitle(anime.title)
        .setThumbnail(anime.image)
        .addFields(
          {
            name: "Episode Number",
            value: `\`${anime.episodeNumber}\``,
            inline: true,
          },
          {
            name: "Episode Date",
            value: `\`${new Date(anime.airDate)}\``,
            inline: true,
          }
        );

      message.channel.send(remindEmbed);
      message.channel.stopTyping();
    });
};

module.exports.help = {
  name: "remind",
  aliases: ["remindme", "addreminder", "addrem", "rem"],
};
