var filmwebAPI = function(source) {
	this.source = source;
};

filmwebAPI.prototype = {
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
		_Request: function(	type, data	) {
			this.type = type; 
			this.data = data;
		},

		list: function( obj ) {
			return {
				var request = new this._Request( obj );
				execute: function( response ) {
				 	filmwebProxy.add( request, response );
				}
			}
		},
	}
}


