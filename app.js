const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const sendReminder = require("./sendReminder");

const Discord = require("discord.js");
const { send } = require("process");
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

dotenv.config({ path: "./config.env" });

//DB CONNECTION
const DB = process.env.DATABASE_URL.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

//READ COMMAND FILES
fs.readdir("./commands/", (err, files) => {
  if (err) console.error;

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find any commands!");
    return;
  }

  jsfile.forEach((file) => {
    let props = require(`./commands/${file}`);
    console.log(`${file} loaded!`);
    bot.commands.set(props.help.name, props);

    // console.log(bot.commands.get(props.help.name));

    props.help.aliases.forEach((alias) => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

//BOT STUFF

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  sendReminder(bot);
});

bot.on("message", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;

  const prefix = `${process.env.PREFIX || process.env.PREFIX.toUpperCase()} `;

  if (!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  // console.log(args);

  let command;
  let commandFile = bot.commands.get(cmd.slice(prefix.length));

  if (commandFile) commandFile.run(bot, message, args);

  if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
  }
  try {
    command.run(bot, message, args);
  } catch (e) {
    return;
  }
});

bot.login(process.env.BOT_TOKEN);
