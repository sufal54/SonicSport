const router = require("express").Router();

//Song Models
const song = require('../models/songs');

router.post("/save", async (req, res) => {
    let newSong = new song({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        songUrl:req.body.songUrl,
        ablum:req.body.album,
        artist:req.body.artist,
        language:req.body.language,
        category:req.body.category
    });

    try {
        let saveSong = await newSong.save();
        return res.status(200).send(saveSong);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.get("/getOne/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let data = await song.findOne(filter);

    if (data) {
        return res.status(200).send(data);
    } else {
        return res.status(400).send("Data Not Found");
    }
});

router.get("/getAll", async (req, res) => {

    let data = await song.find().sort({ createdAt: -1 });

    if (data) {
        return res.status(200).send(data);
    } else {
        return res.status(400).send("Data Not Found");
    }
});

router.put("/update/:id", async (req, res) => {

    let filter = { _id: req.params.id };

    let option = {
        upsert: true,
        new: true
    };

    try {
        let result = await song.findOneAndUpdate(filter, {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            songUrl:req.body.songUrl,
            vote:req.body.vote,
            ablum:req.body.album,
            artist:req.body.artist,
            language:req.body.language,
            category:req.body.category
        },option);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let result = await song.deleteOne(filter);

    if (result) {
        return res.status(200).send({ msg: "Song Deleted" });
    } else {
        return res.status(400).send("Data Not Found");
    }
});

module.exports = router;