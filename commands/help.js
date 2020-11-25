const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const Embed = new discord.MessageEmbed()
    .setAuthor("Konnichiwa uwu")
    .setColor("#FFB6C1")
    .setTitle("Help")
    .setDescription("Some commands for your help 💥")
    // .setThumbnail(
    //   "https://www.awesomeinventions.com/wp-content/uploads/2015/06/japanese-words-ukiyo.jpg"
    // )
    .addFields(
      { name: "👓Recommend", value: `\`recommend\``, inline: true },
      { name: "🍿Watch Later", value: `\`watch\``, inline: true },
      { name: "✨Watch Now", value: `\`add\``, inline: true },
      { name: "📺Anime", value: `\`get\``, inline: true },
      { name: "❓Trivia", value: `\`trivia\``, inline: true }
    );
  message.channel.send(Embed);
};

module.exports.help = {
  name: "help",
  aliases: ["h", "hlp"],
};
