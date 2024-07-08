const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("artist", artistSchema);