var settings       = require('./settings.js');
var convert		   = require('./convert.js');
var log			   = settings.log;
var XMLHttpRequest = require('xhr2');

module.exports = {
	ajax: function( type, data, callback ) {

		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		callback( null, xhr );
		    	} else {
		    		callback( new Error( xhr.status ) );			
		    	}
		    }
		};

		if ( type == 'search' || type == 'data' ) {	
			xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true ); 
			xhr.send();	
		}

		else {
			callback( new Error( 'Unsupported type parameter:' + type ) );
		}
	},

	search: function( obj, callback ) {
		this.ajax('search', obj, callback); 
	},

	getData: function( obj, callback ) {
		this.ajax('data', obj, callback); 
	}
};

var obj = { q: 'oko' }

module.exports.search(obj, function(err,response) {
	console.log();
});