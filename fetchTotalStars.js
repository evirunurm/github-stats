const https = require("https");
const repo = require("./getRepos");
require("dotenv").config()

const fetchTotalStars = async (user) => {

	let reposObj;
	reposObj = await repo.getRepos(user);
	let stars = 0;

	const getStarsForRepo = async (resolve, reject, repoName) => {

		const options = {
			hostname: 'api.github.com',
			path: `https://api.github.com/repos/${user}/${repoName}/stargazers`,
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				"accept": "application/vnd.github.v3+json",
				"authorization" : `token ${process.env.GITHUB_TOKEN}`
			}
		}

		const req = https.request(options, res => {
			let body = '';

			res.on("data", data => {
				body += data.toString("utf8");
			});

			res.on("end", () => {
				stars += JSON.parse(body).length;
				return resolve(stars);
			});
		});

		req.on("error", error => {
			console.error(error);
		});

		req.end();
	}

	const getStars = async () => {

		let promises = [];


		for (let i = reposObj.repos.length - 1; i >= 0; i--) {
			promises.push(new Promise((resolve, reject) => getStarsForRepo(resolve, reject, reposObj.repos[i])));
		}

		let values = await Promise.all(promises)
		let totalStars = Math.max(...values);
		return totalStars;
		
	}
	return getStars();
}

exports.fetchTotalStars = fetchTotalStars;