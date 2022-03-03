const https = require("https");
require("dotenv").config();

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
name
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
	    body: JSON.stringify({query}),
	    headers: headers,
	};

	const request = (resolve, reject) => {
		const req = https.request(options, res => {
			let body = "";

			res.on("data", (d) => {
				body += d;
			});

			res.on("end", () => {
				resolve(JSON.parse(body));
			});
		});

		req.on("error", (error) => {
			console.log(error);
			reject(error);
		});

		req.write(JSON.stringify({query}));
		req.end();
	}

	const getDataObj = (json) => {
		let dataObj = {
			user: user,
			amountRepos: json.data.user.repositories.edges.length,
			amountStars: countProperty(json.data.user.repositories.edges, "stargazerCount"),
			amountForks: countProperty(json.data.user.repositories.edges, "forkCount"),
			amountFollowers: json.data.user.followers.totalCount,
			totalContributions: json.data.user.contributionsCollection.contributionCalendar.totalContributions,
			languages: countLanguages(json.data.user.repositories.edges)
		}
		return dataObj;
	} 

	const countProperty = (nodes, property) => {
		return Object.values(nodes).reduce((t, {node}) => t + node[property], 0);
	}

	const countLanguages = (nodes) => {
		let languages = []
		nodes.forEach((node, index) => {
			let languagesInRepo = node.node.languages.edges.reduce((acc, node) => {
				languages.push(node.node.name)
			}, "");
		});

		languages = languages.reduce((acc, repo) => ({
			...acc,
			[repo]: (acc[repo] || 0) + 1
		}), 0);

		return languages
	}

	let data = await new Promise( (resolve, reject) => request(resolve, reject));
	// Example json for testing purposes :
	// let data = {"data":{"user":{"repositories":{"edges":[{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"JavaScript"}},{"node":{"name":"CSS"}},{"node":{"name":"HTML"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"CSS"}},{"node":{"name":"HTML"}},{"node":{"name":"JavaScript"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"HTML"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"JavaScript"}},{"node":{"name":"SCSS"}},{"node":{"name":"HTML"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"JavaScript"}},{"node":{"name":"HTML"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"Java"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"HTML"}},{"node":{"name":"Vue"}},{"node":{"name":"JavaScript"}}]}}},{"node":{"forkCount":2,"stargazerCount":4,"languages":{"edges":[{"node":{"name":"HTML"}},{"node":{"name":"Vue"}},{"node":{"name":"JavaScript"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"HTML"}},{"node":{"name":"Vue"}},{"node":{"name":"JavaScript"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"HTML"}},{"node":{"name":"Vue"}},{"node":{"name":"TypeScript"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"HTML"}},{"node":{"name":"JavaScript"}},{"node":{"name":"SCSS"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"JavaScript"}},{"node":{"name":"HTML"}},{"node":{"name":"CSS"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"HTML"}},{"node":{"name":"CSS"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"Java"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"JavaScript"}}]}}},{"node":{"forkCount":0,"stargazerCount":0,"languages":{"edges":[{"node":{"name":"JavaScript"}},{"node":{"name":"HTML"}}]}}}]},"contributionsCollection":{"contributionCalendar":{"totalContributions":441}},"followers":{"totalCount":7}}}}
	return getDataObj(data);
}

exports.fetchUserData = fetchUserData;