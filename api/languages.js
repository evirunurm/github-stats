const userData = require("../scripts/fetchers/fetchLanguages");
const pieChart = require("../scripts/renderers/renderLangPie");
const barChart = require("../scripts/renderers/renderLangPercent");

// FOR DEV PURPOSES
// const express = require("express");
// const app = express();
// app.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("Server running at http://localhost:" + 3000);
// });

// app.get("/api/languages.js", async (req, res) => {
//     const username = req.query.username;
//     const color = req.query.color;
//     const pie = (req.query.pie !== "false");
//     try {
//         const data = await userData.fetchUserData(username);
//         res.setHeader("Content-Type", "image/svg+xml");
//         if (pie) {
//             return res.send(pieChart.renderLanguageCard(data, color));
//         }
//         return res.send(barChart.renderLanguageCard(data, color));
//     } catch (err) {
//         console.log(err);
//         res.send("Couldn´t fetch your data. Double-check your username is the same as your GitHubs's. Don't include the '@'. If it still doen't work plase send an email to evelinviru@gmail.com :(");
//     }
// });

// const data = {
//     user: 'evirunurm',
//     languages: [
//         { name: 'JavaScript', color: '#f1e05a', count: 11 },
//         { name: 'CSS', color: '#563d7c', count: 4 },
//         { name: 'HTML', color: '#e34c26', count: 13 },
//         { name: 'SCSS', color: '#c6538c', count: 2 },
//         { name: 'Java', color: '#b07219', count: 2 },
//         { name: 'Vue', color: '#41b883', count: 4 },
//         { name: 'TypeScript', color: '#2b7489', count: 1 }
//     ]
// }

// FOR PROD
module.exports = async (req, res) => {
    const username = req.query.username;
    const color = req.query.color;
    const pie = (req.query.pie !== "false");

    try {
        const data = await userData.fetchUserData(username);
        const cacheSeconds = 72000;
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
        if (pie) {
            return res.send(pieChart.renderLanguageCard(data, color));
        }
        return res.send(barChart.renderLanguageCard(data, color));
    } catch (err) {
        console.log(err);
        res.send("Couldn´t fetch your data. Double-check your username is the same as your GitHubs's. Don't include the '@'. If it still doen't work plase send an email to evelinviru@gmail.com :(");
    }
};