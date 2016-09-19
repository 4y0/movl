
module.exports = function (filepath){
	var unzip   = require('unzip');
	var fs      = require('fs'); 
 	
 	console.log('**** Scaffolding %s', filepath);
	fs.createReadStream(__dirname + '/localseeds/' + filepath).pipe(unzip.Extract( { path: './' } ));
 	console.log('**** Scaffolding %s complete', filepath);

}