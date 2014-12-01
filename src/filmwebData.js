var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


var filmwebData = {

	ajax: function(type, queryString) {
		var xhr 		= new XMLHttpRequest();
		var state 		= {};
		var response;

		var setState = function(stateName, callbackArgs) {
			var states = ['always', 'success', 'error'];
			state[stateName]
		}

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	state.always(); 

		    	if (xhr.state == 200) {
		    		state.success();

		    	} else {
		    		state.error();
		    	}
		    }
		};

		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + queryString, true); 
			xhr.send();
		} else {
			state.error('Error: bad request type.'); 
		}
		return state;
	},

	search: function(queryString) {
		return this.ajax('search', queryString);
	}
};

var request = filmwebData.ajax('search', 'q=oko');

request.always(function(response) {
	console.log(response);
});	
