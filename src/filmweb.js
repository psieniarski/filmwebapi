var FilmwebDB  = require('filmwebDB');
var FilmwebAPI = require('filmwebAPI');

var fapi = new FilmwebAPI(); 
var fdb  = new FilmwebDB( fapi );

fapi.movies.list

