var XMLHttpRequest = require('xhr2');

var settings       = require('settings');
var convert		   = require('filmwebConvert');

module.exports = {
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

		xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true ); 
		xhr.send();	
	},

	search: function( obj, callback ) {
		this.ajax( 'search', obj, callback ); 
	},

	getData: function( obj, callback ) {
		this.ajax( 'data', obj, callback ); 
	}
};
