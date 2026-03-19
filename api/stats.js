const userData = require("../scripts/fetchers/fetchUserData");
const card = require("../scripts/renderers/renderStatCard");
const { renderErrorCard } = require("../scripts/renderers/renderErrorCard");
const { VALID_USERNAME } = require("../scripts/utils/validators");
const { CACHE_DURATION_SECONDS } = require("../scripts/utils/constants");

module.exports = async (req, res) => {
    const username = req.query.username;
    const color = req.query.color;
    const rawPeng = req.query.peng;
    const peng = (rawPeng !== "false");

    if (!VALID_USERNAME.test(username)) {
        return res.status(400).send('Invalid username');
    }
    if (color !== undefined && color !== "white") {
        return res.status(400).send('Invalid color');
    }
    if (rawPeng !== undefined && rawPeng !== "true" && rawPeng !== "false") {
        return res.status(400).send('Invalid peng');
    }

    try {
        const data = await userData.fetchUserData(username);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION_SECONDS}`);
        return res.send(card.renderStatCard(data, color, peng));
    } catch (err) {
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(500).send(renderErrorCard("Could not fetch data"));
    }
};