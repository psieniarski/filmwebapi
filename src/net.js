
function XHR() {
	var xhr = new XMLHttpRequest();
	
	this.IDRequest = function(parms) {
		xhr.open('GET',settings.urls.api + parms, true); 
		xhr.send();
	},

	this.dataRequest = function(parms) {
		xhr.open('GET',settings.urls.api + parms, true);
		xhr.send();
	},

	this.response = function(callback) {
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		       callback(xhr.responseText);
		    }
		}
	}
}

XHR.response(function(a) {


});