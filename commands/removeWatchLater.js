const Data = require('../models/userModel');
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  if (message.mentions.users.first()) {
    message.channel.send("Baka! Don't fiddle with other users anime list! 👿");
    return;
  }

  args = args.map(e => e.charAt(0).toUpperCase() + e.substr(1));
  console.log(args);
  args = args.join(' ');
  console.log(args);

  Data.findOneAndUpdate(
    { uid: user.id },
    { $pull: { watchLater: { anime: args } } },
    async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      message.channel.send(`\`\`\`css\n[${args} was removed]\`\`\``);
    }
  );
};

module.exports.help = {
  name: 'removeWatchLater',
  aliases: ['rwl', 'remwl', 'rmwl'],
};
