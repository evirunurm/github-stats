const https = require("https");

const options = {
	hostname: 'api.github.com',
	path: '/users/evirunurm',
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
		console.log("Body: ", body)
	})

})

req.on('error', error => {  
	console.error(error)
})


req.end()