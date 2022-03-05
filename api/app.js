const express = require("express");
const app = express();
const userData = require("./fetchUserData");
const card = require("./renderCard");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.listen(process.env.PORT, (err) => {
	if (err) throw err;
	console.log("Server running at http://localhost:" + port);
});

app.get("/userdata", async (req, res) => {
	const username = req.query.username;
	const data = await userData.fetchUserData(username);

	res.send(card.renderCard(data));
});

