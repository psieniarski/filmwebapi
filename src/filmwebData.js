var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


var filmwebData = {

	ajax: function(type, queryString) {
		var xhr 	= new XMLHttpRequest();
		var status  = {};

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	status.allways = function(callback) {
		    		callback(xhr.responseText);
		    	}
		    	
		    	if (xhr.status == 200) {
		    		status.success = function(callback) {
		    			callback(xhr.responseText);
		    		}

		    	} else {
		    		status.error = function(callback) {
		    			callback(xhr.responseText);
		    		}
		    	}
		    }
		};

		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + queryString, true); 
			xhr.send();
		} else {
			status.error('Error: bad request type.'); 
		}
		return status;
	},

	search: function(queryString) {
		return this.ajax('search', queryString);
	}
};

var request = filmwebData.ajax('search', 'q=oko');

request.allways(function(response) {
	console.log(response);
});	
