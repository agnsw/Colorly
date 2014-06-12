# Colorly | [View Swatches](http://colorly.us)

A comprehensive library of color books from Pantone, ANPA, HKS, Focoltone, DIC, TOYO, and TRUMATCH - implemented in Sass, LESS, Stylus, JSON, and CSV. Contains a total of 21,652 colors from the following color books:

- ANPA
- DIC
- Focoltone
- HKS E Process
- HKS E
- HKS K Process
- HKS K
- HKS N Process
- HKS N 
- HKS Z Process
- HKS Z
- Pantone+ CMYK Coated
- Pantone+ CMYK Uncoated
- Pantone+ Color Bridge Coated 
- Pantone+ Color Bridge Uncoated
- Pantone+ Metallic Coated
- Pantone+ Pastels & Neons Coated
- Pantone+ Pastels & Neons Uncoated
- Pantone+ Premium Metallics Coated
- Pantone+ Solid Coated
- Pantone+ Solid Uncoated
- Pantone Solid Coated
- Pantone Solid Uncoated
- TOYO 94 Color Finder
- TOYO Color Finder
- TRUMATCH

**Note:** All color books are property of their respective owners, and they are not responsible for your experience with this library.

*****

### Sass

All you'll need for this is `scss/_pantone.scss` and Sass 3.1.0+ (since we're using a custom function).

```scss
@import "colorly";

.my-class {
	color: anpa( "72-0" );
}
```

*****

### Stylus

The function name and parameters are identical to the Sass version, so it's just the syntax differences.

```styl
@import "colorly.styl"

.my-class
  color anpa( "72-0" )
```

*****

### LESS

You'll need `less/_pantone.less`. The LESS version is implemented in variables. Use the naming convention `@pantone-[color-name]` to access them - like so:

```less
@import "colorly.less";

.my-class {
  color: @anpa-72-0;
}
```

**Important:** The LESS version is intended for **pre**-processing - the library of color variables is **HUGE**, so it's not intended to be downloaded for use on the client side. Don't be evil, pre-process your LESS stylesheets! :smile:

*****

### Use Single Book

Since there are several books and you may not want them all, all books have their own include files for all 3 preprocessors, then the main `colorly.[styl|less|scss]` just imports all of the individual books. So you can include a single color book in your project. This example is done with Sass, but I'm sure you can figure out how to handle it in your preprocessor of choice (if only based on the examples in this readme)! :smile:

```
@import "book-pantone-p-cmyk-uncoated";
```

*****

### Contribute!

Post an issue to suggest another color book for inclusion in the library. Or, fork the repo and submit a pull request to contribute to it yourself!

To contribute, you'll need to install [nodejs](http://nodejs.org/) and [Grunt](http://gruntjs.com/). Fork and clone the repo, then navigate to the directory from the terminal and type `npm install` to bring in all the dependencies. Then simply type `grunt` to start watching for file changes. This covers all files - templates, JSON, CSV, HTML, and Preprocessor compiling/testing - and handles building out the libraries for each preprocessor from the templates and JSON files.

Post an issue if you have any questions about how to do any step of this process. Happy Github-ing!

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


