var emitter    = require( 'emitter-mixin' );

var FilmwebAPI = function() {
	var that 	  = this;
	var callbacks = {};

	that.on( 'response', function( response, timestamp ) {
		var callback = callbacks[timestamp];
		callback( response );
	}); 

	this._request = function( type, obj, callback ) {
		var timestamp = new Date().getTime();

		callbacks[timestamp] = callback;
		that.emit( 'request', type, obj, timestamp );
	};

	this.movies = {
		list: function( obj ) {
			return {
				execute: function( callback ) {
					that._request( 'search', obj, function( response ) {
						console.log( response );
					});
				}
			};
		},
	};
};

emitter( FilmwebAPI.prototype );
module.exports = FilmwebAPI; 



// movies: {

		

// 	input: 
// 	{
// 		q:  '',
// 		id: '', 
// 	}

// 	output: 
// 	{
// 		items: [{
// 			id: '',
// 			token: '',
// 			snippet: {
// 				title: 		  '',
// 				caption: 	  '',
// 				url:          '',
// 				thumbnails:   '',
// 				description:  '',
// 				vote:         0,
// 				votesCount:   0, 
// 				genre:        '', 
// 				year:         0,
// 				countries:    [],
// 			}
// 		}]
// 	}
		
	
// 	_Request: function(	type, data	) {
// 		this.type = type; 
// 		this.data = data;
// 	},

// 	list: function( obj ) {
// 		return {
// 			var request = new this._Request( obj );
// 			execute: function( response ) {
// 			 	filmwebProxy.add( request, response );
// 			}
// 		}
// 	},
// }
