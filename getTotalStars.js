const https = require("https");
const repo = require("./getRepos");
require("dotenv").config()

const getTotalStars = async (user) => {

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
				return resolve();
			});
		});

		req.on("error", error => {
			console.error(error);
		});

		req.end();
	}

	const getStars = async () => {

		// reposObj.repos.forEach( async (repoName, index) => {
		// 	await new Promise((resolve, reject) => getStarsForRepo(resolve, reject, repoName));
		// 	if (reposObj.repos.length === index + 1) {
		// 	}
		// });

		for (let i = reposObj.repos.length - 1; i >= 0; i--) {
			new Promise((resolve, reject) => getStarsForRepo(resolve, reject, reposObj.repos[i])).then(() => {
				console.log("stars: ", stars)
			});
		}
	}
	return getStars();
}



async function foo() {
	let stars = await getTotalStars("evirunurm");
	console.log(stars)
}


foo();