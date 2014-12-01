var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


var filmwebData = {

	ajax: function(type, queryString) {
		var xhr 		= new XMLHttpRequest();
		var status 		= {};
		var response;

		var setState = function(stateName, callbackArgs) {
			var states = ['always', 'success', 'error'];
			status[stateName]
		}

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	status.always(); 

		    	if (xhr.status == 200) {
		    		status.success();

		    	} else {
		    		status.error();
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

request.always(function(response) {
	console.log(response);
});	
