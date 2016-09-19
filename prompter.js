#!/usr/bin/env node
var program     = require('commander');
var prompt      = require('prompt');
var localSeeds = require('./localseeds'); 


program
  .version('0.0.0')
  .option('-l, --List [num]', 'List Available Project Seeds')
  .option('-a, --app  [num]', 'Scaffold seed with num')
  .option('-d, --download [url]', 'Download Seed to local')
  .parse(process.argv);

var promptProperties = {};

promptProperties.downloadurl = {

  name:       'downloadurl',
  message:    'Please specify a url to download.', 
  default:    ''

};

promptProperties.paginate = {

	name:      'page',
	message:   'Hit <enter> to show more samples or [number] to download the sample \n',
	validator: /\s*|\d+/,
	default:   ''

}

function doDownloadPrompt() {

	prompt.message = "";
	prompt.get([promptProperties.downloadurl], function (err, result) {

		if(result && result.downloadurl){
			downloadUrl(result.downloadurl);
		}
		else
		{
			doDownloadPrompt();
		}
	});

}

function downloadUrl(seed_url) {

	if(!seed_url){
		doDownloadPrompt();
		return;
	}
	//var url = require("url");
	//var path = require("path");
	var request = require("request");
	var fs = require("fs");
	//var parsed = url.parse(seed_url);
    //console.log(path.basename(parsed.pathname));
    var file_name = seed_url.split('/')[4];
	console.log("*****",seed_url.split('/')[4]);

	request(seed_url).pipe(fs.createWriteStream('./localseeds/' + seed_url.split('/')[4] + '.zip'))
	//require('./mox')(extension.url);

}

if (program.List) {

	var seeds       = localSeeds.slice(0);
	var loadedSeeds = [];
	var start            = 0;

	program.List = program.List == 1 ? 5 : program.List;

	function seedsSlice(start, length) {

		loadedSeeds = loadedSeeds.concat(seeds.splice(0, length));
		loadedSeeds.forEach
		(
			function (seed, i) {
				i = i + ''; 
				i = i.length == 1 ? ' '+ i +'  ' : ' ' + i + ' '; 
				if(i > 0 && (i * 1) % length == 0)
				{
					console.log('******----************----*****');
					console.log('******----************----*****');
					console.log('******----************----*****');
				}
				console.log('[%s] *** %s',i, seed); 
			}
		)
	}

	seedsSlice(start, program.List * 1);

	prompt.start();
	prompt.message = "";

	function doPromptGet() {

		prompt.get([promptProperties.paginate], function(err, result){ 
			if (result && result.page == '') {

				seedsSlice(start + (program.List * 1), (program.List * 1));
				doPromptGet();
			}else if( result ){ 
				//console.log(result);
				//console.log(localSeeds[result.page]);
				//var downloadExtension = extensionsE[result.page]; 
				var seed = localSeeds[result.page];
				if(seed){
					require('./mox')(seed);
				}
				//downloadTheExtension(downloadExtension);
			}
		});
	}
	doPromptGet(); 
}

if (program.download) { 
	prompt.start();
	prompt.message = "";
	if(program.download === true){
		console.log('Wrong command. Please try movl -d [url]');
		return;
	}

	if(program.download != ""){
		console.log('Adding seedproject to local collection');
		downloadUrl(program.download);
	}

	 
	
}