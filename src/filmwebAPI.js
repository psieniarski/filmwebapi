var filmwebProxy = require('filmwebProxy');

module.exports = {

	movies: {

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
		_Request: function(data) {

		},

		list: function(obj) {
			return {
				var request = new this._Request(obj);
				execute: function(response) {
				 	filmwebProxy.addRequest(request);
				}
			}
		},
	}
}


module.exports.movies.list({q: 'oko'}).execute(function(err, response) {
	console.log(err, response);
});


