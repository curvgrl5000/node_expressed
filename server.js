var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
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
  response.render('projects', { title: 'Projects' });
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
	layoutsDir: './views/layouts'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));


// ===========================
// server
// ===========================

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});