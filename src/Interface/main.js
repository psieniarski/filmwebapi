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
		var data = _.extend({
			test: 5, 
		}, obj)

		return {
			execute: function() {
				Proxy.request({
					type: 'movies',
					data: data
				}).send(); 
			}
		}
	},
};


console.log(filmwebAPI.movies.list({dupa:11}));