const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
    const Embed = new discord.MessageEmbed()
      .setAuthor('Konnichiwa!')
      .setColor('#FFFE00')
      .setTitle('Help')
      .setDescription('Some commands for your help 💥')
      .addFields(
        { name: '👓Recommend', value: `\`uki help recommend\``, inline: true },
        { name: '🍿Watch Later', value: `\`uki help wlater\``, inline: true },
        { name: '✨Watching Now', value: `\`uki help watch\``, inline: true },
        { name: '🔍Anime', value: `\`uki help desc\``, inline: true },
        { name: '❓Trivia', value: `\`uki trivia\``, inline: true },
        { name: '🏓Ping?', value: `\`uki ping\``, inline: true },
        {
          name: '🔴 Remove recommended',
          value: `\`uki help remrec\``,
          inline: true,
        },
        {
          name: '🛑 Remove watch later',
          value: `\`uki help remwl\``,
          inline: true,
        },
        {
          name: '⛔ Remove watching',
          value: `\`uki help remw\``,
          inline: true,
        },
        {
          name: '🔥 Check Trending',
          value: `\`uki help trend\``,
          inline: true,
        },
        { name: '🆕 Upcoming ', value: `\`uki help new\``, inline: true },
        { name: '🔖 Genre ', value: `\`uki help genre\``, inline: true },
        { name: '🎋 Random ', value: `\`uki help random\``, inline: true },
        { name: '⏰ Reminder ', value: `\`uki help reminder\``, inline: true },
        { name: '💻 Develop ', value: `\`uki help develop\``, inline: true }
      );
    message.channel.send(Embed);
  } else if (args[0] === 'recommend') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('👓Recommend commands!')
      .setDescription(
        "For recommending a user: `uki <alias> <anime> <@user>` \n\n For viewing a user's list: `uki <alias> <@user>(optional)`"
      )
      .addFields(
        {
          name: '🙌Recommend anime to someone',
          value: 'Aliases: `r`, `rec`, `rmd`',
        },
        {
          name: '🕵️‍♂️View recommended anime list',
          value: 'Aliases: `vrl`, `vrecl`, `vreclist`',
        }
      );
    message.channel.send(embed);
  } else if (args[0] === 'wlater') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('⏲Watch Later commands!')
      .setDescription(
        "For adding to watch later: `uki <alias> <anime>` \n\n For viewing a user's list: `uki <alias> <@user>(optional)`"
      )
      .addFields(
        {
          name: '➕Add anime to watch later',
          value: 'Aliases: `wlater`, `wl`, `l`',
        },
        {
          name: '🔎View watch later list',
          value: 'Aliases: `vwl`, `vwlater`, `vwatchl`',
        }
      );
    message.channel.send(embed);
  } else if (args[0] === 'watch') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('😎Watching commands!')
      .setDescription(
        "For adding to watching list: `uki <alias> <anime>` \n\n For viewing a user's list: `uki <alias> <@user>(optional)`"
      )
      .addFields(
        {
          name: 'Add anime to watching list',
          value: 'Aliases: `w`, `seeing`, `watch`, `add`',
        },
        {
          name: '🔎View watching list',
          value: 'Aliases: `vnow`, `vcurrent`, `vwatchnow`',
        }
      );
    message.channel.send(embed);
  } else if (args[0] === 'desc') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('📜Describe commands!')
      .setDescription('For getting anime details: `uki <alias> <anime>`')
      .addFields({
        name: '✍Describe any anime',
        value: 'Aliases: `describe`, `desc`, `d`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'remrec') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('❗Removing commands!')
      .setDescription('For removing from recommended: `uki <alias> <anime>`')
      .addFields({
        name: '🟥Remove from recommended',
        value: 'Aliases: `rrec`, `remrec`, `rmr`, `rr`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'remw') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('❗Removing commands!')
      .setDescription('For removing from watching: `uki <alias> <anime>`')
      .addFields({
        name: '🟥Remove from watching list',
        value: 'Aliases: `rw`, `remw`, `rmw`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'remwl') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('❗Removing commands!')
      .setDescription('For removing from watch later: `uki <alias> <anime>`')
      .addFields({
        name: '🟥Remove from watch later',
        value: 'Aliases: `remwl`, `rmwl`, `rwl`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'trend') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('🤓Weebs looking for something new!')
      .setDescription(
        'To check the trending anime: `uki <alias> <number>(optional)`\n Number lets you decide how many anime you want to see'
      )
      .addFields({
        name: "🔥Check what's trending",
        value: 'Aliases: `trend`, `trending`, `hot`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'upcoming') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('🤓Weebs looking for something new!')
      .setDescription(
        'To check the upcoming anime: `uki <alias> <number>(optional)`\n Number lets you decide how many anime you want to see'
      )
      .addFields({
        name: "🆕Check what's upcoming",
        value: 'Aliases: `releasing`, `soon`, `new`, `upcoming`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'genre') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('🤓Weebs looking for something new!')
      .setDescription(
        'To find an anime of a genre: `uki <alias> <number>(optional)`\n Number lets you decide how many anime you want to see'
      )
      .addFields({
        name: '🔎Find an anime in this genre',
        value: 'Aliases: `genre`, `type`, `category`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'random') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle('🤓Weebs looking for something new!')
      .setDescription('To find an anime of a genre: `uki <alias>`')
      .addFields({
        name: '🎋Get a random anime',
        value: 'Aliases: `random`',
      });
    message.channel.send(embed);
  } else if (args[0] === 'reminder') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle(
        ":reminder_ribbon: Can't remember when the next episode will air?"
      )
      .setDescription('To set reminder for anime episode: `uki <alias> <anime>`')
      .addFields({
        name: '⏰Set reminder',
        value: 'Aliases:  `remindme`, `addreminder`, `addrem`, `rem`, `reminder`',
      });
    message.channel.send(embed);
  }
  else if (args[0] === 'develop') {
    const embed = new discord.MessageEmbed()
      .setColor('#FFFE00')
      .setTitle(
        "💻 Want to help make the bot better?"
      )
      .setDescription('To get the github repo link: `uki <alias>`')
      .addFields({
        name: '💁‍♂️Develop with us',
        value: 'Aliases:  `dev`, `develop`, `support`',
      });
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: 'help',
  aliases: ['h', 'hlp'],
};
