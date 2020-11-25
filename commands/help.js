module.exports.run = async (bot, message, args) => {
    message.channel.send('Konnichiwa UwU\nThis is how you can get started.\n Add an anime to your watchlist by using watching <anime name>.\n Recommend an anime to a user by using recommend <user> <anime name>.\n Add an anime to your watchList by using <add><animeName>.\n You could talk to me if youre lonely too ;)')
  };
  
  module.exports.help = {
    name: 'help',
    aliases: ['h','hlp'],
  };
  