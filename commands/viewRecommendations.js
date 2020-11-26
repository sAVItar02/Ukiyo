const Data = require('../models/userModel');
const discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports.run = async (bot, message, args) => {
  let user;
  let pages = [];
  if (args[0] && args[0].startsWith('<@')) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }

  Data.findOne({ uid: user.id }, async (err, data) => {
    if (!data) {
      message.channel.send(
        "User hasn't added anything yet. Maybe you can help change that 💭"
      );
      return;
    } else {
      const recmd = data.recommended;
      let embed = new discord.MessageEmbed();
      for (i = 0; i < recmd.length; ) {
        if (i != 0 && i % 5 == 0) {
          pages.push(embed);
          embed = new discord.MessageEmbed();
        }
        embed
        .setColor('#9966cc')
        .addField(`${i + 1}. ${recmd[i++]}`, '____________');
      }
      pages.push(embed);
    }
    // console.log(pages);
    const emojiList = ['⏮', '⏭'];
    const timeOut = 200000;
    pagination(message, pages, emojiList, timeOut);
  });
};

module.exports.help = {
  name: 'viewRecommendationList',
  aliases: ['vrl', 'view-rl', 'vreclist', 'vrecl'],
};
