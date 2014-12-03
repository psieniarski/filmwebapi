'use strict';

var filmwebProxy = require('filmwebProxy');
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
	{
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
	}
		
	*/
	list: function(obj) {
		var data = _.extend({
			q:  '', 
			id: ''
		}, obj);

		return {
			execute: function(response) {
				var request = new proxy.Request(); 
		
				Proxy.request({
					type: 'movies-list',
					data: data,
					onResponse: response 
				});

			}
		}
	},
};
