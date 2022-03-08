const userData = require("./utils/fetchUserData");
const card = require("./utils/renderStatCard");

// FOR DEBUGGING PURPOSES
// const express = require("express");
// const app = express();
// app.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("Server running at http://localhost:" + 3000);
// });

// app.get("/api/app.js", async (req, res) => {
//     const username = req.query.username;

// });

// languages(first: 10) {
// edges {
// node {
// color
// }
// }
// }

module.exports = async (req, res) => {
    const username = req.query.username;
    try {
        const data = await userData.fetchUserData(username);
        res.setHeader("Content-Type", "image/svg+xml");
        return res.send(card.renderStatCard(data));
    } catch (err) {
        res.send("Couldn´t fetch your data. Double-check your username is the same as your GitHubs's. Don't include the '@'. If it still doen't work plase send an email to evelinviru@gmail.com :(");
    }
};