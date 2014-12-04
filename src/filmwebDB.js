var XMLHttpRequest = require('xhr2');

var settings       = require('settings');
var convert		   = require('filmwebConvert');

module.exports = {
	ajax: function( type, data, callback ) {
		var xhr;

		if ( !(type == 'search' || type == 'data') ) {
			callback( new Error( 'Unsupported type parameter:' + type ) );
			return; 
		}

		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
		    if ( xhr.readyState == 4 ) {
		    	if ( xhr.status == 200 ) {
		    		callback( null, xhr );
		    	} else {
		    		callback( new Error( xhr.status ) );			
		    	}
		    }
		};

		xhr.open( 'GET', settings.urls[type] + convert.obj2url(data), true ); 
		xhr.send();	
	},

	search: function( obj, callback ) {
		this.ajax( 'search', obj, function(err, success) { 
			var parts = success.responseText.split('\\a');
			var arr = [];
			for (var i = parts.length - 1; i >= 0; i--) {
				var part = (parts[i].split('\\c'));
				if (part.shift() == 'f') {
					arr.push(part);
				}
			}

			var newObj = {};
			newObj.items = [];  
			 

			for (var i = 0; i < arr.length; i++) {
				var film = arr[i];
				var item = {
					id: 		film[0],
					thumbnails: film[1],
					title:      film[2],
					caption:    film[3],
					caption2: 	film[4],
					year:       film[5] 
				}
				newObj.items.push(item);
			};

			callback(null, newObj);
		}); 
	},

	getData: function( obj, callback ) {
		this.ajax( 'data', obj, callback ); 
	}
};
