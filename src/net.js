var settings = require('./settings.js');
var XMLHttpRequest = require('xhr2');


function XHR() {
	var xhr = new XMLHttpRequest();
	
	this.request = function(type, queryString) {
		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + parms, true); 
			xhr.send();
		} else {
			log('Error: bad request type.'); 
		}

		return this;
	};

	this.response = function(callback) {
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		       callback(xhr.responseText);
		    }
		};
	};
}

console.log(new XHR());