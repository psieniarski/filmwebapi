/* Unofficial filmwebAPI */

//var XMLHttpRequest = XMLHttpRequest || require('xhr2');
var md5 		   = require('MD5');
var settings 	   = require('./settings.js');
var corsProxy      = 'http://localhost:8888/proxy/';
 
// var prepareMethod = function(method, parms) {
// 	return method + ' ' + JSON.stringify(parms) + '\\n';
// }

function brackets(str) {
	return '[' + str + ']'; 
}

var prepareMethods = function(obj) {
	var methods = [];

	for (prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (prop == 'getFilmInfoFull') {
				for (var i = obj[prop].length - 1; i >= 0; i--) { 
					methods.push(prop + ' ' + brackets( obj[prop][i] ) + '\\n');
				};
			} else {
				methods.push(prop + ' ' + JSON.stringify(obj[prop]) + '\\n');			
			}
		}
	}
	return methods.join('');
}


var method = prepareMethods({
	getFilmInfoFull: [1,2,3,4,5,6,7,8,10]
});

console.log(method)

// method = 'getFilmInfoFull [126]\ngetFilmInfoFull [1200]\n';


function createSigniature(method) {
	var hash = md5(method + settings.appId + settings.apiKey);
	return settings.version + ',' + hash;
}


var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
       console.log(JSON.stringify(xhr.responseText));
    }
}

xhr.open('GET', corsProxy + settings.urls.api + serialize(data), true); 
xhr.send();

// {
//  appID: 'id',
//  signiature: 'signiature',
//  apikey: '', 	
//	methods: {
//		metods: [par1,par2,par3]  	
//	}
// }



var data = {
	signature: createSigniature(method),
	methods: method,  
	appId: settings.appId,
	version: settings.version
}


// 1.0%2Cbc8a9c3ff30fd57ca51d0bddb2697794&_=1417130658605', true); 

console.log(data);


// Zamiena obiekt na zakodowany łańcuch znaków URI
var serialize = function(obj) {
	var arr = []; 
	for (prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			arr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
		}
	}
	return arr.join('&');
}


