const router = require("express").Router();

//Album Models
const album = require('../models/albums');

router.post("/save", async (req, res) => {
    let newAlbum = album({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    });

    try {
        let saveAlbum = await newAlbum.save();
        return res.status(200).send(saveAlbum);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.get("/getOne/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let result = await album.findOne(filter);
    if (result) {
        return res.status(200).send(result);
    } else {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.get("/getAll", async (req, res) => {
    let result = await album.find();
    if (result) {
        return res.status(200).send(result);
    } else {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.put("/update/:id", async (req, res) => {

    let filter = { _id: req.params.id };

    let option = {
        upsert: true,
        new: true
    };

    try {
        let result = await album.findOneAndUpdate(filter, {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
        },option);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let result = await album.deleteOne(filter);

    if (result) {
        return res.status(200).send({ msg: "Artist Deleted" });
    } else {
        return res.status(400).send("Data Not Found");
    }
});

module.exports = router;