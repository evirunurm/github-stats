const https = require("https");

const username = "evirunurm"
let repos = [];

let amountRepos;
const options = {
	hostname: 'api.github.com',
	path: `https://api.github.com/users/${username}/repos`,
	method: 'GET',
	headers: {
		'user-agent': 'node.js',
		"accept": "application/vnd.github.v3+json"
	},
}

const req = https.request(options, res => {
	let body = '';

	res.on("data", data => {
		body += data.toString("utf8");
	});

	res.on("end", () => {
		countRepos(body);
	});
});

req.on("error", error => {
	console.error(error);
});

req.end();


const countRepos = (data) => {
	data = JSON.parse(data);
	console.log(data)
	data.forEach( repo => {
		repos.push(repo.name);
	});
	amountRepos = repos.length;
	console.log(data)
}
