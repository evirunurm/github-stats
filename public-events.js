const https = require("https");
const querystring = require('querystring');

const baseUrl = '/users/evirunurm/events/public?per_page=100'



const options = {
	hostname: 'api.github.com',
	path: '/users/evirunurm/events/public?per_page=100',
	method: 'GET',
	headers: {
		'user-agent': 'node.js',
		"accept": "application/vnd.github.v3+json"
	},
}


let body = '';

const req = https.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`)

	res.on('data', d => {
		body += d.toString('utf8');
		// process.stdout.write(d)
	})

	res.on("end", () => {
		
	})

})

req.on('error', error => {  
	console.error(error)
})


req.end()



function countPushes(data) {
	data = JSON.parse(data)
	console.log("total: ", data.length)
	const pushEvents = data.filter(event => event.type === "PushEvent");
	console.log(pushEvents)
	console.log(pushEvents.length)

}