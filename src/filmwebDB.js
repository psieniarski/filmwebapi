var XMLHttpRequest = require( 'xhr2' );
var md5 		   = require( 'MD5' );
var util 		   = require( 'util' );
var emitter 	   = require( 'emitter-mixin' );

var settings       = require( 'settings' );
var convert		   = require( 'filmwebConvert' );
var format		   = require( 'filmwebFormat' );


FilmwebDB = function() {};

FilmwebDB.prototype = {

	_createSignature: function( method ) {
		var hash = md5( method + settings.appId + settings.apiKey );
		return settings.version + ',' + hash;
	},

	_prepareMethods: function( obj ) {
		var methods = [];

		for ( var prop in obj ) {
			if ( obj.hasOwnProperty( prop ) ) {
				if ( prop == 'getFilmInfoFull' ) {
					for ( var i = obj[prop].length - 1; i >= 0; i-- ) { 
						methods.push( prop + ' ' + format.brackets( obj[prop][i] ) + '\\n' );
					}
				} else {
					methods.push( prop + ' ' + JSON.stringify( obj[prop] ) + '\\n' );			
				}
			}
		}
		return methods.join( '' );
	},

	ajax: function( type, data, callback ) {
		var that = this;
		var xhr;

		if ( !( type == 'search' || type == 'data' ) ) {
			callback( new Error( 'Unsupported type parameter:' + type ) );
			return; 
		} 

		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		callback( null, xhr );

		    		that.emit('response', null, xhr);

		    	} else {
		    		callback( new Error( xhr.status ) );			
		    	}
		    }
		};

		xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true ); 
		xhr.send();	
	},

	search: function( obj, callback ) {
		this.ajax( 'search', obj, function(err, response) { 

			if (response) {
				response = convert.responseStr2obj( response.responseText );	
			}
			callback( err, response );
		}); 
	},

	getData: function( obj, callback ) {
		var methods = this._prepareMethods( obj ); 

		obj = {
			methods:    methods, 
			signature:  this._createSignature( methods ), 
			appId:      settings.appId,
			version:    settings.version
		};

		this.ajax( 'data', obj, function( response ) {
			callback( null, convert.responseData2obj( response ) ); 
		}); 
	}
};

emitter(FilmwebDB.prototype);

x = new FilmwebDB();

var d = { getFilmInfoFull: [1,2,3,5,6,7,8,9,10,11,12,13,14] };

x.getData(d, function(err, response) {});

x.on('response', function(err, response) {
	console.log(response.responseText);
});






// var convertData = function(str) {
// 	var obj   = { items: [] };
// 	var arr   = str.split('\n');
// 	var films = [];

// 	for (var i = arr.length - 1; i >= 0; i--) {
// 		films.push(arr[i].split(','));
// 	}
// 	return films;
// }


