

// we'll need filesystem functionality
var fs = require('fs');


// if a filename is passed into this script
if ( process.argv[2] ) {

	// quick reference variable for the filename
	var filename = process.argv[2].replace( "_json/", "" ).replace( ".json", "" );

	// start output
	console.log( "" );
	console.log( "-------------------------------------------------------------------" );
	console.log( "  Processing: " );
	console.log( "  "+filename );
	console.log( "-------------------------------------------------------------------" );

	// open the file
	var records = JSON.parse( fs.readFileSync( process.argv[2], "utf8" ) );

	// template directory path, for DRY sake
	var dir_tpl = "_tpl/";

	// open the book template files
	var tpl_html = fs.readFileSync( dir_tpl+"book.html", "utf8" );
	var tpl_stylus = fs.readFileSync( dir_tpl+"book.styl", "utf8" );
	var tpl_scss = fs.readFileSync( dir_tpl+"book.scss", "utf8" );
	var tpl_less = fs.readFileSync( dir_tpl+"book.less", "utf8" );


	// some empty arrays for our colors
	var records_csv = [];
	var records_less = [];
	var records_scss = [];
	var records_html = [];


	// variable name in Sass and Stylus
	var var_name = filename+'-colors';


	// loop through all the colors in this file.
	records.forEach(function( color ){

		// push another line of html
		records_html.push( '<div class="color visible" style="background-color: '+color.hex+';"><span>'+color.label+'</span></div>' );
		
		// push another scss array value
		records_scss.push( '("'+color.label+'" '+color.hex+')' );
		
		// push another less array value
		records_less.push( '@pantone-'+color.label+': '+color.hex+';' );
		
		// push another xml record
		records_csv.push( '"'+color.name+'","'+color.label+'","'+color.hex+'"' );

	});



	// write out the csv file
	fs.writeFile( 
		"csv/"+filename+".csv", 
		records_csv.join( "\n" ), 
		function( err ) {
			if ( err ) throw err;
			console.log( "> generated csv/"+filename+".csv..." );
		}
	);



	// write out the index.html file
	fs.writeFile( 
		'book/'+filename+'.html', 
		tpl_html.replace( "{{colors}}", records_html.join("\n") ), function( err ){

		if (err) throw err;
		console.log('> generated book/'+filename+'.html...');

	});



	// write out the Sass book file
	fs.writeFile( 'scss/_book-'+filename+'.scss', 
		tpl_scss.replace( "{{colors}}", records_scss.join(", ") ).replace( /\{\{var_name\}\}/g, var_name ).replace( "{{fn_name}}", filename ), 
		function( err ){
			if (err) throw err;
			console.log('> generated scss/_book-'+filename+'.scss...');
		}
	);



	// write out the Stylus book file
	fs.writeFile( 'stylus/book-'+filename+'.styl', 
		tpl_stylus.replace( "{{colors}}", records_scss.join(" ") ).replace( /\{\{var_name\}\}/g, var_name ).replace( "{{fn_name}}", filename ), 
		function( err ){
			if (err) throw err;
			console.log('> generated stylus/book-'+filename+'.styl...');
		}
	);



	// write out the LESS book file
	fs.writeFile( 'less/book-'+filename+'.less', 
		tpl_less.replace( "{{colors}}", records_less.join("\n") ), 
		function( err ){
			if (err) throw err;
			console.log('> generated less/book-'+filename+'.less...');
		}
	);


} else {

	// error if no input file is passed
	console.log( "Please specify an input file." );

}

