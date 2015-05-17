window.$patternMatch = matchOn => {
	var self = {};
	var cases = [];
	var elseCase = null;
	
	self.with = (condition, result) => {
		cases.push({
			condition: condition,
			result: result
		});
		return self;
	};
	self.else = result => {
		elseCase = result;
		return self;
	};
	self.do = (value) => {
		value = (value || value === false) ? value : matchOn;
		for (var i in cases) {
			var result = typeof cases[i].condition == 'function'
				? cases[i].condition(value)
				: cases[i].condition == value;
			if (result) {
				return typeof cases[i].result == 'function'
					? cases[i].result(value)
					: cases[i].result;
			}
		}
		if (elseCase || elseCase === false) {
			return typeof elseCase == 'function' ? elseCase(value) : elseCase;
		}
		throw 'Incomplete pattern match';
	};
	self.toFunc = () => self.do;

	return self;
};