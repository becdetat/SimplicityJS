SimplicityJS
============

Pattern matching in JavaScript

A port of [Simplicity for C#](https://github.com/bendetat/Simplicity) to JavaScript.

## Installation

### Bower

	bower install --save-dev simplicity

Add a reference to `./bower_components/simplicity/dist/simplicity.js`.

### ~~NPM~~

~~npm install --save-dev simplicity~~

~~Add a reference to `./node_modules/SimplicityJS/dist/simplicity.js`.~~

I haven't got NPM publishing yet.


## Usage

These examples are in ES6.

A function called `$patternMatch` is added to `window` and is the entry point to Simplicity. Call it with a value to perform the match on:

	var letter = 'f';
	var result = $patternMatch(letter)
		.with(x => 'a', 'Letter is A')
		.with(x => 'b', 'Letter is B')
		.with(x => 'c' <= x && x <= 'h', x => 'Letter ' + x + ' is between c and h')
		.else(x => 'Letter ' + x + ' is out of range')
		.do();

	// result = 'Letter f is between c and h'

Call it without a value and call `toFunc()` at the end of the method chain to get a function value that can be reused:

	var formatFuzzyAmount = $patternMatch()
		.with(0, 'None')
		.with(x => 0 < x && x <= 0.125, 'Just a bit')
		.with(x => 0.125 < x && x <= 0.29, 'About one quarter')
		.with(x => 0.29 < x && x <= 0.41, 'About one third')
		.with(x => 0.41 < x && x <= 0.58, 'About half')
		.with(x => 0.58 < x && x <= 0.7, 'About two thirds')
		.with(x => 0.7 < x && x <= 0.875, 'About three quarters')
		.with(x => 0.875 < x && x < 1, 'Almost all')
		.else('All')
		.toFunc();

	var oneQuarter = formatFuzzyAmount(0.25);
	var twoThirds = formatFuzzyAmount(0.66);

	// oneQuarter = 'About one quarter'
	// twoThirds = 'About two thirds'


## Building and contributing

1. Install NPM
2. Clone the SimplicityJS repo
3. `npm install`

SimplicityJS's source is in ES6, transpiled to ES5 (the widely currently supported version of JavaScript in browsers) using Babel via a Gulp script. To build, install Gulp globally (`npm install -g gulp`) and run `gulp` from the repo root. The default Gulp task will run Babel and write the result to `./dist/simplicity.js`.


## Versions

- 0.1.0 - first version, port of Simplicity for C#