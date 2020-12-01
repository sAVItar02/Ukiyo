module.exports.run = async (bot, message, args) => {
  message.channel.send('Be a part of the developer team, contribute to the repository with prs')
};

module.exports.help = {
  name: 'develop',
  aliases: ['dev', 'support'],
};
