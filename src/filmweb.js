var FilmwebDB  = require('filmwebDB');
var FilmwebAPI = require('filmwebAPI');

var fapi = new FilmwebAPI(); 
var fdb  = new FilmwebDB( fapi );

for (var i = 1 - 1; i >= 0; i--) {
	fapi.movies.list({ 
		id: [122]
	}).execute(function( response ) {
		console.log( response );
	});
}



