var FilmwebDB  = require('./filmwebDB.js');
var FilmwebAPI = require('./filmwebAPI.js');

var fapi = new FilmwebAPI(); 
var fdb  = new FilmwebDB( fapi );

module.exports = {
	FilmwebDB: FilmwebDB,
	FilmwebAPI: FilmwebAPI,

	search: function(q, callback) {
		fapi.movies.list({ 
			q: 'oko'
		}).execute(function( response ) {
			callback( response );
		});
	}
};








