const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("album", albumSchema);