var settings = require( './settings.js' );

module.exports = {
	obj2url: function( obj ) {
		var arr = []; 
		for ( prop in obj ) {
			if ( obj.hasOwnProperty(prop) ) {
				arr.push( encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]) );
			}
		}
		return arr.join('&');
	},

	str2obj: function( type, str ) {
		if ( type == 'search' ) {
			return this.responseStr2obj( str );
		} else if ( type == 'data' ) {
			return this.responseData2obj( str );
		}
	},

	responseStr2obj: function( str ) {
		var obj = { items: [] };
		var films = [];
		str = str.split( '\\a' );

		for ( var i = str.length - 1; i >= 0; i-- ) {
			var part = (str[i].split('\\c'));
			if ( part.shift() == 'f' ) {  // jesli wynik jest filmem
				films.push( part );
			}
		}

		for ( var i = 0; i < films.length; i++ ) {
			var film = films[i];
			var item = {
				id: 		film[0],
				thumbnails: settings.urls.img + film[1],
				title:      film[2],
				caption:    film[3],
//				caption2: 	film[4],
				year:       film[5] 
			}
			obj.items.push( item );
		};

		return obj;	
	},

	responseData2obj: function( str ) {
		var arr;
		var film; 
		var obj = { items: [] }; 
		var item = {};
		//str = str.slice( str.indexOf('\n') + 1 ); 
		str = str.replace( /\st:\d+/g, '' ); // remove timestamp t:xxxx
		arr = str.split( '\n' );
		arr.pop();

    	if ( arr.shift() == 'ok' ) {
    		for ( var i = 0; i < arr.length; i++ ) {
    			film = JSON.parse( arr[i] );
    			item = {
    				title: 		   film[0],
					caption:       film[1],
					mark: 		   film[2],
					votes:         film[3],
					genre:         film[4],
					year:          film[5],
					thumbnails:    settings.urls.img + film[11],
					releaseDate:   film[13],
					releaseDatePL: film[13],
					country:       film[18].split(','),
					description:   film[19],
    			}

    			obj.items.push( item );
    		};	
		} 
		return obj;
	}
};

