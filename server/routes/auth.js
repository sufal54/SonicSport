const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/users");

router.get("/login", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(200).send({ message: "Invalid Token" });
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);

        if (!decodeValue) {
            return res.status(505).json({ message: "unAuthorized" })
        } else {
            //checking user exists or not
            const userExists = await user.findOne({ "user_id": decodeValue.user_id });
            if (!userExists) {
                newUserData(decodeValue, req, res);
            } else {
                updateNewUserData(decodeValue, req, res);
            }
        }
    } catch (error) {
        return res.status(505).json({ message: "Token Error" });
    }
});

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verfied: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    } catch (error) {
        return res.status(400).json({ message: "Internal Error" });
    }
};

const updateNewUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };
    const option = {
        upsert: true,
        new: true
    };

    try {
         let result = await user.findOneAndUpdate(filter, { auth_time: decodeValue.auth_time }, option);
        res.status(200).send(result);
    } catch (error) {
        return res.status(400).json({ message: "Internal Error" });
    }
};

router.get("/getOne/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let data = await user.findOne(filter);

    if (data) {
        return res.status(200).send(data);
    } else {
        return res.status(400).send("Data Not Found");
    }
});

router.get("/getAll", async (req, res) => {

    let data = await user.find().sort({ createdAt: 1 });

    if (data) {
        return res.status(200).send(data);
    } else {
        return res.status(400).send("Data Not Found");
    }
});

router.put("/update/:id", async (req, res) => {

    let filter = { _id: req.params.id };

    try {
        let result = await user.findOneAndUpdate(filter, {
            name: req.body.name,
            email: req.body.email,
            imageUrl: req.body.picture,
            user_id: req.body.user_id,
            email_verfied: req.body.email_verified,
            role: req.body.role,
            auth_time: req.body.auth_time
        });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(200).send({ msg: "Internal Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    let filter = { _id: req.params.id };

    let result = await user.deleteOne(filter);

    if (result) {
        return res.status(200).send({ msg: "User Deleted" });
    } else {
        return res.status(400).send("Data Not Found");
    }
});

module.exports = router;