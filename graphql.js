const https = require("https");
require("dotenv").config()

const user = "evirunurm";

var headers = {
	'user-agent': 'node.js',
    "Authorization": `Bearer ${ process.env.GITHUB_TOKEN }`,
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

// var query = `'query':{\
// 	user(login:'evirunurm'){\
// 	repositories(first:100, privacy:PUBLIC){\
// 	totalCount\
// 	edges {\
// 	node {\
// 	forkCount\
// 	stargazerCount\
// 	}\
// 	}\
// 	}\
// 	contributionsCollection {\
// 	contributionCalendar {\
// 	totalContributions\
// 	}\
// 	}\
// 	followers {\
// 	totalCount\
// 	}\
// 	}\
// }`

const query = `{\
user(login:"evirunurm"){\
repositories(first:100,privacy:PUBLIC){\
edges{\
node{\
forkCount
stargazerCount\
}\
}\
}\
contributionsCollection{\
contributionCalendar{\
totalContributions\
}\
}\
followers{\
totalCount\
}\
}\
}`


// var options = {
// 	hostname: 'api.github.com',
//     path: 'https://api.github.com/graphql',
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify({query})
// };

// const req = https.request(options, res => {

// 	console.log(res.statusCode);
// 	let body = "";

// 	res.on("data", (d) => {
// 		body += d;
// 	});

// 	res.on("end", () => {
// 		console.log(body)
// 	});
// });

// req.on("error", (error) => {
// 	console.log("error")
// 	console.log(error)
// })


// req.end()

console.log(JSON.stringify({query}))

var options = {
	hostname: 'api.github.com',
    path: 'https://api.github.com/graphql',
    method: 'POST',
    body: JSON.stringify({query}),
    headers: headers,
};

const req = https.request(options, res => {

	console.log(res.statusCode);
	let body = "";

	res.on("data", (d) => {
		body += d;
	});

	res.on("end", () => {
		console.log(body)
	});
});

req.on("error", (error) => {
	console.log("error")
	console.log(error)
})

req.write(JSON.stringify({query}));

req.end()