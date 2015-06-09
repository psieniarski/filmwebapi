var XMLHttpRequest = require( 'xhr2' );
var md5            = require( 'MD5' );
var emitter 	     = require( 'emitter-mixin' );
var sys	           = require( 'sys' );

var convert        = require( './filmwebConvert.js' );
var format         = require( './filmwebFormat.js' );
var settings       = require( './settings.js' );


FilmwebDB = function( client ) {
	var that = this;

	this.on( 'error', function( err ) {
		sys.debug(err);
	});

	this.on('xhr', function( type, xhr ) {
		var response = convert.str2obj( type, xhr.responseText );
		client.emit( 'response', response, xhr.id );		
	});

	client.on('request', function( type, obj, id ) {
		if ( type == 'data' ) {
			that.getData( obj, id ); 
		} else if ( type == 'search' ) {
			that.search( obj, id );
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
					if ( !Array.isArray( obj[prop] ) ) {
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

	ajax: function( type, data, id ) {
		var that = this;
		var xhr;

		if ( !( type == 'search' || type == 'data' ) ) {
			this.emit( 'error', new Error( 'Unsupported type parameter:' + type ) );
			return; 
		} 
		
		xhr = new XMLHttpRequest();
		xhr.id = id;

		xhr.onreadystatechange = function() {
		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		that.emit('xhr', type, xhr);
		    	} else {
		    		that.emit( 'error', new Error( xhr.status ) );			
		    	}
		    }
		};

		xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true );
		xhr.send();	
	},

	search: function( obj, id ) {
		this.ajax( 'search', obj, id ); 
	},

	getData: function( obj, id ) {
		var methods = this._prepareMethods( 'getFilmInfoFull', obj ); 

		obj = {
			methods:    methods, 
			signature:  this._createSignature( methods ), 
			appId:      settings.appId,
			version:    settings.version
		};

		this.ajax( 'data', obj, id );
	}
};

emitter( FilmwebDB.prototype );
module.exports = FilmwebDB; 


