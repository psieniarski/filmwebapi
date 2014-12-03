var settings       = require('./settings.js');
var convert		   = require('./convert.js');
var log			   = settings.log;
var XMLHttpRequest = require('xhr2');

var filmwebDB = {

	ajax: function( type, queryString, success, error ) {

		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			var errorMsg = ''; 

		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		success( xhr );
		    	} else {
		    		errorMsg = 'Error: ' + xhr.status;
		    		error ? error( errorMsg ) : log( errorMsg );
		    	}
		    }
		};

		if ( type == 'search' || type == 'data' ) {
		
			xhr.open( 'GET', settings.urls[type] + queryString, true ); 
			xhr.send();	
		}
	},

	request: function(type, obj, success, error) {
		var queryString = convert.obj2url(obj); 
		this.ajax( type, queryString, success, error );
	},

	search: function( obj, success, error ) {
		this.request('search', obj, success, error); 
	},

	getData: function( obj, success, error ) {
		this.request('data', obj, success, error); 
	}
};

var obj = { q: 'oko' }

filmwebDB.getData(obj, function(response) {
	console.log(response.responseText);
});