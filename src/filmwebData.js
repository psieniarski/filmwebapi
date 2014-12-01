var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


var filmwebData = {

	ajax: function(type, queryString) {
		var xhr 	= new XMLHttpRequest();
		var status  = {
			success: function(response) {},
			error: 	 function(errorMsg) {},
			allways:  function(response) {},
		};

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {

		    	if (xhr.status == 200) {
		    		status.success(xhr.responseText);

		    	} else {
		    		console.log(xhr.responseText);
		    		status.error('Error ' + xhr.status);
		    	}
		    }
		};

		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + queryString, true); 
			console.log(settings.urls[type] + queryString)
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