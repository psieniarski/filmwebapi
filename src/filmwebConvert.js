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


var response = 'ok["Amistad","Amistad",7.5559134,13047,"Dramat historyczny",1997,152,0,"http://www.filmweb.pl/film/Amistad-1997-5/discussion",1,1,"/00/05/5/6900842.2.jpg",null,"1997-12-04","1998-02-27",0,0,0,"USA","Grupa czarnoskórych niewolników z Afryki staje przed sądem po tym, jak urządziła bunt na pokładzie statku."] t:43200
["Aleja Snajperów","Welcome to Sarajevo",7.20569,2319,"Dramat,Wojenny",1997,103,0,"http://www.filmweb.pl/film/Aleja+Snajper%C3%B3w-1997-4/discussion",0,1,"/00/04/4/7545511.2.jpg",null,"1997-05-09","1998-05-08",0,0,0,"USA, Wielka Brytania",null] t:43200
["Air Force One","Air Force One",6.331361,24505,"Sensacyjny",1997,124,0,"http://www.filmweb.pl/film/Air+Force+One-1997-3/discussion",0,1,"/00/03/3/7437803.2.jpg",null,"1997-07-21","1997-12-05",0,0,0,"Niemcy, USA","Air Force One z prezydentem Stanów Zjednoczonych oraz jego rodziną na pokładzie zostaje uprowadzony przez rosyjskich terrorystów."] t:43200
["Adwokat diabła","The Devil's Advocate",7.95585,299422,"Thriller",1997,144,0,"http://www.filmweb.pl/Adwokat.Diabla/discussion",1,1,"/00/02/2/6956729.2.jpg",["http://1.fwcdn.pl/wv/34/10/13410/snap2.13410.1.jpg","http://mm.filmweb.pl/2/the_devil_s_advocate__1997____official_movie_trailer.iphone.mp4"],"1997-10-17","1998-02-27",0,0,0,"Niemcy, USA","Kevin Lomax - wybitny adwokat, skuszony intratną propozycją pracy, przeprowadza się do Nowego Jorku. Nie zdaje sobie jednak sprawy z tego, kim jest jego chlebodawca."] t:43200
["Paragraf 187","One Eight Seven",7.4315066,5256,"Thriller",1997,120,0,"http://www.filmweb.pl/film/Paragraf+187-1997-1/discussion",1,1,"/00/01/1/7003079.2.jpg",null,"1997-07-30","1998-02-27",0,0,0,"USA","Napadnięty nauczyciel postanawia wrócić do pracy w innej szkole, aby walczyć z agresją i przemocą."] t:43200'