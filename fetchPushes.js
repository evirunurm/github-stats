const https = require("https");

const fetchPushes = async (user) => {

	let page = 1;
	let totalPushes = 0;
	const baseUrl = `/users/${user}/events/public?per_page=100`;
	const options = {
		hostname: 'api.github.com',
		path: baseUrl + "&page=" + page,
		method: 'GET',
		headers: {
			'user-agent': 'node.js',
			"accept": "application/vnd.github.v3+json"
		},
	}

	const getEvents = async (resolve, reject) => {
		 const req = https.request(options, res => {
			let body = '';

			res.on('data', d => {
				body += d.toString('utf8');
			});

			res.on("end", () => {
				countPushes(body);
				page++;

				if (page <= 3) {
					options.path = baseUrl + "&page=" + page
			    getEvents(resolve, reject, page);
			  } else {
			    return resolve();
			  }

			});
		});

		req.on('error', error => {  
			console.error(error)
		});

		req.end();
	}

	const countPushes = (data) => {
		data = JSON.parse(data)
		const pushEvents = data.filter(event => event.type === "PushEvent");
		totalPushes += pushEvents.length;
	}

	await new Promise((r, j) => getEvents(r, j));
	return totalPushes;
}

exports.fetchPushes = fetchPushes;