const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        songUrl: {
            type: String,
            require: true
        },
        vote: {
            type: Number,
            default:0
        },
        ablum: {
            type: String,
        },
        artist: {
            type: String,
            require: true
        },
        language: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("song", songSchema);