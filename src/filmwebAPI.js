var emitter    = require( 'emitter-mixin' );
var uuid       = require( './uuid.js' );


var FilmwebAPI = function() {
	var that 	  = this;
	var callbacks = {};

	this.on( 'response', function( response, id ) {
		var callback = callbacks[id];
		callback( response );
		delete callbacks[id];
	}); 

	this._request = function( type, obj, callback ) {
		var id = uuid();

		callbacks[id] = callback;
		that.emit( 'request', type, obj, id );
	};

	this.movies = {
		list: function( obj ) {
			return {
				execute: function( callback ) {
					that._request( 'search', obj, function( response ) {
						var ids   = [];
						var items = response.items;

						for ( var i = 0; i < items.length; i++ ) {
							ids.push( items[i].id );
						};

						that._request( 'data', { id: ids }, function( data ) {
							callback( data );
						});
					});
				}
			};
		},
	};
};

emitter( FilmwebAPI.prototype );

console.log(FilmwebAPI.on)

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
