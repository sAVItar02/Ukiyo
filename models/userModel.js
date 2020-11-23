const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        trim: true,
    },
    watchList: [{
        anime: {
            type: String,
            trim: true,
        }
    }],
    watchLater:[{
        anime: {
            type: String,
            trim: true,
        }
    }],
    recommended:[{
        anime: {
            type: String,
            trim: true,
        }
    }]
});
