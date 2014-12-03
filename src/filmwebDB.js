var settings       = require('./settings.js');
var log			   = settings.log;
var XMLHttpRequest = require('xhr2');

var filmwebDB = {

	ajax: function( type, queryString, success, error ) {

		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			var errorMsg = ''; 

		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		success ? success( xhr.responseText ) : log('Warning: callback is undefinded');
		    	} else {
		    		errorMsg = 'Error: ' + xhr.status;
		    		error ? error( errorMsg ) : log( errorMsg );
		    	}
		    }
		};

		if ( type == 'search' || type == 'data' ) {
		
			xhr.open( 'GET', settings.urls[type] + queryString, true ); 
			xhr.send();	
		
			return xhr;
		}
	},

	search: function( queryString, success, error ) {
		return this.ajax( 'search', queryString, success, error );
	},

	getData: function( queryString, success, error ) {
		return this.ajax( 'data', queryString, success, error );
	}
};
