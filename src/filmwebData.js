var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


var filmwebData = {

	ajax: function(type, queryString) {
		var xhr 		= new XMLHttpRequest();
		var status 		= {};
		var response;

		var states = ['always', 'success', 'error'];
		var setState = function(state, callback) {
			callback(response)
		}

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	status.allways(); 

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

request.allways(function(response) {
	console.log(response);
});	
