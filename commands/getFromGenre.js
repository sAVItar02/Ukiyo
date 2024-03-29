const query = require("./../graphQl/genreQuery");
const fetch = require("node-fetch");
const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const url = `https://graphql.anilist.co`;
  if (!args[0]) {
    message.channel.send(
      "You want to search with genre and not mention it? Weird🙃"
    );
    message.channel.stopTyping();
    return;
  }

  args = args.join(" ");

  const pageQuery = `query ($search: String, $page: Int, $perPage: Int, $genre:String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (search: $search, type: ANIME, genre: $genre, sort: POPULARITY_DESC) {
      id
      }
    }
  }`;

  let pageVariables = {
    perPage: 50,
    genre: args,
    page: 1,
  };

  let pageOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: pageQuery,
      variables: pageVariables,
    }),
  };

  let maxPages = 1;

  message.channel.startTyping();
  fetch(url, pageOptions)
    .then((response) => response.json())
    .then((result) => {
      maxPages = result.data.Page.pageInfo.lastPage - 1;
      if (result.data.Page.pageInfo.total == 0) {
        message.channel.send("Try another genre! 😐");
        message.channel.stopTyping();
        return;
      }
      GetRandomGenre();
      message.channel.stopTyping();
    });

  function GetRandomGenre() {
    const randomPage = Math.floor(Math.random() * maxPages);

    let variables = {
      perPage: 50,
      genre: args,
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

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        const animeData =
          result.data.Page.media[
            Math.floor(Math.random() * result.data.Page.media.length)
          ];
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
          .setColor("#EE8BC1")
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
  }
};

module.exports.help = {
  name: "genre",
  aliases: ["type", "category"],
};
