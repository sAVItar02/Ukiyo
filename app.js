const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Discord = require('discord.js');
const bot = new Discord.client();

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

bot.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

bot.login(process.env.token);
