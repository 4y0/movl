
module.exports = function (filepath){
	var unzip   = require('unzip');
	var fs      = require('fs'); 
 
	fs.createReadStream(__dirname + '/localseeds/' + filepath).pipe(unzip.Extract( { path: './' } ));
 

}