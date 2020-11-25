const request = require("request");
const Data = require("../models/userModel");

module.exports.run = async (bot, message, args) => {
    let user = message.author;
    const url = `https://kitsu.io/api/edge/anime?filter[text]=${args[0]}`;
    console.log(url);
    const anime = {title: '',desc: '', img:''}
  
    request({ url: url }, async (err, response) => {
      if (err) {
        console.log(err);
      } else {
        const animeData = JSON.parse(response.body);
        let anime = {
            title: animeData.data[0].attributes.titles.en_us,
            image: animeData.data[0].attributes.posterImage.tiny,
            desc: animeData.data[0].attributes.description,
        }
        message.channel.send(anime.image);
       
      }
    });
  };
  module.exports.help = {
    name: 'show',
    aliases: ['s','d','disp','display','view'],
  };
  