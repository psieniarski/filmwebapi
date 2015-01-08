var str = "f\\c190317\\c/03/17/190317/7187157.4.jpg\\cThe Eye\\cOko\\cOko\\c2008\\cJessica Alba\\af\\c34665\\c/46/65/34665/6922269.4.jpg\\cBuffalo '66\\cOko w oko z życiem\\cBuffalo - rocznik 66\\c1998\\c\\af\\c835\\c/08/35/835/7559325.4.jpg\\cMickey Blue Eyes\\cMickey Niebieskie Oko\\cMickey ochi albastri\\c1999\\cHugh Grant, James Caan\\af\\c39088\\c/90/88/39088/7187774.4.jpg\\cGin gwai\\cOko\\cThe Eye\\c2002\\cCandy Lo, Angelica Lee\\af\\c4475\\c/44/75/4475/7135132.4.jpg\\cCat's Eye\\cOko kota\\cTo mati tis gatas\\c1985\\c\\ac\\c284\\cMorskie Oko\\cKrasnystaw\\cPiłsudskiego 66, Krasnystaw\\c50.98314,23.16752\\af\\c8318\\c/83/18/8318/7069215.4.jpg\\cEye for an Eye\\cOko za oko\\cEye for an Eye\\c1996\\c\\af\\c394238\\c/42/38/394238/7481312.4.jpg\\cKomisarz Blond i Oko sprawiedliwości\\cKomisarz Blond i Oko sprawiedliwości\\cOko sprawiedliwości\\c2012\\c";
var parts = str.split('\\a');


var results = [];

for (var i = parts.length - 1; i >= 0; i--) {
	var part = (parts[i].split('\\c'));
	if (part.shift() == 'f') {
		results.push(part);
	}
};


console.log(results);