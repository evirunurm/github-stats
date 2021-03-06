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
					languages (first:10) {
						edges{
							node {
								name
								color
							}
						}
					}
				}
			}
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
			languages: countLanguages(json.data.user.repositories.edges)
		}
		return dataObj;
	}

	const countLanguages = (edges) => {
		let languages = [];
		let index;

		// Iterate through each repository
		edges.forEach(function(repoEdge, index) {
			// Iterate through each language
			repoEdge.node.languages.edges.forEach(function(languageEdge, index) {
				index = languages
					.map((obj) => { return obj.name })
					.indexOf(languageEdge.node.name);
				if (index > -1) {
					languages[index].count++;
					return;
				}
				languages.push({
					name: languageEdge.node.name,
					color: languageEdge.node.color,
					count: 1
				});
			});
		});

		// [
		// 	{ name: "JavaScript", color: "#xxxxx", count: 1 },
		// 	{ name: "HTML", color: "#xxxxx", count: 5 },
		// 	{ name: "CSS", color: "#xxxxx", count: 10 },
		// ]
		return languages
	}

	// PROD
	let data = await new Promise((resolve, reject) => request(resolve, reject));

	// DEV :
	// let data = JSON.parse(`{"data":{"user":{"repositories":{"edges":[{"node":{"languages":{"edges":[{"node":{"name":"JavaScript","color":"#f1e05a"}},{"node":{"name":"CSS","color":"#563d7c"}},{"node":{"name":"HTML","color":"#e34c26"}}]}}},{"node":{"languages":{"edges":[]}}},{"node":{"languages":{"edges":[{"node":{"name":"CSS","color":"#563d7c"}},{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"JavaScript","color":"#f1e05a"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"JavaScript","color":"#f1e05a"}},{"node":{"name":"SCSS","color":"#c6538c"}},{"node":{"name":"HTML","color":"#e34c26"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"JavaScript","color":"#f1e05a"}},{"node":{"name":"HTML","color":"#e34c26"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"Java","color":"#b07219"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"Vue","color":"#41b883"}},{"node":{"name":"JavaScript","color":"#f1e05a"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"Vue","color":"#41b883"}},{"node":{"name":"JavaScript","color":"#f1e05a"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"Vue","color":"#41b883"}},{"node":{"name":"JavaScript","color":"#f1e05a"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"Vue","color":"#41b883"}},{"node":{"name":"TypeScript","color":"#2b7489"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"JavaScript","color":"#f1e05a"}},{"node":{"name":"SCSS","color":"#c6538c"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"JavaScript","color":"#f1e05a"}},{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"CSS","color":"#563d7c"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"HTML","color":"#e34c26"}},{"node":{"name":"CSS","color":"#563d7c"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"Java","color":"#b07219"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"JavaScript","color":"#f1e05a"}}]}}},{"node":{"languages":{"edges":[{"node":{"name":"JavaScript","color":"#f1e05a"}},{"node":{"name":"HTML","color":"#e34c26"}}]}}}]}}}}`)
	return getDataObj(data);
}


// PROD
exports.fetchUserData = fetchUserData;