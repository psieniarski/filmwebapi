
function Net() {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	       console.log(JSON.stringify(xhr.responseText));
	    }
	}

	this.request = function() {
		xhr.open('GET',settings.urls.api + serialize(data), true); 
		xhr.send();
	},

	this.response = function() {

	}

}