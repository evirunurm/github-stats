const express = require("express");
const app = express();
const userData = require("./utils/fetchUserData");
const card = require("./utils/renderCard");
require("dotenv").config();

// const port = process.env.PORT || 8080;

// app.listen(process.env.PORT, (err) => {
// 	if (err) throw err;
// 	console.log("Server running at http://localhost:" + port);
// });

// app.get("/api/app.js", async (req, res) => {
// 	const username = req.query.username;
// 	const data = await userData.fetchUserData(username);

// 	res.send(card.renderCard(data));
// });

module.exports = async (req, res) => {
	const username = req.query.username;
	const data = await userData.fetchUserData(username);


	// res.setHeader("Content-Type", "image/svg+xml");
	return res.send(card.renderCard(data));
};


