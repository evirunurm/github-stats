const userData = require("../scripts/fetchers/fetchLanguages");
const pieChart = require("../scripts/renderers/renderLangPie");
const barChart = require("../scripts/renderers/renderLangPercent");
const { VALID_USERNAME } = require("../scripts/utils/validators");

module.exports = async (req, res) => {
    const username = req.query.username;
    const color = req.query.color;
    const rawPie = req.query.pie;
    const pie = (rawPie !== "false");

    if (!VALID_USERNAME.test(username)) {
        return res.status(400).send('Invalid username');
    }
    if (color !== undefined && color !== "white") {
        return res.status(400).send('Invalid color');
    }
    if (rawPie !== undefined && rawPie !== "true" && rawPie !== "false") {
        return res.status(400).send('Invalid pie');
    }

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
        res.status(500).send("Couldn´t fetch your data. Double-check your username is the same as your GitHubs's. Don't include the '@'. If it still doen't work plase send an email to evelinviru@gmail.com :(");
    }
};