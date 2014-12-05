var XMLHttpRequest = require( 'xhr2' );
var md5 		   = require( 'MD5' );

var settings       = require( 'settings' );
var convert		   = require( 'filmwebConvert' );
var format		   = require( 'filmwebFormat' );

module.exports = {

	_createSigniature: function( method ) {
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
		var xhr;

		if ( !(type == 'search' || type == 'data') ) {
			callback( new Error( 'Unsupported type parameter:' + type ) );
			return; 
		} 

		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		callback( null, xhr );
		    	} else {
		    		callback( new Error( xhr.status ) );			
		    	}
		    }
		};

		if (type == 'data') {
			data = {
				methods:    this._prepareMethods(data), 
				signiature: this._createSigniature(), 
				appId:      settings.appId,
				version:    settings.version
			}
		}

		xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true ); 
		xhr.send();	
	},

	search: function( obj, callback ) {
		this.ajax( 'search', obj, function(err, response) { 

			if (response) {
				response = convert.responseStr2obj( response.responseText );	
			}
			callback(err, response);
		}); 
	},

	getData: function( obj, callback ) {
		this.ajax( 'data', obj, callback ); 
	}
};



var d = {
	getFilmInfoFull: [1,2,3,4,5],	
}

module.exports.getData(d, function(err, response) {
	console.log(response);
});