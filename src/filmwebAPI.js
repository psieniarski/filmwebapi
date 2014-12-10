var emitter    = require( 'emitter-mixin' );

var FilmwebAPI = function() {
	var that 	  = this;
	var callbacks = {};

	that.on( 'response', function( response, timestamp ) {
		var callback = callbacks[timestamp];
		callback( response ); 
	}); 

	this.movies = {
		list: function( obj ) {
			return {
				execute: function( callback ) {
					var timestamp = new Date().getTime();
					var ids 	  = [];
					var items;


					that.emit( 'request', 'search', obj, timestamp );
					callbacks[timestamp] = function( response ) {

						items = response.items;

						for (var i = 0; i < items.length; i++) {
						 	ids.push( items[i].id );
						 };
					}; 

					console.log( ids );
				}
			};
		}
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
