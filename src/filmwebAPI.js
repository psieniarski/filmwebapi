var emitter    = require( 'emitter-mixin' );


var FilmwebAPI = function() {
	this.that = this;
	console.log(this.that);
};

FilmwebAPI.prototype = {
	movies: {
		list: function( obj ) {
			return {
				execute: function( response ) {
					console.log(this.that);
					this.context.emit( 'request', 'search', obj.q );
					this.context.on( 'response', function( type, response ) {
						console.log( response );
					}); 
				}
			};
		}
	}
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
