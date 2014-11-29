'use strict';

var _ = require('underscore');

var filmwebAPI = {
	init: function() {

	},

};


filmwebAPI.movies = {

	/*	

	input: 
	{
		q:  '',
		id: '', 
	}

	output: 
		items: [{
			id: '',
			token: '',
			snippet: {
				title: 		  '',
				caption: 	  '',
				url:          '',
				thumbnails:   '',
				description:  '',
				vote:         0,
				votesCount:   0, 
				genre:        '', 
				year:         0,
				countries:    [],
			}
		}]
		
	*/
	list: function(obj) {
		_.extend({
			test: 5; 
		}, obj)
	},
};


console.log(filmwebAPI.movies.list);