const Data = require("../models/userModel");
const query = require("../graphql");
const slugify = require("slugify");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  let check = false;
  const url = `https://graphql.anilist.co`;

  if (message.mentions.users.first()) {
    message.channel.send("Baka! Don't fiddle with other users anime list! 👿");
    message.channel.stopTyping();
    return;
  }

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
      };

      Data.findOneAndUpdate(
        { uid: user.id },
        {
          $pull: {
            watchLater: { slug: slugify(anime.title, { lower: true }) },
          },
        },
        async (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          data.watchLater.forEach((element) => {
            if (element.slug === slugify(anime.title, { lower: true })) {
              check = true;
              return;
            }
          });

          if (check) {
            message.channel.send(
              `\`\`\`css\n[${anime.title} was removed]\`\`\``
            );
            message.channel.stopTyping();
          } else {
            message.channel.send(
              "Looks like you tried removing something that doesn't exist! BAKA!"
            );
            message.channel.stopTyping();
          }
        }
      );
    });
};

module.exports.help = {
  name: "removeWatchLater",
  aliases: ["rwl", "remwl", "rmwl"],
};
