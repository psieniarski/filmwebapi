var settings       = require('./settings.js');
var log 	       = settings.log;
var XMLHttpRequest = require('xhr2');


function XHR() {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	       this.success(xhr.responseText);
	    }
	};

	this.request = function(type, queryString) {
		var status = {
			success: {

			},
			error: {

			}
		} 

		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + parms, true); 
			xhr.send();
		} else {
			log('Error: bad request type.'); 
		}
		return status;
	};
}

console.log(new XHR().request('oko', 'oko'));