var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var axios = require('axios');
var githubService= require('./services/githubServices.js');
var port = process.env.PORT || 3000;


// ===========================
// routes
// ===========================

app.get('/', function (request, response) {
	var favoriteLetters = ['a', 'b', 'c'];
	var favoriteLinks = [
		{text: "Apple", url: 'http://apple.com'},
		{text: "Facebook", url: 'http://facebook.com'}
	];
	var favoriteAuthors = [
		{text: "Kurt Vonegut", url: 'https://en.wikipedia.org/wiki/Kurt_Vonnegut'},
		{text: "Jonathen Frazen", url: 'https://en.wikipedia.org/wiki/Jonathan Franzen'},
		{text: "David Foster Wallace", url: 'https://en.wikipedia.org/wiki/David Foster Wallace'}

	];
  response.render('home', { 
  	title: 'My Site',
  	favorites: favoriteLetters,
  	links: favoriteLinks,
  	authors: favoriteAuthors  
  });
});

app.get('/projects', function (request, response) {
	githubService.githubInfo()
	.then(function (results) {
		console.log(results)
		response.render('projects', 
			{
				title: 'My Projects',
				bio: results.bio,
				repos: results.repos
			}
		);
	});

});

// 'get' is the express method for the getter or GET request

// bash sugar: set the PORT=4000 node server.js
// just like the SERVE gem


// ===========================
// middleware & config
// ===========================

app.set('views', 'views');

app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: './views/layouts',
	helpers: {
		json: function (context) {
			return JSON.stringify(context);
		}
	}
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));


// ===========================
// server
// ===========================

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});