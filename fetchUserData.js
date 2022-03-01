const https = require("https");

const fetchUserData = async (user) => {

	let body = '';
	const options = {
		hostname: 'api.github.com',
		path: `/users/${ user }`,
		method: 'GET',
		headers: {
			'user-agent': 'node.js'
		}
	}

	const request = async (resolve, reject) => {
		const req = https.request(options, res => {
	 
		res.on('data', d => {
			body += d.toString('utf8');
		});

		res.on("end", () => {
			resolve();
		});
	});

	req.on('error', error => {  
		console.error(error)
	});

	req.end();
	}
	
	await new Promise((r, j) => request(r, j));
	return body;
}

exports.fetchUserData = fetchUserData;