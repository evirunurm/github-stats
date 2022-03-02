const express = require("express");
const app = express();
const userData = require("./fetchUserData");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(process.env.PORT, (err) => {
	if (err) throw err;
	console.log("Server running at http://localhost:" + port);
});

app.get("/userdata", async (req, res) => {
	const username = req.query.username;
	const data = await userData.fetchUserData(username);
	res.json(data);
});

