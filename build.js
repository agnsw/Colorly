

// we'll need filesystem functionality
var fs = require('fs');



// template directory path, for DRY sake
var dir_tpl = "_dev/";

// set up a list of the files we'll create.
var files = JSON.parse( fs.readFileSync( dir_tpl+"books.json", "utf8" ) );

// open the book template files
var tpl_stylus = fs.readFileSync( dir_tpl+"book.styl", "utf8" );
var tpl_scss = fs.readFileSync( dir_tpl+"book.scss", "utf8" );

// open the index template files
var tpl_index = fs.readFileSync( dir_tpl+"index.html", "utf8" );



// arrays for each index file
var files_stylus = [], 
	files_scss = [],
	files_less = [],
	files_index = [];



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

			var hex = color.hex.replace( '/' )

			// push another line of html
			records_html.push( '<div class="swatch" style="background-color: '+color.hex+';"><span>'+color.label+'</span></div>' );
			
			// push another scss array value
			records_scss.push( '("'+color.label+'" '+color.hex+')' );
			
			// push another less array value
			records_less.push( '@'+filename+'-'+color.label+': '+color.hex+';' );
			
			// push another xml record
			records_csv.push( '"'+color.name+'","'+color.label+'","'+color.hex+'"' );

		});


		// stylus files
		files_less.push( "\n// " + files[key].title + '\n@import "book-'+filename+'.less";' );

		// stylus files
		files_scss.push( "\n// " + files[key].title + '\n@import "book-'+filename+'";' );

		// stylus files
		files_stylus.push( "\n// " + files[key].title + '\n@import "book-'+filename+'.styl"' );

		// stylus files
		files_index.push( '<li><a rel="' + filename + '">' + files[key].title + ' <span>' + records.length + ' colors</span></a></li>' );


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
			'book/'+filename+'.html', records_html.join("\n"), function( err ){

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
		fs.writeFile( 'less/book-'+filename+'.less', "// "+filename+"\n"+records_less.join("\n"), 
			function( err ){
				if (err) throw err;
				console.log('> less/book-'+filename+'.less created...');
			}
		);


		// delay a tiny bit before grabbing the next file
		setTimeout(function(){
			do_file( key+1 );
		}, 20 );

	
	} else {

		// once we're done creating book files, generate
		// the index file after another short delay.
		setTimeout(function(){
			
			// start outputting main file generation progress
			console.log( "" );
			console.log( "-------------------------------------------------------------------" );
			console.log( "  Main Files" );
			console.log( "-------------------------------------------------------------------" );
			

			// write out the Sass book file
			fs.writeFile( 'scss/_colorly.scss', files_scss.join("\n"), function( err ){
				if (err) throw err;
				console.log('> scss/_colorly.scss created...');
			});


			// write out the Stylus book file
			fs.writeFile( 'stylus/colorly.styl', files_stylus.join("\n"), function( err ){
				if (err) throw err;
				console.log('> stylus/colorly.styl created...');
			});


			// write out the LESS book file
			fs.writeFile( 'less/colorly.less', files_less.join("\n"), function( err ){
				if (err) throw err;
				console.log('> less/colorly.less created...');
			});


			// write out the LESS book file
			fs.writeFile( 'index.html', tpl_index.replace( "{{colors}}", files_index.join("\n") ), function( err ){
				if (err) throw err;
				console.log('> less/colorly.less created...');
			});

		}, 20 );

	}

};



// aaaand start the loop
do_file( 0 );


