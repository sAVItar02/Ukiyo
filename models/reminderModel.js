const mongoose = require("mongoose");

const remindSchema = new mongoose.Schema({
  uid: {
    type: String,
    trim: true,
  },
  anime: {
    episode: {
      type: Number,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
  },
  date: {
    type: Date,
    trim: true,
  },
});

const reminder = mongoose.model("reminder", remindSchema);
module.exports = reminder;
