const userData = require("../scripts/fetchers/fetchLanguages");
const pieChart = require("../scripts/renderers/renderLangPie");
const barChart = require("../scripts/renderers/renderLangPercent");
const { renderErrorCard } = require("../scripts/renderers/renderErrorCard");
const { VALID_USERNAME } = require("../scripts/utils/validators");
const { CACHE_DURATION_SECONDS } = require("../scripts/utils/constants");

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
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION_SECONDS}`);
        if (pie) {
            return res.send(pieChart.renderLanguageCard(data, color));
        }
        return res.send(barChart.renderLanguageCard(data, color));
    } catch (err) {
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(500).send(renderErrorCard("Could not fetch data"));
    }
};