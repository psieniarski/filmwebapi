var settings = require('./settings.js');
var log = settings.log;
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

	this.onResponse = function(callback) {
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		       callback(xhr.responseText);
		    }
		};
	};
}

console.log(new XHR().request('oko', 'oko'));