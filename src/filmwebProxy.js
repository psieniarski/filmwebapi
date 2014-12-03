'use strict';

var settings = require('settings');
var format	 = require('filmwebFormat');

Request: function(obj) {
	var data; 

	if (obj.type == 'movies-list') {
		data = {
			signature: this.createSigniature(method),
			methods: method,  
			appId: settings.appId,
			version: settings.version
		}
	} 


	this.execute = function() {

	},
}

Request.prototype.getList = function() {




};

Request.prototype.prepareMethods = function(obj) {
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


Request.prototype.createSigniature = function(method) {
	var hash = md5(method + settings.appId + settings.apiKey);
	return settings.version + ',' + hash;
}


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