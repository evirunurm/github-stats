const https = require("https");
require("dotenv")
	.config();

const fetchUserData = async (user) => {
	const headers = {
		'user-agent': 'Github-Stats',
		"Authorization": `Bearer ${ process.env.GITHUB_TOKEN }`,
		"Content-Type": "application/json",
		'Accept': 'application/json',
	};

	const query = `{
user(login:"${ user }"){
repositories(first:100,privacy:PUBLIC,ownerAffiliations:OWNER){
edges{
node{
forkCount
stargazerCount
languages(first: 10){
edges {
node {
color
}
}
}
}
}
}
contributionsCollection{
contributionCalendar{
totalContributions
}
}
followers{
totalCount
}
}
}`;

	const options = {
		hostname: 'api.github.com',
		path: 'https://api.github.com/graphql',
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: headers,
	};

	const request = (resolve, reject) => {
		const req = https.request(options, res => {
			let body = "";

			res.on("data", (d) => {
				body += d;
			});

			res.on("end", () => {
				console.log(body)
				resolve(JSON.parse(body));
			});
		});

		req.on("error", (error) => {
			console.log(error);
			reject(error);
		});

		req.write(JSON.stringify({ query }));
		req.end();
	}

	const getDataObj = (json) => {
		let dataObj = {
			user: user,
			amountFollowers: json.data.user.followers.totalCount,
			amountRepos: json.data.user.repositories.edges.length,
			amountStars: countProperty(json.data.user.repositories.edges, "stargazerCount"),
			amountForks: countProperty(json.data.user.repositories.edges, "forkCount"),
			totalContributions: json.data.user.contributionsCollection.contributionCalendar.totalContributions,
			languages: countLanguages(json.data.user.repositories.edges)
		}
		return dataObj;
	}

	const countProperty = (nodes, property) => {
		return Object.values(nodes)
			.reduce((t, { node }) => t + node[property], 0);
	}

	const countLanguages = (nodes) => {
		let languages = []
		nodes.forEach((node, index) => {
			let languagesInRepo = node.node.languages.edges.reduce((acc, node) => {
				languages.push(node.node.color)
			}, "");
		});

		languages = languages.reduce((acc, repo) => ({
			...acc,
			[repo]: (acc[repo] || 0) + 1
		}), 0);

		return languages
	}

	let data = await new Promise((resolve, reject) => request(resolve, reject));
	// Example json for testing purposes :
	// const data = {
	// user: 'evirunurm',
	// amountFollowers: 7,
	// amountRepos: 17,
	// amountStars: 4,
	// amountForks: 2,
	// totalContributions: 447,
	// languages: {
	// 	'#f1e05a': 11,
	// 	'#563d7c': 4,
	// 	'#e34c26': 13,
	// 	'#c6538c': 2,
	// 	'#b07219': 2,
	// 	'#41b883': 4,
	// 	'#2b7489': 1
	// }
	return getDataObj(data);
}

exports.fetchUserData = fetchUserData;