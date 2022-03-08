const https = require("https");
require("dotenv").config()

const fetchUserData = async (user) => {
    let body = '';
    const options = {
        hostname: 'api.github.com',
        path: `/users/${ user }`,
        method: 'GET',
        headers: {
            'user-agent': 'node.js',
            "accept": "application/vnd.github.v3+json",
            "authorization": `token ${process.env.GITHUB_TOKEN}`
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
            "accept": "application/vnd.github.v3+json",
            "authorization": `token ${process.env.GITHUB_TOKEN}`
        }
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

const fetchRepos = async (user) => {
    let repos = [];
    let amountRepos;

    const options = {
        hostname: 'api.github.com',
        path: `https://api.github.com/users/${user}/repos`,
        method: 'GET',
        headers: {
            'user-agent': 'node.js',
            "accept": "application/vnd.github.v3+json",
            "authorization": `token ${process.env.GITHUB_TOKEN}`
        }
    }

    const request = (resolve, reject) => {
        const req = https.request(options, res => {
            let body = '';

            res.on("data", data => {
                body += data.toString("utf8");
            });

            res.on("end", () => {
                body = JSON.parse(body);
                if (Object.keys(body).length === 2) {
                    console.log(body)
                    console.log("Limit exceeded");
                }
                countRepos(body);
                return resolve();
            });
        });

        req.on("error", error => {
            console.error(error);
        });

        req.end();
    }

    const countRepos = (data) => {
        try {
            data.forEach(repo => {
                repos.push(repo.name);
            });
        } catch (e) {
            console.log(e)
        }
        amountRepos = repos.length;
    }

    await new Promise((resolve, reject) => request(resolve, reject));

    return {
        repos,
        amountRepos
    }
}

const fetchTotalStars = async (user) => {

    let reposObj;
    reposObj = await fetchRepos(user);
    let stars = 0;

    const getStarsForRepo = async (resolve, reject, repoName) => {

        const options = {
            hostname: 'api.github.com',
            path: `https://api.github.com/repos/${user}/${repoName}/stargazers`,
            method: 'GET',
            headers: {
                'user-agent': 'node.js',
                "accept": "application/vnd.github.v3+json",
                "authorization": `token ${process.env.GITHUB_TOKEN}`
            }
        }

        const req = https.request(options, res => {
            let body = '';

            res.on("data", data => {
                body += data.toString("utf8");
            });

            res.on("end", () => {
                stars += JSON.parse(body).length;
                return resolve(stars);
            });
        });

        req.on("error", error => {
            console.error(error);
        });

        req.end();
    }

    const getStars = async () => {

        let promises = [];
        for (let i = reposObj.repos.length - 1; i >= 0; i--) {
            promises.push(new Promise((resolve, reject) => getStarsForRepo(resolve, reject, reposObj.repos[i])));
        }
        let values = await Promise.all(promises)
        let totalStars = Math.max(...values);
        return totalStars;
    }
    return getStars();
}

exports.fetchTotalStars = fetchTotalStars;
exports.fetchRepos = fetchRepos;
exports.fetchPushes = fetchPushes;
exports.fetchUserData = fetchUserData;