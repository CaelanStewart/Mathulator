const NUMERIC_CHARSET = '01234567890.',
	  ALPHA_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_',
	  OPERATOR_CHARSET = '+-/*^%',
	  WHITE_SPACE_REGEX = /\s/,
	  Decimal = require('decimal.js');
	  
Decimal.config({ precision: 20 });

const MathFunctions = {
	fact: function (value) {
		if(arguments.length !== 1) {
			throw new Error("function 'fact' requires exactly one argument");
		}

		var iter,
			multiplier,
			returnValue = value;

		for(multiplier = value - 1; multiplier > 0; --multiplier) {
			returnValue = returnValue.times(multiplier);
		}

		return returnValue;
	},
	rad: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'rad' requires exactly one argument");
		}

		return n.times(Math.PI).dividedBy(180);
	},
	deg: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'rad' requires exactly one argument");
		}

		return n.times(180).dividedBy(Math.PI);
	},
	rand: function(min, max) {
		return new Decimal(Math.random()).times(max.minus(min).add(1)).add(min).floor();
		//return Math.floor(Math.random() * (max - min + 1) + min);
	},
	randf: function() {
		return new Decimal(Math.random());
	},
	round: function(n, toMultiple) {
		if(typeof toMultiple !== 'undefined') {
			return n.dividedBy(toMultiple).round().times(toMultiple);
		} else {
			return n.round();
		}
	},
	ceil: function(n, toMultiple) {
		if(typeof toMultiple !== 'undefined') {
			return n.dividedBy(toMultiple).ceil().times(toMultiple);
		} else {
			return n.ceil();
		}
	},
	floor: function(n, toMultiple) {
		if(typeof toMultiple !== 'undefined') {
			return n.dividedBy(toMultiple).floor().times(toMultiple);
		} else {
			return n.floor();
		}
	},
	sign: function(n) {
		return new Decimal(n.s);
	}
},
allowedMathFunctions = [
	'abs',
	'acos',
	'acosh',
	'asin',
	'asinh',
	'atan',
	'atanh',
	'atan2',
	'cbrt',
	'cos',
	'exp',
	'hypot',
	'ln',
	'log',
	'log10',
	'log2',
	'max',
	'min',
	'pow',
	'sin',
	'sinh',
	'sqrt',
	'tan',
	'tanh'
];

const Helpers = {
	isNumeric: char => NUMERIC_CHARSET.indexOf(char) !== -1,
	isAlpha: char => ALPHA_CHARSET.indexOf(char) !== -1,
	isOperator: char => OPERATOR_CHARSET.indexOf(char) !== -1,
	isMathFunction: keyword => typeof MathFunctions[keyword] === 'function' || allowedMathFunctions.indexOf(keyword) !== -1,
	isWhitespace: char => WHITE_SPACE_REGEX.test(char),
	radians: angle => angle * Math.PI / 180
};

const OperatorFunctions = {
	'+': (left, right) => left.add(right),
	'-': (left, right) => left.minus(right),
	'/': (left, right) => left.dividedBy(right),
	'*': (left, right) => left.times(right),
	'%': (left, right) => left.modulo(right),
	'^': (left, right) => left.pow(right)
};

function clone(obj) {
	if(typeof obj === 'object') {
		if(obj.constructor.name === 'Decimal') {
			return obj;	
		} else if(obj.constructor.name === 'Array' && typeof obj.length === 'number') {
			var len = obj.length,
				cln = [ ],
				iter;
			
			for(iter = 0; iter < len; ++iter) {
				cln.push(clone(obj[iter]));
			}
			
			return cln;
		} else {
			let key,
				cln = { };
			
			for(key in obj) {
				if(obj.hasOwnProperty(key)) {
					cln[key] = clone(obj[key]);	
				}
			}
			
			return cln;
		}
	}
	
	return obj;
}

function getListPrimitiveArray(itms) {
	var items = itms,
		itemsLength = items.length,
		iter,
		primitives = [ ];

	for(iter = 0; iter < itemsLength; ++iter) {
		primitives.push(items[iter][1]);
	}

	return primitives;
}

function ExpressionParser(variables, macros) {
	'use strict';

	if(Object.prototype.toString.call(variables) === '[object Object]') {
		this.variables = variables
	} else {
		this.variables = {
			pi: new Decimal(Math.PI),
			PI: new Decimal(Math.PI),
			e: new Decimal(Math.E),
			E: new Decimal(Math.E),
			randf: () => new Decimal(Math.random())
		};
	}

	if(Object.prototype.toString.call(macros) === '[object Object]') {
		this.macros = macros;
	} else {
		this.macros = { };
	}

	this.variableSetCallbacks = { };
	this.macroSetCallbacks = { };
	
	this.eventCallbacks = {
		'variable-set': [ ],
		'macro-set': [ ]
	}

	this.readOnlyVariables = ['pi', 'PI', 'e', 'E', 'randf'];
	
	this.settings = {
		sciNotation: true	
	};
};

ExpressionParser.prototype.on = function(type, callback) {
	if(typeof type !== 'string') {
		throw new Error('Event type must be a string');
	}
	
	if(!this.eventCallbacks.hasOwnProperty(type)) {
		throw new Error('Invalid event type "' + type + '"');
	}
	
	if(typeof callback !== 'function') {
		throw new Error('Callback must be a function');
	}
	
	this.eventCallbacks[type].push(callback);
};

ExpressionParser.prototype.off = function(type, callback) {
	if(typeof type !== 'string') {
		throw new Error('Event type must be a string');
	}
	
	if(!this.eventCallbacks.hasOwnProperty(type)) {
		throw new Error('Invalid event type "' + type + '"');
	}
	
	if(typeof callback !== 'undefined' && typeof callback !== 'function') {
		throw new Error('Callback must be a function');
	}
	
	// Clear all events of this type
	if(typeof callback === 'undefined') {
		this.eventCallbacks[type] = [ ];
	}
	
	let callbacks = this.eventCallbacks[type],
		len = callbacks.length,
		index;
		
	for(index = 0; index < len; ++index) {
		if(callback === callbacks[iter]) {
			callbacks.splice(index, 1);
		}
	}
};

ExpressionParser.prototype.trigger = function(type, argArray) {
	if(typeof type !== 'string') {
		throw new Error('Event type must be a string');
	}
	
	if(!this.eventCallbacks.hasOwnProperty(type)) {
		throw new Error('Invalid event type "' + type + '"');
	}
	
	this.eventCallbacks[type].forEach(callback => callback.apply(null, argArray));
};

/* Sets a variable */
ExpressionParser.prototype.setVariable = function(name, value, triggerEvent) {
	'use strict';

	if(this.readOnlyVariables.indexOf(name) !== -1) {
		throw new Error('Cannot set read only variable "' + name + '"');
	}
	
	if(typeof value === 'string') {
		value = new Decimal(value);
	}

	if(triggerEvent !== false) {
		this.trigger('variable-set', [name, value]);
	}

	this.variables[name] = value;
};

/* Gets a variable */
ExpressionParser.prototype.getVariable = function(name) {
	'use strict';

	if(this.isVariable(name)) {
		let variable = this.variables[name];

		if(typeof variable === 'function') {
			variable = variable();
		}
		
		if(typeof variable === 'number' || typeof variable === 'string') {
			variable = new Decimal(variable);	
		}

		return variable;
	}

	return undefined;
};

/* Checks if a variable exists */
ExpressionParser.prototype.isVariable = function(name) {
	'use strict';

	return this.variables.hasOwnProperty(name);
};

ExpressionParser.prototype.setMacro = function(name, argList, exprTkns, triggerEvent) {
	'use strict';

	this.macros[name] = {
		argList: argList,
		exprTkns: exprTkns
	};

	if(triggerEvent !== false) {
		this.trigger('macro-set', [name, argList, exprTkns]);
	}
};

ExpressionParser.prototype.runMacro = function(name, list) {
	'use strict';

	if(name in this.macros) {
		let macro = this.macros[name],
			vars = { },
			ep;

		if(list.length !== macro.argList.length) {
			throw new Error('Macro "' + name + '" takes ' + macro.argList.length + ' arguments');
		}

		ep = new ExpressionParser(clone(this.variables), clone(this.macros));

		macro.argList.forEach((arg, index) => {
			ep.setVariable(arg[1], list[index]);
		});

		let tkns = ep.parseTokens(clone(macro.exprTkns));

		if(tkns.length === 1 && tkns[0][0] === 'number') {
			return tkns[0][1];
		}
	}

	return [];
};

/* Parse an expression */
ExpressionParser.prototype.parse = function(expression) {
	'use strict';

	var tokens = this.tokenize(expression);

	tokens = this.parseTokens(tokens);

	var tokensLength = tokens.length,
		iter,
		value = null,
		last_number = null;

	for(iter = 0; iter < tokensLength; ++iter) {
		// Get the value
		if(tokens[iter][0] === 'number') {
			value = tokens[iter][1];
		}
	}

	return this.settings.sciNotation ? value : value.toFixed();
};

/* Parse tokens */
ExpressionParser.prototype.parseTokens = function(tkns) {
	'use strict';

	var tokens = tkns;

	tokens = this.parseArgLists(tokens);
	tokens = this.parseMacros(tokens);
	tokens = this.parseLists(tokens);
	tokens = this.parseBrackets(tokens);
	tokens = this.parseVariables(tokens);
	tokens = this.parseNegatives(tokens);
	tokens = this.parseFunctions(tokens);
	tokens = this.parseOperations(tokens);
	tokens = this.parseAssignments(tokens);

	return tokens;
};

ExpressionParser.prototype.parseAssignments = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		bracketDepth = 0,
		bracketIndex = 0,
		iter;

	for(iter = tokensLength - 1; iter >= 0; --iter) {
		if(
			tokens[iter][0] === 'keyword' &&
			iter + 2 < tokensLength &&
			tokens[iter + 1][0] === 'assignment' &&
			tokens[iter + 2][0] === 'number'

		) {
			let varName = tokens[iter][1],
				value = tokens[iter + 2][1];

			this.setVariable(varName, value);

			tokensLength -= tokens.splice(iter, 2).length;
		}
	}

	console.log(tokens);

	return tokens;
};

ExpressionParser.prototype.parseMacros = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		bracketDepth = 0,
		bracketIndex = 0,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		if(
			tokens[iter][0] === 'keyword' &&
			iter + 2 < tokensLength &&
			tokens[iter + 1][0] === 'arglist' &&
			tokens[iter + 2][0] === 'assignment'
		) {
			if(Helpers.isMathFunction(tokens[iter][1]) || this.isVariable(tokens[iter][1])) {
				throw new Error('Keyword "' + tokens[iter][1] + '" is reserved');
			}

			if(iter !== 0) {
				throw new Error('Macro definition must be solitary');
			}

			let exprTkns = tokens.slice(iter + 3);

			if(!exprTkns.length) {
				throw new Error('Macro is missing an expression');
			}

			this.setMacro(tokens[iter][1], tokens[iter + 1][1], exprTkns);

			// Only one macro definition per parse
			return [ ];
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseArgLists = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		braceDepth = 0,
		braceIndex = 0,
		iter,
		flag_list = true,
		items = [ ],
		listIndex = 0;

	for(iter = 0; iter < tokensLength; ++iter) {
		if(tokens[iter][0] === 'brace') {

			if(tokens[iter][1] === '}' && braceDepth === 0) {
				throw new Error('Invalid brace syntax');
			}

			if(braceDepth > 0) {
				if(tokens[iter][1] === '}') {
					--braceDepth;
				}

				if(braceDepth === 0 && flag_list) {
					let argTokens = tokens.slice(listIndex + 1, iter);

					if(argTokens.length !== 1 || argTokens[0][0] !== 'keyword') {
						throw new Error('Invalid argument list syntax');
					}

					items.push(argTokens[0]);

					let leftSide = tokens.slice(0, braceIndex),
						rightSide = tokens.slice(iter + 1),
						replace = [['arglist', items]];

					tokens = leftSide.concat(replace, rightSide);
					iter += tokens.length - tokensLength;
					tokensLength = tokens.length;
					flag_list = false;
				}
			}

			if(tokens[iter][1] === '{') {
				if(braceDepth === 0) {
					braceIndex = iter;
					listIndex = iter;
				}

				braceDepth++;
			}
		}

		if(tokens[iter][0] === 'comma' && braceDepth === 1) {
			if(	// Check for correct comma syntax
				tokens[iter - 1][0] !== 'comma' &&
				(
					tokens[iter - 1][0] !== 'brace' ||
					(
						tokens[iter - 1][0] === 'brace' &&
						tokens[iter - 1][1] !== '{'
					)
				) &&
				(
					(
						iter + 1 < tokensLength &&
						tokens[iter + 1][0] !== 'comma'
					) ||
					iter + 1 === tokensLength
				)
			) {
				if(items === null) {
					items = [ ];
				}

				let argTokens = tokens.slice(listIndex + 1, iter);

				listIndex = iter;

				if(argTokens.length !== 1 || argTokens[0][0] !== 'keyword') {
					throw new Error('Invalid argument list syntax');
				}

				items.push(argTokens[0]);

				flag_list = true;

				continue;
			} else {
				throw new Error('Unexpected comma');
			}
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseLists = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		bracketDepth = 0,
		bracketIndex = 0,
		iter,
		flag_list = false,
		items = null,
		listIndex = 0;

	for(iter = 0; iter < tokensLength; ++iter) {
		if(tokens[iter][0] === 'bracket') {

			if(tokens[iter][1] === ')' && bracketDepth === 0) {
				throw new Error('Invalid bracket syntax');
			}

			if(bracketDepth > 0) {
				if(tokens[iter][1] === ')') {
					--bracketDepth;
				}

				if(bracketDepth === 0 && flag_list) {
					let argTokens = tokens.slice(listIndex + 1, iter);

					if(argTokens.length) {
						argTokens = this.parseTokens(clone(argTokens));

						items.push(argTokens[0]);
					}

					let leftSide = tokens.slice(0, bracketIndex),
						rightSide = tokens.slice(iter + 1),
						replace = [['list', items]];

					tokens = leftSide.concat(replace, rightSide);
					iter += tokens.length - tokensLength;
					tokensLength = tokens.length;
					flag_list = false;
				}
			}

			if(tokens[iter][1] === '(') {
				if(bracketDepth === 0) {
					bracketIndex = iter;
					listIndex = iter;

					if(
						iter - 1 >= 0 &&
						tokens[iter - 1][0] === 'keyword'
					) {
						flag_list = true;
						items = [ ];
					}
				}

				bracketDepth++;
			}
		}

		if(tokens[iter][0] === 'comma' && bracketDepth === 1) {
			if(	// Check for correct comma syntax
				tokens[iter - 1][0] !== 'comma' &&
				(
					tokens[iter - 1][0] !== 'bracket' ||
					(
						tokens[iter - 1][0] === 'bracket' &&
						tokens[iter - 1][1] !== '('
					)
				) &&
				(
					(
						iter + 1 < tokensLength &&
						tokens[iter + 1][0] !== 'comma'
					) ||
					iter + 1 === tokensLength
				)
			) {
				if(items === null) {
					items = [ ];
				}

				let argTokens = tokens.slice(listIndex + 1, iter);

				listIndex = iter;

				if(argTokens.length) {
					argTokens = this.parseTokens(clone(argTokens));
				}

				items.push(argTokens[0]);
				flag_list = true;

				continue;
			} else {
				throw new Error('Unexpected comma');
			}
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseBrackets = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		bracketDepth = 0,
		bracketIndex = 0,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		if(tokens[iter][0] === 'bracket') {
			if(tokens[iter][1] === ')' && bracketDepth === 0) {
				throw new Error('Invalid bracket syntax');
			}

			if(bracketDepth > 0) {
				if(tokens[iter][1] === ')') {
					--bracketDepth;
				}

				if(bracketDepth === 0) {
					let leftSide = tokens.slice(0, bracketIndex),
						rightSide = tokens.slice(iter + 1),
						parsed;
						
					parsed = this.parseTokens(clone(tokens.slice(bracketIndex + 1, iter)));

					tokens = leftSide.concat(parsed, rightSide);
					iter += tokens.length - tokensLength;
					tokensLength = tokens.length;
				}
			}

			if(tokens[iter][1] === '(') {
				if(bracketDepth === 0) {
					bracketIndex = iter;
				}

				++bracketDepth;
			}
		}
	}

	if(bracketDepth > 0) {
		throw new Error('Invalid bracket syntax');
	}

	return tokens;
};

ExpressionParser.prototype.parseNegatives = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		// Logic for a negative number
		if(
			tokens[iter][0] === 'operator' &&
			(
				tokens[iter][1] === '-' ||          // Check it's a minus symbol
				tokens[iter][1] === '+'             // Or a plus symbol
			) &&
			(
				iter - 1 < 0 ||                     // Either there is no previous token...
				tokens[iter - 1][0] !== 'number'    // Or it's not a number
			) &&
			iter + 1 < tokensLength &&              // Check there is a proceeding token
			tokens[iter + 1][0] === 'number'        // And it's a number
		) {
			// Make the next number a negative
			tokens[iter + 1][1] = tokens[iter][1] === '-' ? tokens[iter + 1][1].negated() : tokens[iter + 1][1];
			// Remove this token from stack
			tokens.splice(iter, 1);
			--tokensLength;
			--iter;
			continue;
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseVariables = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		if(tokens[iter][0] === 'keyword') {
			if(
				(
					iter === tokensLength - 1 ||            // Either this is the last token
					tokens[iter + 1][0] !== 'assignment'    // Or the next token is not an assignment
				) &&
				(
					iter === tokensLength - 1 ||
					(
						tokens[iter + 1][0] !== 'list' &&
						tokens[iter + 1][0] !== 'number'
					)
				)
			) {
				// Check variable exists
				if(this.isVariable(tokens[iter][1])) {
					if(
						iter - 1 >= 0 &&
						tokens[iter - 1][0] === 'number'
					) {
						tokens[iter][0] = 'number';
						tokens[iter][1] = this.getVariable(tokens[iter][1]).times(tokens[iter - 1][1]);

						let leftSide = tokens.slice(0, iter - 1),
							rightSide = tokens.slice(iter);

						tokens = leftSide.concat(rightSide);

						--iter;
						--tokensLength;
					} else {
						tokens[iter][0] = 'number';
						tokens[iter][1] = this.getVariable(tokens[iter][1]);
					}

					continue;
				} else {
					throw new Error('Undefined variable "' + tokens[iter][1] + '"');
				}
			}
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseFunctions = function(tkns) {
	'use strict';

	var tokens = tkns,
		tokensLength = tokens.length,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		if(
			tokens[iter][0] === 'keyword' &&
			iter + 1 < tokensLength &&
			(
				tokens[iter + 1][0] === 'number' ||
				tokens[iter + 1][0] === 'list'
			)
		) {
			if(
				tokens[iter][1] in MathFunctions ||
				allowedMathFunctions.indexOf(tokens[iter][1]) !== -1 ||
				tokens[iter][1] in this.macros
			) {
				let mathFunction,
					context,
					macro,
					primitives;
				

				if(tokens[iter + 1][0] !== 'list') {
					tokens[iter + 1] = [
						'list',
						[
							tokens[iter + 1]
						]
					];	
				}
				
				primitives = getListPrimitiveArray(tokens[iter + 1][1]);

				if(allowedMathFunctions.indexOf(tokens[iter][1]) !== -1) {
					tokens[iter + 1] = [
						'number',
						Decimal[tokens[iter][1]].apply(Decimal, primitives)
					];
				} else if(tokens[iter][1] in MathFunctions) {
					tokens[iter + 1] = [
						'number',
						MathFunctions[tokens[iter][1]].apply(MathFunctions, primitives)
					];
				} else if(tokens[iter][1] in this.macros) {
					tokens[iter + 1] = [
						'number',
						this.runMacro(tokens[iter][1], primitives)
					];
				}

				// Remove this token from stack
				tokens.splice(iter, 1);
				--tokensLength;
				--iter;
			} else {
				throw new Error('Undefined function "' + tokens[iter][1] + '"');
			}
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseOperations = function(tkns) {
	'use strict';

	// Order of operations
	var operators = ['^', '*', '/', '+', '-'],
		tokens = tkns,
		self = this;

	operators.forEach(operator => tokens = self.parseOperator(tokens, operator));

	return tokens;
};

ExpressionParser.prototype.parseOperator = function(tkns, oprtr) {
	'use strict';

	var tokens = tkns,
		operator = oprtr,
		tokensLength = tokens.length,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		var token = tokens[iter],
			token_type = token[0],
			token_value = token[1];

		if(token_type === 'operator' && token_value === operator) {
			if(
				iter - 1 >= 0 &&                        // Check there is a previous token
				iter + 1 < tokensLength &&              // Check there is a next token
				tokens[iter - 1][0] === 'number' &&     // Check the previous token is a number
				tokens[iter + 1][0] === 'number'        // Check the next token is a number
			) {
				tokens[iter + 1][1] = OperatorFunctions[token_value](tokens[iter - 1][1], tokens[iter + 1][1]);

				let leftSide = tokens.slice(0, iter - 1),
					rightSide = tokens.slice(iter + 1);

				// Replace sub-expression with the result value
				tokens = leftSide.concat(rightSide);
				iter += tokens.length - tokensLength;
				tokensLength = tokens.length;

				continue;
			} else {
				throw new Error('unexpected operator "' + tokens[iter][1] + '"');
			}
		}
	}

	return tokens;
};

/**
 * Split expression into tokens
 */
ExpressionParser.prototype.tokenize = function(expr) {
	'use strict';

	// TOKENIZER VARS
	var expression = expr + ' ', // Append space so that the last character before that space is tokenised
		expressionLength = expression.length,
		iter,
		tokens = [ ],
		buffer = '';

	// FLAGS
	var flag_numeric = false,
		flag_keyword = false,
		flag_operator = false,
		flag_sciNotation = false;

	// Iterate through expression
	for(iter = 0; iter < expressionLength; ++iter) {
		let char = expression.charAt(iter),
			char_isNumeric = Helpers.isNumeric(char),
			char_isOperator = Helpers.isOperator(char),
			char_isAlpha = Helpers.isAlpha(char);

		if(flag_keyword) {
			// We've reached the end of the keyword
			if(!char_isAlpha) {
				flag_keyword = false;
				tokens.push(['keyword', buffer]);
				buffer = '';
			}
		}

		if(flag_numeric) {
			// We've reached the end of the number
			if(!char_isNumeric) {
				if(char === 'e') {
					flag_sciNotation = true;
					buffer += char;
					continue;
				}

				if(flag_sciNotation && (char === '+' || char === '-')) {
					flag_sciNotation = false;
					buffer += char;
					continue;
				}

				tokens.push(['number', new Decimal(buffer)]);

				flag_numeric = false;
				flag_sciNotation = false;
				buffer = '';
			} else {
				flag_sciNotation = false;
			}
		}

		if(char_isNumeric) {                     // Check for a number
			flag_numeric = true;
			buffer += char;
		} else if(char_isAlpha) {                // Check for a keyword
			flag_keyword = true;
			buffer += char;
		} else if(char_isOperator) {             // Check for an operator
			tokens.push(['operator', char]);
		} else if(char === '(' || char === ')') {                // Check for parentheses
			tokens.push(['bracket', char]);
		} else if(char === '=') {                // Check for assignment
			tokens.push(['assignment', char]);
		} else if(char === ',') {
			tokens.push(['comma', char]);
		} else if(char === '{' || char === '}') {
			tokens.push(['brace', char]);
		} else if(!Helpers.isWhitespace(char)) { // Check for whitespace
			throw new Error('Unexpected char "' + char + '"');
		}
	}

	return tokens;
};
