var axios = require('axios');
require('dotenv').config(); // is .env
// old GITHUB_TOKEN: GITHUB_TOKEN=a7a42457830679ca8f3fe7e35409dfbb002e22ef

var githubService = function() {
	let options = {
		headers: {
			'User-Agent': 'curvgrl5000',
			Authorization: 'token ' + process.env.GITHUB_TOKEN
		}
	};

	function getBio() {
		console.log('calling getBios');
		return axios.get('https://api.github.com/users/curvgrl5000', options);
	}

	function getRepos() {
		console.log('calling getRepos');
		return axios.get('https://api.github.com/users/curvgrl5000/repos', options);
	}

	function githubInfo() {
		console.log('calling githubInfo');
		return axios.all([ getRepos(), getBio() ]) // calling multiple requests
			.then(function(results) {
			  console.log(results[0].data[0].name);
				var repos = results[0].data;
				var bio = results[0].data[0];
				return { repos: repos, bio: bio }
			});
	}

	return {
		getBio: getBio,
		getRepos: getRepos,
		githubInfo: githubInfo
	};
}

module.exports = githubService();



