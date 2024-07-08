const router = require("express").Router();

//Artist Models
const artist = require('../models/artists');

router.post("/save", async (req, res) => {
    let newArtist = artist({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    });

    try {
        let saveArtist = await newArtist.save();
        return res.status(200).send(saveArtist);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.get("/getOne/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let data = await artist.findOne(filter);

    if (data) {
        return res.status(200).send(data);
    } else {
        return res.status(400).send("Data Not Found");
    }
});

router.get("/getAll", async (req, res) => {

    let data = await artist.find().sort({ createdAt: 1 });

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
        let result = await artist.findOneAndUpdate(filter, {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
        },option);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let result = await artist.deleteOne(filter);

    if (result) {
        return res.status(200).send({ msg: "Artist Deleted" });
    } else {
        return res.status(400).send("Data Not Found");
    }
});

module.exports = router;