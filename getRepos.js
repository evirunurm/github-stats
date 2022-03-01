const https = require("https");
require("dotenv").config()

const getRepos = async (user) => {
	let repos = [];
	let amountRepos;
	
	const options = {
		hostname: 'api.github.com',
		path: `https://api.github.com/users/${user}/repos`,
		method: 'GET',
		headers: {
			'user-agent': 'node.js',
			"accept": "application/vnd.github.v3+json",
			"authorization" : `token ${process.env.GITHUB_TOKEN}`
		}
	}

	const request = (resolve, reject) => {
		const req = https.request(options, res => {
			let body = '';

			res.on("data", data => {
				body += data.toString("utf8");
			});

			res.on("end", () => {
				body = JSON.parse(body);
				if (Object.keys(body).length === 2) {
					console.log(body)
					console.log("Limit exceeded");
				}
				countRepos(body);
				return resolve();
			});
		});

		req.on("error", error => {
			console.error(error);
		});

		req.end();
	}

	const countRepos = (data) => {
		
		try {
			data.forEach( repo => {
				repos.push(repo.name);
			});
		} catch(e) {
			console.log(e)
		}
		amountRepos = repos.length;
	}

	await new Promise((resolve, reject) => request(resolve, reject));
	return {
		repos,
		amountRepos
	}
};


exports.getRepos = getRepos;
