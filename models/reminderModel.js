const mongoose = require('mongoose');

const remindSchema = new mongoose.Schema({
  uid: {
    type: String,
    trim: true,
  },
  anime: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    trim: true,
  },
});

const reminder = mongoose.model('reminder', remindSchema);
module.exports = reminder;
