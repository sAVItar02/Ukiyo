const mongoose = require("mongoose");

const remindSchema = new mongoose.Schema({
  reminders: {
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
  },
});

const reminder = mongoose.model("reminders", remindSchema);
module.exports = reminder;
