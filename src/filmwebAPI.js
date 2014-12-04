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
		list: function(data) {
			return {
				execute: function(response) {
					console.log(data)
					var request = new filmwebProxy.Request(); 
					request.moviesList(data, response);
				}
			}
		},
	}
}


module.exports.movies.list({q: 'oko'}).execute(function(err, response) {
	console.log(response);
});


