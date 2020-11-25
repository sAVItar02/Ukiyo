const request = require("request");
const Data = require("../models/userModel");
const discord = require("discord.js");

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

  const url = `https://kitsu.io/api/edge/anime?filter[text]=${args[1]}`;

  request({ url }, async (err, response) => {
    if (err) {
      console.log(err);
    } else {
      const animeData = JSON.parse(response.body);
      let anime = {
        title: animeData.data[0].attributes.titles.en_us,
        jp: animeData.data[0].attributes.titles.en_jp,
        image: animeData.data[0].attributes.posterImage.small,
        desc: animeData.data[0].attributes.description.split(".")[0],
        status: animeData.data[0].attributes.status,
        epCount: animeData.data[0].attributes.episodeCount,
      };

      Data.findOne({ uid: taggedID }, async (err, data) => {
        if (!data) {
          const newData = new Data({
            uid: taggedID,
            watchList: [],
            watchLater: [],
            recommended: [anime.title],
          });
          await newData.save().catch((err) => console.log(err));
        } else {
          data.recommended.push(anime.title);
          await data.save().catch((err) => console.log(err));
          console.log(data);
        }

        const recommendEmbed = new discord.MessageEmbed()
          .setColor("#BFFF00")
          .setAuthor(`Anime recommended`)
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
      });
    }
  });
};

module.exports.help = {
  name: "recommend",
  aliases: ["r", "rec", "rmd"],
};
