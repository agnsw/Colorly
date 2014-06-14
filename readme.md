# [Colorly](http://colorly.us) [![GitHub version](https://badge.fury.io/gh/jpederson%2Fcolorly.svg)](http://badge.fury.io/gh/jpederson%2Fcolorly)

A comprehensive library of color books from Pantone, ANPA, HKS, Focoltone, DIC, TOYO, and TRUMATCH - implemented in Sass, LESS, Stylus, JSON, and CSV. Contains a total of 21,652 colors from the following color books:

- Pantone (original)
  - Solid Coated
  - Solid Uncoated
- Pantone+
  - CMYK Coated
  - CMYK Uncoated
  - Color Bridge Coated 
  - Color Bridge Uncoated
  - Metallic Coated
  - Pastels & Neons Coated
  - Pastels & Neons Uncoated
  - Premium Metallics Coated
  - Solid Coated
  - Solid Uncoated
- ANPA
- DIC
- Focoltone
- HKS 
  - E Process
  - E
  - K Process
  - K
  - N Process
  - N
  - Z Process
  - Z
- TOYO 94 Color Finder
- TOYO Color Finder
- TRUMATCH

**Note:** All color books are the property of their respective owners, and they are not responsible for your experience with this library.

*****

### Installation

I've tried to make it as easy as possible to install Colorly:

##### Bower [![Bower version](https://badge.fury.io/bo/colorly.svg)](http://badge.fury.io/bo/colorly)

```shell
bower install colorly
```

##### NPM [![NPM version](https://badge.fury.io/js/colorly.svg)](http://badge.fury.io/js/colorly)

```shell
npm install colorly
```

##### Git [![GitHub version](https://badge.fury.io/gh/jpederson%2Fcolorly.svg)](http://badge.fury.io/gh/jpederson%2Fcolorly)

```shell
git clone https://github.com/jpederson/Colorly
```

Or, you know - the download button on the right or any of the versions linked in the "Releases" tab.

*****

### Sass

You'll need everything in the `scss/` folder and Sass 3.1.0+ (since we're using a custom function).

```scss
@import "colorly";

.my-class {
	color: anpa( "72-0" );
}
```

**Tip:** Visit [colorly.us](http://colorly.us) and show the usage instructions - while you browse the books, it'll display the function names.

*****

### Stylus

The function name and parameters are identical to the Sass version, so it's just the syntax differences. 

```styl
@import "colorly.styl"

.my-class
  color anpa( "72-0" )
```

**Tip:** Visit [colorly.us](http://colorly.us) and show the usage instructions - while you browse the books, it'll display the function names.

*****

### LESS

You'll need everything in the `less` folder. The LESS version is implemented in variables. Use the naming convention `@[book-name]-[color-name]` to access them - like so:

```less
@import "colorly.less";

.my-class {
  color: @anpa-72-0;
}
```

**Tip:** Visit [colorly.us](http://colorly.us) and show the usage instructions - while you browse the books, it'll display the `[book-name]` values you can use.

**Important:** The LESS version is intended for **pre**-processing - the library of color variables is **HUGE**, so it's not intended to be downloaded for use on the client side. Don't be evil, pre-process your LESS stylesheets! :smile:

*****

### Use Single Book

Since there are several books and you may not want them all, all books have their own include files for all 3 preprocessors, then the main `colorly.[styl|less|scss]` just imports all of the individual books. So you can include a single color book in your project. This example is done with Sass, but I'm sure you can figure out how to handle it in your preprocessor of choice (if only based on the examples in this readme)! :smile:

```scss
@import "book-pantone-p-cmyk-uncoated";
```

*****

### Contribute!

Post an issue to suggest another color book for inclusion in the library. Or, fork the repo and submit a pull request to contribute to it yourself!

To contribute, you'll need to install [nodejs](http://nodejs.org/) and [Grunt](http://gruntjs.com/). Fork and clone the repo, then navigate to the directory from the terminal and type `npm install` to bring in all the dependencies. Then simply type `grunt` to start watching for file changes. This covers all files - templates, JSON, CSV, HTML, and Preprocessor compiling/testing - and handles building out the libraries for each preprocessor from the templates and JSON files.

Post an issue if you have any questions about how to do any step of this process. Happy Github-ing!

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


