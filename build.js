

// we'll need filesystem functionality
var fs = require('fs');



// template directory path, for DRY sake
var dir_tpl = "_dev/";

// set up a list of the files we'll create.
var files = JSON.parse( fs.readFileSync( dir_tpl+"books.json", "utf8" ) );

// open the book template files
var tpl_html = fs.readFileSync( dir_tpl+"book.html", "utf8" );
var tpl_stylus = fs.readFileSync( dir_tpl+"book.styl", "utf8" );
var tpl_scss = fs.readFileSync( dir_tpl+"book.scss", "utf8" );
var tpl_less = fs.readFileSync( dir_tpl+"book.less", "utf8" );
var tpl_index = fs.readFileSync( dir_tpl+"book.less", "utf8" );


// Loop through our files, limiting the number to process at once
var do_file = function( key ) {

	// if the file exists in our files array.
	if ( files[key] ) {

		var filename = files[key].filename;

		// open the file
		var records = JSON.parse( fs.readFileSync( "json/"+filename+".json", "utf8" ) );


		// some empty arrays for our colors
		var records_csv = [];
		var records_less = [];
		var records_scss = [];
		var records_html = [];
		var records_index = [];


		// start logging
		console.log( "" );
		console.log( "-------------------------------------------------------------------" );
		console.log( "  Book: "+files[key].title );
		console.log( "-------------------------------------------------------------------" );


		// variable name in Sass and Stylus
		var var_name = filename+'-colors';


		// loop through all the colors in this file.
		records.forEach(function( color ){

			// push another line of html
			records_html.push( '<div class="swatch" style="background-color: '+color.hex+';"><span>'+color.label+'</span></div>' );
			
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
				console.log( "> csv/"+filename+".csv created..." );
			}
		);



		// write out the index.html file
		fs.writeFile( 
			'book/'+filename+'.html', 
			tpl_html.replace( "{{colors}}", records_html.join("\n") ), function( err ){

			if (err) throw err;
			console.log('> book/'+filename+'.html created...');

		});



		// write out the Sass book file
		fs.writeFile( 'scss/_book-'+filename+'.scss', 
			tpl_scss.replace( "{{colors}}", records_scss.join(", ") ).replace( /\{\{var_name\}\}/g, var_name ).replace( "{{fn_name}}", filename ), 
			function( err ){
				if (err) throw err;
				console.log('> scss/_book-'+filename+'.scss created...');
			}
		);



		// write out the Stylus book file
		fs.writeFile( 'stylus/book-'+filename+'.styl', 
			tpl_stylus.replace( "{{colors}}", records_scss.join(" ") ).replace( /\{\{var_name\}\}/g, var_name ).replace( "{{fn_name}}", filename ), 
			function( err ){
				if (err) throw err;
				console.log('> stylus/book-'+filename+'.styl created...');
			}
		);



		// write out the LESS book file
		fs.writeFile( 'less/book-'+filename+'.less', 
			tpl_less.replace( "{{colors}}", records_less.join("\n") ), 
			function( err ){
				if (err) throw err;
				console.log('> less/book-'+filename+'.less created...');
			}
		);

		setTimeout(function(){
			do_file( key+1 );
		}, 10 );
	
	} else {

		setTimeout(function(){
			
			console.log( "" );
			console.log( "-------------------------------------------------------------------" );
			console.log( "  Main Files" );
			console.log( "-------------------------------------------------------------------" );
			
		}, 10 );

	}

};


do_file( 0 );


