module.exports = {
	obj2url: function(obj) {
		var arr = []; 
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				arr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
			}
		}
		return arr.join('&');
	}
};