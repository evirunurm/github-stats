const repo = require("./getRepos");

async function foo() {
	let repositors  = await repo.getRepos("evirunurm");
	console.log(repositors)
}


foo();