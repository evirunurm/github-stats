const https = require("https");
require("dotenv").config()


// Escaping ENTER's with \ everywhere, except where it's needed (forkCount, stargazerCount)

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
		console.log(error)
	})

	req.write(JSON.stringify({query}));
	req.end()
	}

	const getDataObj = (json) => {
		let dataObj = {
			user: user,
			amountRepos: json.data.user.repositories.edges.length,
			amountStars: countProperty(json.data.user.repositories.edges, "stargazerCount"),
			amountForks: countProperty(json.data.user.repositories.edges, "forkCount"),
			amountFollowers: json.data.user.followers.totalCount,
			totalContributions: json.data.user.contributionsCollection.contributionCalendar.totalContributions,
		}
		return dataObj;
	} 

	const countProperty = (nodes, property) => {
		return Object.values(nodes).reduce((t, {node}) => t + node[property], 0)
	}

	let data = await new Promise( (resolve, reject) => request(resolve, reject));
	return getDataObj(data);
}


async function foo() {
	let data = await fetchUserData("evirunurm");
	console.log(JSON.stringify(data))
}

foo();