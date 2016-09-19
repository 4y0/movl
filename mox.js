
module.exports = function (filepath){
	var unzip   = require('unzip');
	var fs      = require('fs'); 

	var temp_downloadable = "./temp.zip";
	var writeStream = fs.createWriteStream(temp_downloadable);

	console.log('Starting download......');
	fs.readFileSync(filepath)
	.pipe(writeStream); 


	writeStream.on('finish', function(data){
		fs.createReadStream(temp_downloadable).pipe(unzip.Extract( { path: './' } ));
	});

	writeStream.on('error', function (err){
		console.log(arguments);
	});

	writeStream.on('close', function(data){
		fs.unlink(temp_downloadable);
		console.log('Download Completed');
		//console.log('write stream closed');
	});

}