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

		var films = searchResponse.responseText.split('\\a');
			var arr = [];
			for (var i = films.length - 1; i >= 0; i--) {
				var part = (films[i].split('\\c'));
				if (part.shift() == 'f') {  // jesli wynik jest filmem
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
		}
	}
};