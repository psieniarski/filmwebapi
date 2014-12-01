
var settings = require('./settings.js');

console.log( settings );

function XHR() {
	var xhr = new XMLHttpRequest();
	
	this.request = function(type, queryString) {
		if (type == 'search' || type == 'data') {
			xhr.open('GET',settings.urls[type] + parms, true); 
			xhr.send();
		} else {
			console.log('Error: bad request type.'); 
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

