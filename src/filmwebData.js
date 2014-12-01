var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


function filmwebData() {
	var xhr = new XMLHttpRequest();
	
	this.request = function(type, queryString) {
		var status = {
			success: function(),
			error: 	 function()
		}; 

		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		       status.success(xhr.responseText);
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
}

console.log(new XHR().request('oko', 'oko'));