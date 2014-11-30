var obj = { oko: 2}

for (prop in obj) {
	if (obj.hasOwnProperty(prop)) {
		console.log( prop.indexOf('oko') );
	}
}