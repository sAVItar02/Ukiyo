const Data = require('./models/reminderModel');
const cron = require('node-cron');

module.exports.scheduler = cron.schedule('* * * * * *', () => {
  const date = new Date(Date.now()).toISOString().split('T')[0];
  Data.find({ date }, async (err, data) => {
    data.forEach(async(e) => {
      let user = await bot.users.fetch(e.uid).catch(e => { console.log(e) });
      // user.send('hi');
      console.log(e.uid);
    });
  }
  );
});
