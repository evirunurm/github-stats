const https = require("https");
const querystring = require('querystring');

let page = 1;
let totalPushes = 0;
const baseUrl = '/users/evirunurm/events/public?per_page=100';
const options = {
	hostname: 'api.github.com',
	path: baseUrl + "&page=" + page,
	method: 'GET',
	headers: {
		'user-agent': 'node.js',
		"accept": "application/vnd.github.v3+json"
	},
}


const getData = async (resolve, reject) => {

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
		    getData(resolve, reject, page);
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


const runScript = async () => {
    await new Promise((r, j) => getData(r, j));
    console.log("total", totalPushes); // Return the total number of pushed in the last 90 days.
};


runScript();




const countPushes = (data) => {
	data = JSON.parse(data)
	const pushEvents = data.filter(event => event.type === "PushEvent");
	totalPushes += pushEvents.length;
}