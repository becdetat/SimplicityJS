// Usage:
// import match from 'simplicity'
// match('a')
// 	 .with(x => x == 'a', 'letter is A')
//   .else(() => 'unknown letter')
//   .do()

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.match = match;

function match(matchOn) {
	var self = {};
	var cases = [];
	var elseCase = null;

	self['with'] = function (condition, result) {
		cases.push({
			condition: condition,
			result: result
		});
		return self;
	};
	self['else'] = function (result) {
		elseCase = result || function () {
			return result;
		};

		return self;
	};
	self['do'] = function (value) {
		value = value || value === false ? value : matchOn;
		for (var i in cases) {
			var result = typeof cases[i].condition == 'function' ? cases[i].condition(value) : cases[i].condition == value;
			if (result) {
				return typeof cases[i].result == 'function' ? cases[i].result(value) : cases[i].result;
			}
		}
		if (elseCase || elseCase === false) {
			return typeof elseCase == 'function' ? elseCase(value) : elseCase;
		}
		throw 'Incomplete pattern match';
	};
	self.toFunc = function () {
		return self['do'];
	};

	return self;
}