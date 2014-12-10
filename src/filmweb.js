var FilmwebDB  = require('./filmwebDB.js');
var FilmwebAPI = require('./filmwebAPI.js');

var fapi = new FilmwebAPI(); 
var fdb  = new FilmwebDB( fapi );

for (var i = 1 - 1; i >= 0; i--) {
	fapi.movies.list({ 
		q: 'oko'
	}).execute(function( response ) {
		console.log( response );
	});
}



