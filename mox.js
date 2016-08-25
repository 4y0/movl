/*var Git = require("nodegit");
Git.Repository.openBare('https://github.com/orbitbot/chrome-extensions-examples.git').then( function(repo) {
	console.log(repo);
}).catch( function (err){
	console.log(err);
});*/


module.exports = function (url){
var unzip   = require('unzip');
var fs      = require('fs');
var request = require('request');

var temp_downloadable = "./temp.zip";
var writeStream = fs.createWriteStream(temp_downloadable);

console.log('Starting download......');
request(url)
.pipe(writeStream); //(fs.createReadStream('set_page_color.zip'));//.pipe(unzip.Extract({ path: 'output/path' }));


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