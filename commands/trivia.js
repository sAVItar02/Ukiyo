module.exports.run = async (bot, message, args) => {
  s = [
    'The highest grossing anime film of all time is Kimi No Na Wa.\nThis film brought in more than $355 million worldwide.',
    'Eucliwood Hellscyth from Is This a Zombie? has 22 voice actresses in 22 episodes.\nThe character herself is mostly mute.\nHowever, all her speaking lines are all imagined by the protagonist, resulting in different voices for each fantasy.',
    'Ukiyo means the floating world; Living in the moment, detached from the bothers of life',
    'In Japan, it’s common that after someone finishes a manga volume, they’ll just leave it somewhere for someone to pick it up.',
    'For the 31st episode of the anime series Space Brothers, real-life astronaut Akihiko Hoshide made a guest appearance on the show and actually recorded his part aboard the International Space Station (ISS).',
    'The Academy Award for Best Animated Feature usually doesn’t stray away from Disney and Pixar movies, but in 2003, the anime movie Spirited Away won Best Animated Feature at the 75th Academy Awards.',
    'Death Note is banned in china😔',
    'Kubo named the anime Bleach because we bleach our clothes to remove stains and to whiten them, similarly to how soul reapers cleanse or bleach souls.',
    'In Japan, more paper are used to print manga than toilet paper🧻',
    'One of the interesting things about manga is that it is widely read by women.',
    'In Japanese, manga means "Whimsical Pictures".',
    'I was made by Aviral and Shresth',
    'Yoshihiro Togashi, the creator of Hunter X Hunter, is married to the creator of Sailor Moon, Naoko Takeuchi.',
    'The creator of Naruto, Masashi Kishimoto believes the Sound Village is better than the Sand Village.',
    'The first Pokémon ever designed were Rhydon, Clefairy, and Lapras.',
    'Hajime Isayama created Attack On Titan with the ending already decided under the assumption that his editor wouldn\'t let the series be published.',
    'Death Note inspired chinese students to write down their teacher\'s names',
    'People who are generally lonely like to read trivia,',
    'If you thought one piece is long, the longest-running anime has over 7500 episodes.',
    'Everyone in Code Geass loves pizza because pizza hut was its primary sponsor🍕',
    'Average anime animators earn below minimum wage 😥',
    'Pikachu was named from Pika is the japanese word for electricity cracking⚡ and chu is the sound of a mouse',
    'It took Hinata 386 episodes to confess her feelings for Naruto',
  ];
  rand = Math.floor(Math.random() * s.length);
  message.channel.send(`\`\`\`${s[rand]}\`\`\``);
};

module.exports.help = {
  name: 'trivia',
  aliases: ['f', 'facts', 'fact', 'bored', 'trivia', 'easter-eggs'],
};
