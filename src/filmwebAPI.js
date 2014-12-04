var filmwebProxy = require('filmwebProxy');
var Request = filmwebProxy.Request;

console.log(Request)

modules.export = {

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
					var request = new filmwebProxy.Request(); 
					request.moviesList(data, response);
				}
			}
		},
	}
}


// module.exports.movies.list({q: 'oko'}).execute(function(response) {
// 	console.log(response);
// });


var request = Request();

request.moviesList({q:'oko'}).execute(function(err, result) {
	console.log(result);
});