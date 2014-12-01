var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


var filmwebData = {

	ajax: function(type, queryString) {
		var xhr 	= new XMLHttpRequest();
		var status  = {
			success: function(),
			error: 	 function()
		};

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		    	if (xhr.status == 200) {
		    		status.success(xhr.responseText);
		    	} else {
		    		status.error('Error ' + xhr.status);
		    	}
		    }
		};

		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + parms, true); 
			xhr.send();
		} else {
			status.error('Error: bad request type.'); 
		}
		return status;
	};
};

filmwebData.request('search', 'q=oko');
	
