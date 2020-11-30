const Data = require("../models/reminderModel");
const discord = require("discord.js");
const fetch = require("node-fetch");
const query = require("./../graphQl/reminderQuery");
const slugify = require("slugify");

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

  fetch(url, options)
    .then((response) => response.json())
    .then(async (result) => {
      const animeData = result.data.Page;
      let anime = {
        title: animeData.media[0].title.romaji,
        english: animeData.media[0].title.english,
        airDate: animeData.media[0].nextAiringEpisode.airingAt,
        timeRemaining: animeData.media[0].nextAiringEpisode.timeUntilAiring,
        episodeNumebr: animeData.media[0].nextAiringEpisode.episode,
      };

      // Data.find({ date: Date.now() }, async (err, data) => {
      //   if (!err) {
      //     console.log(data);
      //     data.push({
      //       uid: user.id,
      //       anime: anime.title,
      //       date: anime.airDate,
      //     });

      //     await data.save().catch((e) => console.log(e));
      //   } else {
      //     console.log(err);
      //   }
      // });

      await Data.create({
        reminders: {
          uid: user.id,
          anime: anime.title,
          date: anime.airDate * 1000,
        },
      });

      message.channel.send(`Reminder set!! for ${anime.title} ⏲`);
    });
};

module.exports.help = {
  name: "remind",
  aliases: ["remindme", "addreminder", "addrem", "rem"],
};
