#!/usr/bin/env node
var program     = require('commander');
var prompt      = require('prompt');
var extensionsE = require('./example_links');
console.log(__dirname);
/*extensionsE['all'] = {
	name:'all',
	example_context:'ALL EXAMPLES',
	url:'https://github.com/orbitbot/chrome-extensions-examples/archive/master.zip'
};*/


program
  .version('0.0.0')
  .option('-l, --List [num]', 'List Available Project Seeds')
  .option('-d, --download [num]', 'Download Seed with number num')
  .parse(process.argv);

var promptProperties = {};

promptProperties.downloadnumber = {

  name:       'downloadnumber',
  message:    'Please specify a seed number to download. (\'all\' to download all)',
  validator:  /\d+|all/,
  warning:    'Must respond with a valid number or \'all\'',
  default:    '0'

};

promptProperties.paginate = {

	name:      'page',
	message:   'Hit <enter> to show more samples or [number] to download the sample \n',
	validator: /\s*|\d+/,
	default:   ''

}

function doDownloadPrompt() {

	prompt.message = "";
	prompt.get([promptProperties.downloadnumber], function (err, result) {

		if(result && result.downloadnumber){
			downloadTheExtension(result.downloadnumber);
		}
		else
		{
			doDownloadPrompt();
		}
	});

}

function downloadTheExtension(extension) {

	if(!extension){
		doDownloadPrompt();
		return;
	}

	console.log("*****",extension);
	require('./mox')(extension.url);

}

if (program.List) {

	var extensions       = extensionsE.slice(0);
	var loadedExtensions = [];
	var start            = 0;

	program.List = program.List == 1 ? 5 : program.List;

	function extensionsSlice(start, length) {

		loadedExtensions = loadedExtensions.concat(extensions.splice(0, length));
		loadedExtensions.forEach
		(
			function (extension, i) {
				i = i + ''; 
				i = i.length == 1 ? ' '+ i +'  ' : ' ' + i + ' '; 
				if(i > 0 && (i * 1) % length == 0)
				{
					console.log('******----************----*****');
					console.log('******----************----*****');
					console.log('******----************----*****');
				}
				console.log('[%s] *** %s',i, extension.example_context); 
			}
		)
	}

	extensionsSlice(start, program.List * 1);

	prompt.start();
	prompt.message = "";

	function doPromptGet() {

		prompt.get([promptProperties.paginate], function(err, result){ 
			if (result && result.page == '') {

				extensionsSlice(start + (program.List * 1), (program.List * 1));
				doPromptGet();
			}else if( result && /^\d+$|all/.test(result.page)){ 
				var downloadExtension = extensionsE[result.page]; 
				downloadTheExtension(downloadExtension);
			}
		});
	}
	doPromptGet(); 
}

if (program.download) { 
	prompt.start();
	prompt.message = "";
	if(program.download === true){
		console.log('Wrong command. Please try cesd -d [sample number]');
		return;
	}
	var downloadExtension = extensionsE[program.download];
	if(!downloadExtension){
		doDownloadPrompt();
	}
	else{
		console.log('Downloading "%s" %s' , downloadExtension.example_context, downloadExtension.name);
		downloadTheExtension(downloadExtension);
	}
	
}