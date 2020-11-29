const Data = require('../models/reminderModel');
const discord = require('discord.js');
const fetch = require('node-fetch');
const query = require('./../graphQl/reminderQuery');
const slugify = require('slugify');

module.exports.run = async (bot, message, args) => {
  const user = message.author;
  const url = `https://graphql.anilist.co`;
  args = args.join(' ');
  let variables = {
    search: args,
    page: 1,
    perPage: 10,
  };

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
        airDate: animeData.media[0].nextAiringEpisode.airingAt,
        timeRemaining: animeData.media[0].nextAiringEpisode.timeUntilAiring,
        episodeNumebr: animeData.media[0].nextAiringEpisode.episode,
      };
    });
};

module.exports.help = {
  name: 'remind',
  aliases: ['remindme', 'addreminder', 'addrem', 'rem'],
};
