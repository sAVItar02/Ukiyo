const mongoose = require("mongoose");

const remindSchema = new mongoose.Schema({
  reminders: {
    uid: {
      type: String,
      trim: true,
    },
  },
});