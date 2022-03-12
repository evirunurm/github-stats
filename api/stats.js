const userData = require("./utils/fetchUserData");
const card = require("./utils/renderStatCard");

// FOR DEV PURPOSES
// const express = require("express");
// const app = express();
// app.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("Server running at http://localhost:" + 3000);
// });

// app.get("/api/stats.js", async (req, res) => {
//     const username = req.query.username;
//     const color = req.query.color;
//     const peng = (req.query.peng !== "false");
//     try {
//         const data = await userData.fetchUserData(username);
//         res.setHeader("Content-Type", "image/svg+xml");
//         return res.send(card.renderStatCard(data, color, peng));
//     } catch (err) {
//         console.log(err);
//         res.send("Couldn´t fetch your data. Double-check your username is the same as your GitHubs's. Don't include the '@'. If it still doen't work plase send an email to evelinviru@gmail.com :(");
//     }
// });

module.exports = async (req, res) => {
    const username = req.query.username;
    const color = req.query.color;
    const peng = (req.query.peng !== "false");

    try {
        const data = await userData.fetchUserData(username);
        const cacheSeconds = 72000;
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
        return res.send(card.renderStatCard(data, color, peng));
    } catch (err) {
        res.send("Couldn´t fetch your data. Double-check your username is the same as your GitHubs's. Don't include the '@'. If it still doen't work plase send an email to evelinviru@gmail.com :(");
    }
};