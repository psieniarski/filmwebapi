var FilmwebDB  = require('./filmwebDB.js');
var FilmwebAPI = require('./filmwebAPI.js');

var fapi = new FilmwebAPI(); 
var fdb  = new FilmwebDB( fapi );

module.exports = {
	FilmwebDB: FilmwebDB,
	FilmwebAPI: FilmwebAPI,

	search: function(q, callback) {
		fapi.movies.list({ 
			q: q
		}).execute(function( response ) {
			callback( response );
		});
	}
};

// module.exports.search('oko', function(response) {
// 	console.log(response);
// });











