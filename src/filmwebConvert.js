module.exports = {
	obj2url: function(obj) {
		var arr = []; 
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				arr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
			}
		}
		return arr.join('&');
	},

	search2obj: function(searchResponse) {
		var obj = {};
		var films = [];
		var responseText = searchResponse.responseText.split('\\a');

		for (var i = responseText.length - 1; i >= 0; i--) {
			var part = (responseText[i].split('\\c'));
			if (part.shift() == 'f') {  // jesli wynik jest filmem
				films.push(part);
			}
		}

		
		obj.items = [];  
		 

		for (var i = 0; i < films.length; i++) {
			var film = films[i];
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

		return newObj;	
	}
};