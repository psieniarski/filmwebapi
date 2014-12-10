var XMLHttpRequest = require( 'xhr2' );
var md5 		   = require( 'MD5' );
var emitter 	   = require( 'emitter-mixin' );
var sys			   = require( 'sys' );

var convert		   = require( 'filmwebConvert' );
var format		   = require( 'filmwebFormat' );
var settings       = require( 'settings' );


FilmwebDB = function( client ) {
	var that = this;

	this.on( 'error', function( err ) {
		sys.debug(err);
	});

	this.on('xhr', function( type, xhr ) {
		var response = convert.str2obj( type, xhr.responseText );
		that.emit( 'response', type, response );
	});

	client.on('request', function( type, obj ) {
		if ( type == 'data' ) {
			that.getData( obj ); 
		} else if ( type == 'search' ) {
			that.search( obj );
		}
	});
};

FilmwebDB.prototype = {
	_createSignature: function( method ) {
		var hash = md5( method + settings.appId + settings.apiKey );
		return settings.version + ',' + hash;
	},

	_prepareMethods: function( methodName, obj ) {
		var methods = [];

		for ( var prop in obj ) {
			if ( obj.hasOwnProperty( prop ) ) {
				if ( prop.toUpperCase() == 'ID' ) {
					if ( !Array.isArray(obj[prop]) ) {
						obj[prop] = [ obj[prop] ];
					}
					for ( var i = obj[prop].length - 1; i >= 0; i-- ) { 
						methods.push( methodName + ' ' + format.brackets( obj[prop][i] ) + '\\n' );
					}
				} else {
					methods.push( prop + ' ' + JSON.stringify( obj[prop] ) + '\\n' );			
				}
			}
		}
		return methods.join( '' );
	},

	ajax: function( type, data ) {
		var that = this;
		var xhr;

		if ( !( type == 'search' || type == 'data' ) ) {
			this.emit( 'error', new Error( 'Unsupported type parameter:' + type ) );
			return; 
		} 
		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		that.emit('xhr', type, xhr);
		    	} else {
		    		that.emit( 'error', new Error( 'Error: ' + xhr.status ) );			
		    	}
		    }
		};

		xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true );

		console.log(settings.urls[type] + convert.obj2url(data)); 
		xhr.send();	
	},

	search: function( obj ) {
		this.ajax( 'search', obj ); 
	},

	getData: function( obj ) {
		var methods = this._prepareMethods( 'getFilmInfoFull', obj ); 

		obj = {
			methods:    methods, 
			signature:  this._createSignature( methods ), 
			appId:      settings.appId,
			version:    settings.version
		};

		this.ajax( 'data', obj );
	}
};

emitter( FilmwebDB.prototype );
module.exports = FilmwebDB; 

// x.getData(d, function(err, response) {
// 	console.log(response);
// });

// x.getData(d);

// x.on('response', function(type, data) {
// 	console.log(data);
// });

// var convertData = function(str) {
// 	var obj   = { items: [] };
// 	var arr   = str.split('\n');
// 	var films = [];

// 	for (var i = arr.length - 1; i >= 0; i--) {
// 		films.push(arr[i].split(','));
// 	}
// 	return films;
// }


