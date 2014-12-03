var filmwebProxy = require('filmwebProxy');


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
			
					filmwebProxy.moviesList(data, function(err, result) {

					});
				}
			}
		},
	}
}
