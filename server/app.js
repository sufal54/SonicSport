const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv/config");

app.use(cors({ origin: true }));
app.use(express.json());

//user authentication route

const userRoute = require("./routes/auth");
app.use("/api/users/",userRoute);

//Artist Routes
const artistsRoute = require("./routes/artists");
app.use("/api/artist/",artistsRoute);

//Album Routes
const albumsRoute = require("./routes/albums");
app.use("/api/album/",albumsRoute);

//Song Routes
const songsRoute = require("./routes/songs");
app.use("/api/song/",songsRoute);

const main = async () => {
     mongoose.connect(process.env.BACKEND_DATABASE, { useNewUrlParser: true }).then(()=>console.log("Database connected"))
}

main()

app.listen(4000, () => {
    console.log("Server is Started");
});
