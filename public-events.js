const https = require("https");

const options = {
	hostname: 'api.github.com',
	path: '/users/evirunurm/events/public',
	method: 'GET',
	headers: {
		'user-agent': 'node.js'
	}
}

let body = '';

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
 

	res.on('data', d => {
		body += d.toString('utf8');
		// process.stdout.write(d)
	})

	res.on("end", () => {
		countPushes(body);
	})

})

req.on('error', error => {  
	console.error(error)
})


req.end()



function countPushes(data) {
	data = JSON.parse(data)

	const pushEvents = data.filter(event => event.type === "PushEvent");
	console.log(pushEvents)
	console.log(pushEvents.length)

}