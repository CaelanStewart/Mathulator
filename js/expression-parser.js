const PI_5000 = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009946576407895126946839835259570982582262052248940772671947826848260147699090264013639443745530506820349625245174939965143142980919065925093722169646151570985838741059788595977297549893016175392846813826868386894277415599185592524595395943104997252468084598727364469584865383673622262609912460805124388439045124413654976278079771569143599770012961608944169486855584840635342207222582848864815845602850601684273945226746767889525213852254995466672782398645659611635488623057745649803559363456817432411251507606947945109659609402522887971089314566913686722874894056010150330861792868092087476091782493858900971490967598526136554978189312978482168299894872265880485756401427047755513237964145152374623436454285844479526586782105114135473573952311342716610213596953623144295248493718711014576540359027993440374200731057853906219838744780847848968332144571386875194350643021845319104848100537061468067491927819119793995206141966342875444064374512371819217999839101591956181467514269123974894090718649423196156794520809514655022523160388193014209376213785595663893778708303906979207734672218256259966150142150306803844773454920260541466592520149744285073251866600213243408819071048633173464965145390579626856100550810665879699816357473638405257145910289706414011097120628043903975951567715770042033786993600723055876317635942187312514712053292819182618612586732157919841484882916447060957527069572209175671167229109816909152801735067127485832228718352093539657251210835791513698820914442100675103346711031412671113699086585163983150197016515116851714376576183515565088490998985998238734552833163550764791853589322618548963213293308985706420467525907091548141654985946163718027098199430992448895757128289059232332609729971208443357326548938239119325974636673058360414281388303203824903758985243744170291327656180937734440307074692112019130203303801976211011004492932151608424448596376698389522868478312355265821314495768572624334418930396864262434107732269780280731891544110104468232527162010526522721116603966655730925471105578537634668206531098965269186205647693125705863566201855810072936065987648611791045334885034611365768675324944166803962657978771855608455296541266540853061434443185867697514566140680070023787765913440171274947042056223053899456131407112700040785473326993908145466464588079727082668306343285878569830523580893306575740679545716377525420211495576158140025012622859413021647155097925923099079654737612551765675135751782966645477917450112996148903046399471329621073404375189573596145890193897131117904297828564750320319869151402870808599048010941214722131794764777262241425485454033215718530614228813758504306332175182979866223717215916077166925474873898665494945011465406284336639379003976926567214638530673609657120918076383271664162748888007869256029022847210403172118608204190004229661711963779213375751149595015660496318629472654736425230817703675159067350235072835405670403867435136222247715891504953098444893330963408780769325993978054193414473774418426312986080998886874132604721',
	  NUMERIC_CHARSET = '01234567890.',
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
	},
	cmp: function(a, b) {
		return new Decimal(a.cmp(b));
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
			pi: new Decimal(PI_5000),
			PI: new Decimal(PI_5000),
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
			if(Helpers.isMathFunction(tokens[iter][1])) {
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
			if(!char_isAlpha && !char_isNumeric) {
				flag_keyword = false;
				tokens.push(['keyword', buffer]);
				buffer = '';
			} else {
				buffer += char;
				continue;
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
