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
      slug: {
        type: String,
        trim: true,
      },
      anime: {
        type: String,
        trim: true,
      },
      genres: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  ],
  watchLater: [
    {
      slug: {
        type: String,
        trim: true,
      },
      anime: {
        type: String,
        trim: true,
      },
      genres: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  ],
  recommended: [
    {
      recommendedBy: {
        type: String,
        trim: true,
      },
      slug: {
        type: String,
        trim: true,
      },
      anime: {
        type: String,
        trim: true,
      },
      genres: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;
