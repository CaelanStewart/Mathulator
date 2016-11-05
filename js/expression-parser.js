const NUMERIC_CHARSET = '01234567890.',
      ALPHA_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_',
      OPERATOR_CHARSET = '+-/*^%',
	  WHITE_SPACE_REGEX = /\s/;

const MathFunctions = {
    fact: function (value) {
		if(arguments.length !== 1) {
			throw new Error("function 'fact' requires exactly one argument");
		}

        var iter,
            multiplier,
            returnValue = value;

        for(multiplier = value - 1; multiplier > 0; --multiplier) {
            returnValue *= multiplier;
        }

        return returnValue;
    },
	fib: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'fib' requires exactly one argument");
		}

		if (n < 2) {
			return n;
		}
		else {
			return MathFunctions.fib(n - 1) + MathFunctions.fib(n - 2);
		}
	},
	rad: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'rad' requires exactly one argument");
		}

		return n * Math.PI / 180;
	},
	deg: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'rad' requires exactly one argument");
		}

		return n * 180 / Math.PI;
	},
	rand: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	randf: function() {
		return Math.random();
	},
	round: function(n, toMultiple) {
		if(typeof toMultiple === 'number') {
			return Math.round(n / toMultiple) * toMultiple;
		} else {
			return Math.round(n);
		}
	},
	ceil: function(n, toMultiple) {
		if(typeof toMultiple === 'number') {
			return Math.ceil(n / toMultiple) * toMultiple;
		} else {
			return Math.ceil(n);
		}
	},
	floor: function(n, toMultiple) {
		if(typeof toMultiple === 'number') {
			return Math.floor(n / toMultiple) * toMultiple;
		} else {
			return Math.floor(n);
		}
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
	'clz32',
	'cos',
	'exp',
	'expm1',
	'fround',
	'hypot',
	'imul',
	'log',
	'log1p',
	'log10',
	'log2',
	'max',
	'min',
	'pow',
	'sign',
	'sin',
	'sinh',
	'sqrt',
	'tan',
	'tanh',
	'trunc'
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
    '+': (left, right) => left + right,
    '-': (left, right) => left - right,
    '/': (left, right) => left / right,
    '*': (left, right) => left * right,
    '%': (left, right) => left % right,
    '^': (left, right) => Math.pow(left, right)
};

/**
 * JavaScript deep clone function from StackOverflow
 */
function clone(obj){
    if(typeof(obj) == 'function')//it's a simple function
        return obj;
    //of it's not an object (but could be an array...even if in javascript arrays are objects)
    if(typeof(obj) !=  'object' || obj.constructor.toString().indexOf('Array')!=-1)
        if(JSON != undefined)//if we have the JSON obj
            try{
                return JSON.parse(JSON.stringify(obj));
            }catch(err){
                return JSON.parse('"'+JSON.stringify(obj)+'"');
            }
        else
            try{
                return eval(uneval(obj));
            }catch(err){
                return eval('"'+uneval(obj)+'"');
            }
    // I used to rely on jQuery for this, but the "extend" function returns
    //an object similar to the one cloned,
    //but that was not an instance (instanceof) of the cloned class
    /*
    if(jQuery != undefined)//if we use the jQuery plugin
        return jQuery.extend(true,{},obj);
    else//we recursivley clone the object
    */
    return (function _clone(obj){
        if(obj == null || typeof(obj) != 'object')
            return obj;
        function temp () {};
        temp.prototype = obj;
        var F = new temp;
        for(var key in obj)
            F[key] = clone(obj[key]);
        return F;
    })(obj);
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
	        pi: Math.PI,
	        PI: Math.PI,
	        e: Math.E,
	        E: Math.E,
			randf: () => Math.random()
	    };
	}

	this.tempVars = { };

	if(Object.prototype.toString.call(macros) === '[object Object]') {
		this.macros = macros;
	} else {
		this.macros = { };
	}

	this.variableSetCallbacks = { };
	this.macroSetCallbacks = { };

    this.readOnlyVariables = ['pi', 'PI', 'e', 'E', 'randf'];
};

ExpressionParser.prototype.onVariableSet = function(reference, callback) {
	this.variableSetCallbacks[reference] = callback;
};

ExpressionParser.prototype.offVariableSet = function(reference) {
	delete this.variableSetCallbacks[reference];
};

ExpressionParser.prototype.triggerVariableSetEvent = function(name, value) {
	var reference,
		variableSetCallbacks = this.variableSetCallbacks;

	for(reference in variableSetCallbacks) {
		if(variableSetCallbacks.hasOwnProperty(reference) && typeof variableSetCallbacks[reference] === 'function') {
			variableSetCallbacks[reference](name, value);
		}
	}
};

ExpressionParser.prototype.onMacroSet = function(reference, callback) {
	this.macroSetCallbacks[reference] = callback;
};

ExpressionParser.prototype.offMacroSet = function(reference) {
	delete this.macroSetCallbacks[reference];
};

ExpressionParser.prototype.triggerMacroSetEvent = function(name, argList, exprTkns) {
	var reference,
		macroSetCallbacks = this.macroSetCallbacks;

	for(reference in macroSetCallbacks) {
		if(macroSetCallbacks.hasOwnProperty(reference) && typeof macroSetCallbacks[reference] === 'function') {
			macroSetCallbacks[reference](name, argList, exprTkns);
		}
	}
};

/* Sets a variable */
ExpressionParser.prototype.setVariable = function(name, value, triggerEvent) {
    'use strict';

    if(this.readOnlyVariables.indexOf(name) !== -1) {
        throw new Error('Cannot set read only variable "' + name + '"');
    }

	if(triggerEvent !== false) {
		this.triggerVariableSetEvent(name, value);
	}

    this.variables[name] = value;
};

/* Gets a variable */
ExpressionParser.prototype.getVariable = function(name) {
    'use strict';

    if(this.isVariable(name)) {
		let variable;

		if(this.tempVars.hasOwnProperty(name)) {
			variable = this.tempVars[name];
		} else {
			variable = this.variables[name];
		}

        if(typeof variable === 'function') {
            return variable();
        }

        return variable;
    }

    return undefined;
};

/* Checks if a variable exists */
ExpressionParser.prototype.isVariable = function(name) {
    'use strict';

    return this.tempVars.hasOwnProperty(name) || this.variables.hasOwnProperty(name);
};

ExpressionParser.prototype.setMacro = function(name, argList, exprTkns, triggerEvent) {
	'use strict';

	this.macros[name] = {
		argList: argList,
		exprTkns: exprTkns
	};

	if(triggerEvent !== false) {
		this.triggerMacroSetEvent(name, argList, exprTkns);
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
        last_number = null,
        flag_assignment = false;

    for(iter = 0; iter < tokensLength; ++iter) {
        // Get the value
        if(tokens[iter][0] === 'number') {
            value = tokens[iter][1];
        }

        if(tokens[iter][0] === 'assignment') {
            if(
                iter - 1 === 0 &&                   // Check there is a keyword previous
                iter + 1 < tokensLength &&          // Check there is a value to set next

                tokens[iter - 1][0] === 'keyword'
            ) {
                flag_assignment = true;
            } else {
                throw new Error('Unexpected assignment');
            }
        }
    }

    if(flag_assignment) {
        this.setVariable(tokens[0][1], value);
    }

    return value;
};

/* Parse tokens */
ExpressionParser.prototype.parseTokens = function(tkns) {
    'use strict';

    var tokens = tkns;

	tokens = this.parseArgLists(tokens);
    tokens = this.parseMacros(tokens);
    tokens = this.parseLists(tokens);
    tokens = this.parseVariables(tokens);
    tokens = this.parseBrackets(tokens);
    tokens = this.parseNegatives(tokens);
    tokens = this.parseFunctions(tokens);
    tokens = this.parseOperations(tokens);

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
						argTokens = this.parseTokens(argTokens);

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
					argTokens = this.parseTokens(argTokens);
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

					parsed = this.parseTokens(tokens.slice(bracketIndex + 1, iter));

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
            tokens[iter + 1][1] = tokens[iter][1] === '-' ? -tokens[iter + 1][1] : tokens[iter + 1][1];
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
                        tokens[iter][1] = this.getVariable(tokens[iter][1]) * tokens[iter - 1][1];

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
					macro;

				if(allowedMathFunctions.indexOf(tokens[iter][1]) !== -1) {
					mathFunction = Math[tokens[iter][1]];
					context = Math;
					macro = false;
				} else if(tokens[iter][1] in MathFunctions) {
					mathFunction = MathFunctions[tokens[iter][1]];
					context = mathFunction;
					macro = false;
				} else if(tokens[iter][1] in this.macros) {
					macro = true;
				}

				if(tokens[iter + 1][0] === 'list') {
					let primitives = getListPrimitiveArray(tokens[iter + 1][1]);

					if(macro) {
						tokens[iter + 1] = [
							'number',
							this.runMacro(tokens[iter][1], primitives)
						];
					} else {
						tokens[iter + 1] = [
							'number',
							mathFunction.apply(context, primitives)
						];
					}
				} else {
					if(macro) {
						tokens[iter + 1][1] = this.runMacro(tokens[iter][1], [tokens[iter + 1][1]]);
					} else {
						tokens[iter + 1][1] = mathFunction.call(context, tokens[iter + 1][1]);
					}
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
    var operators = ['^', '/', '*', '+', '-'],
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

                tokens.push(['number', Number(buffer)]);

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
