const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  uid: {
    type: String,
    required: true,
    trim: true,
  },
  watchList: [
    {
      type: String,
      trim: true,
    },
  ],
  watchLater: [
    {
      type: String,
      trim: true,
    },
  ],
  recommended: [
    {
      type: String,
      trim: true,
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;
