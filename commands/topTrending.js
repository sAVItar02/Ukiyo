const query = require('./../graphQl/trendingQuery');
const fetch = require('node-fetch');
const discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports.run = async (bot, message, args) => {
  let animeCount=10;
  if(args[0])
    animeCount=args[0];
    
  const url = `https://graphql.anilist.co`;
  let pages = [];
  let variables = {
    page: 1,
    perPage: animeCount,
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
      const animeData = result.data.Page.media;

      let embed = new discord.MessageEmbed();
      for (i = 0; i < animeData.length; ) {
        let genre = '';
        animeData[i].genres.forEach((element) => {
          genre += `\`${element}\` `;
        });
        if (i != 0 && i % 5 == 0) {
          pages.push(embed);
          embed = new discord.MessageEmbed();
        }
        embed
          .setColor('#007570')
          .addField(`${i + 1}. ${animeData[i++].title.romaji}`, `${genre}`);
      }
      pages.push(embed);
      console.log(pages);

      const emojiList = ['⏮', '⏭'];
      const timeOut = 200000;
      pagination(message, pages, emojiList, timeOut);

    });
};

module.exports.help = {
  name: 'trending',
  aliases: ['trend', 'trending', 'hot'],
};
