var FilmwebDB  = require('filmwebDB');
var FilmwebAPI = require('filmwebAPI');

var fapi = new FilmwebAPI(); 
var fdb  = new FilmwebDB( fapi );

for (var i = 10 - 1; i >= 0; i--) {
	fapi.movies.list({ 
		q: 'oko'
	}).execute(function( response ) {
		console.log( response );
	});
}



