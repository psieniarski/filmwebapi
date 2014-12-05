var settings  = require('settings');
var format	  = require('filmwebFormat');

var filmwebDB = require('filmwebDB');

module.exports = {
	// Request: function() {
	// 	var obj = {};

	// 	this.moviesList = function(data) {
	// 		return {
	// 			execute: function(response) {
	// 				console.log(response);
	// 				filmwebDB.search(data, response);
	// 			}
	// 		};
	// 	};
	// }

	dataRequests:   [],
	searchRequests: [], 
	delay: 			50, 
	timeout: 		null, 

	addRequest: function(req) {
		var that = this; 

		if ( req.type == 'search' ) {
			this.searchRequests.push(req);	
		} else if ( req.type == 'data' ) {
			this.dataRequests.push(req);
		}
		 	
				
		if (!this.timeout) {
			setTimeout(function() {
				that.flush();
			}, this.delay);
		}
	},

	flush: function() {

	}


// new module.exports.Request().moviesList({q:'oko'}).execute(function(err, obj) {
// 	console.log(obj);
// });


// Request.prototype.getList = function() {




// };

// Request.prototype.prepareMethods = function(obj) {
// 	var methods = [];

// 	for (prop in obj) {
// 		if (obj.hasOwnProperty(prop)) {
// 			if (prop == 'getFilmInfoFull') {
// 				for (var i = obj[prop].length - 1; i >= 0; i--) { 
// 					methods.push(prop + ' ' + brackets( obj[prop][i] ) + '\\n');
// 				};
// 			} else {
// 				methods.push(prop + ' ' + JSON.stringify(obj[prop]) + '\\n');			
// 			}
// 		}
// 	}
// 	return methods.join('');
// }


// Request.prototype.createSigniature = function(method) {
// 	var hash = md5(method + settings.appId + settings.apiKey);
// 	return settings.version + ',' + hash;
// }


// // Zamiena obiekt na zakodowany łańcuch znaków URI
// var serialize = function(obj) {
// 	var arr = []; 
// 	for (prop in obj) {
// 		if (obj.hasOwnProperty(prop)) {
// 			arr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
// 		}
// 	}
// 	return arr.join('&');
// }