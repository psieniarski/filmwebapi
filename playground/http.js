var https = require("https");
var arr = []; 

var req = https.get('https://ssl.filmweb.pl/api?methods=getFilmInfoFull%20%5B13%5D%5CngetFilmInfoFull%20%5B12%5D%5Cn&signature=1.0%2Ca1ea06b07561cd22e8fdf3b5bc033ab4&appId=android&version=1.0', function(res) {


	res.setEncoding('utf8');
	res.on('data', function(d) {
		console.log(d);
	});



}).on('error', function(e) {
  console.error(e);
});


arr.push(req);

var req = https.get('https://ssl.filmweb.pl/api?methods=getFilmInfoFull%20%5B13%5D%5CngetFilmInfoFull%20%5B12%5D%5Cn&signature=1.0%2Ca1ea06b07561cd22e8fdf3b5bc033ab4&appId=android&version=1.0', function(res) {
	var that = this; 
	
	res.setEncoding('utf8');
	res.on('data', function(d) {
		console.log(d);
	});

	res.on('end', function() {
		arr.splice( arr.indexOf(that), 1 );
	});

}).on('error', function(e) {
  console.error(e);
});



arr.push(req);
