require("dotenv").config();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const tmi = require("tmi.js");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const blacklist = ["netyanbot", "Mikuia", "Nightbot"];

const tmiClient = new tmi.client({
    channels: ["netyann"],
});
tmiClient.connect();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.log(err);
    }
};
connectDB();

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    activityMeter: {
        type: Number,
        default: 0,
    },
    experience: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    },
    progress: {
        type: Number,
        default: 0,
    },
});
const User = new mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

setInterval(async () => {
    const users = await User.find({ activityMeter: { $gte: 1 } });

    for (let i = 0; i < users.length; i++) {
        User.findOneAndUpdate(
            { nickname: users[i].nickname },
            { $inc: { activityMeter: -1, experience: Math.floor(Math.random() * 2 + 4) } }
        ).exec();
    }
}, 60000);

tmiClient.on("message", async (channel, tags, message, self) => {
    if (blacklist.includes(tags["display-name"])) return;
    fetch("https://api.twitch.tv/helix/streams?user_login=netyann", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "Client-Id": process.env.CLIENT_ID,
        },
    })
        .then((response) => response.json())
        .then(async (result) => {
            if (result.data.length > 0) {
                const duplicate = await User.findOne({ nickname: tags["display-name"] }).exec();
                if (duplicate) {
                    duplicate.activityMeter = 10;
                    await duplicate.save();
                    return;
                } else {
                    const newUser = new User({
                        nickname: tags["display-name"],
                        activityMeter: 10,
                        experience: 0,
                        level: 1,
                        progress: 0,
                    });
                    await newUser.save();
                }
            }
        });
});

app.get("/top", async (req, res) => {
    const repo = await User.find();
    res.send(repo);
});

app.get("/avatar", async (req, res) => {
    fetch("https://api.twitch.tv/helix/users?login=netyann", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "Client-Id": process.env.CLIENT_ID,
        },
    })
        .then((response) => response.json())
        .then((result) => {
            res.send(result.data[0].profile_image_url);
        });
});

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
