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
	},

	search: function( obj, success, error ) {
		this.ajax('search', obj, success, error); 
	},

	getData: function( obj, success, error ) {
		this.ajax('data', obj, success, error); 
	}
};

// var obj = { q: 'oko' }

// module.exports.search(obj, function(response) {
// 	console.log(response.responseText);
// });