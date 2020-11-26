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
      anime:{
      type: String,
      trim: true,
      },
      genres:[
        {
        type: String,
        trim: true,
        }
      ]
    },
  ],
  watchLater: [
    {
      anime:{
      type: String,
      trim: true,
      },
      genres:[
        {
        type: String,
        trim: true,
        }
      ]
    },
  ],
  recommended: [
    {
      anime:{
      type: String,
      trim: true,
      },
      genres:[
        {
        type: String,
        trim: true,
        }
      ]
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;
