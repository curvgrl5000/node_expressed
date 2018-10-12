// We have to load the modules here to make them available
var express = require('express');
var app = express();
var exphbs = require('express-handlebars'); // here we're using express handlebars for templating
var axios = require('axios'); // here I'm using axios for ajax calls in a Promise format

var githubService= require('./services/githubServices.js'); // using relative path for the target module
var port = process.env.PORT || 3000; // Node is event driven, so its listening on this port

console.log(module);
console.log(__filename); // complete path to file
console.log(__dirname);  // path to the directory that contains the module

const path = (require('path'));
let aPathObj = path.parse(__filename);
console.log( aPathObj );

// globals are available on the client + server side
// But you should look them up here... ( NEED URL )
// 

// ===========================
// routes
// ===========================

	var alert = function() {
		return "hey John!"
	}
	console.log(alert());
	//global.console.log(module);

app.get('/', function (request, response) {
	var favoriteLetters = ['a', 'b', 'c'];
	var favoriteLinks = [
		{text: "Apple", url: 'http://apple.com'},
		{text: "Facebook", url: 'http://facebook.com'}
	];
	console.log(favoriteLinks);

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
	console.log('inside project')
	
	githubService.githubInfo()
	.then(function (results) {
		console.log('promise returning results ' + results.repo);
		console.log(results.x);
		
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


// This is our listener and its happening Synchronously!
app.listen(port, function() {
  console.log('Server is running on port: ' + port);
});

// bash sugar: set the PORT=4000 node server.js
// just like the SERVE gem

app.on('error', err => {
  console.error(err)
});


// introduce jshint at runtime in terminal


