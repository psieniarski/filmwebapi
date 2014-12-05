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

	responseStr2obj: function(responseStr) {
		var obj = { items: [] };
		var films = [];
		var str = responseStr.split('\\a');

		for (var i = str.length - 1; i >= 0; i--) {
			var part = (str[i].split('\\c'));
			if (part.shift() == 'f') {  // jesli wynik jest filmem
				films.push(part);
			}
		}

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
			obj.items.push(item);
		};

		return obj;	
	},

	responseData2obj: function() {

	}
};


