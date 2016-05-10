var axios = require('axios');
require('dotenv').config();

var githubService = function() {
	var options = {
		headers: {
			'User-Agent': 'curvgrl5000',
			 Authorization: 'token' + process.env.GITHUB_TOKEN
		}
	};

function getBio() {
	console.log('inside');
	return axios.get('https://api.github.com/users/curvgrl', options);
}

function getRepos() {
	console.log('inside');
	return axios.get('https://api.github.com/users/curvgrl/repos', options);
}

function githubInfo() {
	return axios.all([ getRepos(), getBio() ])
		.then(function(results) {
			var repos = results[0].data;
			var repos = results[1].data;


			return { repos: repos, bio: bio };
		});
}

	return {
		getBio: getBio,
		getRepos: getRepos,
		githubInfo: githubInfo
	};
};

module.exports = githubService();



