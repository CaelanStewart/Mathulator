const Decimal = require('decimal.js');
Decimal.config({ precision: 20 });

const PI_5000 = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009946576407895126946839835259570982582262052248940772671947826848260147699090264013639443745530506820349625245174939965143142980919065925093722169646151570985838741059788595977297549893016175392846813826868386894277415599185592524595395943104997252468084598727364469584865383673622262609912460805124388439045124413654976278079771569143599770012961608944169486855584840635342207222582848864815845602850601684273945226746767889525213852254995466672782398645659611635488623057745649803559363456817432411251507606947945109659609402522887971089314566913686722874894056010150330861792868092087476091782493858900971490967598526136554978189312978482168299894872265880485756401427047755513237964145152374623436454285844479526586782105114135473573952311342716610213596953623144295248493718711014576540359027993440374200731057853906219838744780847848968332144571386875194350643021845319104848100537061468067491927819119793995206141966342875444064374512371819217999839101591956181467514269123974894090718649423196156794520809514655022523160388193014209376213785595663893778708303906979207734672218256259966150142150306803844773454920260541466592520149744285073251866600213243408819071048633173464965145390579626856100550810665879699816357473638405257145910289706414011097120628043903975951567715770042033786993600723055876317635942187312514712053292819182618612586732157919841484882916447060957527069572209175671167229109816909152801735067127485832228718352093539657251210835791513698820914442100675103346711031412671113699086585163983150197016515116851714376576183515565088490998985998238734552833163550764791853589322618548963213293308985706420467525907091548141654985946163718027098199430992448895757128289059232332609729971208443357326548938239119325974636673058360414281388303203824903758985243744170291327656180937734440307074692112019130203303801976211011004492932151608424448596376698389522868478312355265821314495768572624334418930396864262434107732269780280731891544110104468232527162010526522721116603966655730925471105578537634668206531098965269186205647693125705863566201855810072936065987648611791045334885034611365768675324944166803962657978771855608455296541266540853061434443185867697514566140680070023787765913440171274947042056223053899456131407112700040785473326993908145466464588079727082668306343285878569830523580893306575740679545716377525420211495576158140025012622859413021647155097925923099079654737612551765675135751782966645477917450112996148903046399471329621073404375189573596145890193897131117904297828564750320319869151402870808599048010941214722131794764777262241425485454033215718530614228813758504306332175182979866223717215916077166925474873898665494945011465406284336639379003976926567214638530673609657120918076383271664162748888007869256029022847210403172118608204190004229661711963779213375751149595015660496318629472654736425230817703675159067350235072835405670403867435136222247715891504953098444893330963408780769325993978054193414473774418426312986080998886874132604721',
	  E_5000 = '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354021234078498193343210681701210056278802351930332247450158539047304199577770935036604169973297250886876966403555707162268447162560798826517871341951246652010305921236677194325278675398558944896970964097545918569563802363701621120477427228364896134225164450781824423529486363721417402388934412479635743702637552944483379980161254922785092577825620926226483262779333865664816277251640191059004916449982893150566047258027786318641551956532442586982946959308019152987211725563475463964479101459040905862984967912874068705048958586717479854667757573205681288459205413340539220001137863009455606881667400169842055804033637953764520304024322566135278369511778838638744396625322498506549958862342818997077332761717839280349465014345588970719425863987727547109629537415211151368350627526023264847287039207643100595841166120545297030236472549296669381151373227536450988890313602057248176585118063036442812314965507047510254465011727211555194866850800368532281831521960037356252794495158284188294787610852639813955990067376482922443752871846245780361929819713991475644882626039033814418232625150974827987779964373089970388867782271383605772978824125611907176639465070633045279546618550966661856647097113444740160704626215680717481877844371436988218559670959102596862002353718588748569652200050311734392073211390803293634479727355955277349071783793421637012050054513263835440001863239914907054797780566978533580489669062951194324730995876552368128590413832411607226029983305353708761389396391779574540161372236187893652605381558415871869255386061647798340254351284396129460352913325942794904337299085731580290958631382683291477116396337092400316894586360606458459251269946557248391865642097526850823075442545993769170419777800853627309417101634349076964237222943523661255725088147792231519747780605696725380171807763603462459278778465850656050780844211529697521890874019660906651803516501792504619501366585436632712549639908549144200014574760819302212066024330096412704894390397177195180699086998606636583232278709376502260149291011517177635944602023249300280401867723910288097866605651183260043688508817157238669842242201024950551881694803221002515426494639812873677658927688163598312477886520141174110913601164995076629077943646005851941998560162647907615321038727557126992518275687989302761761146162549356495903798045838182323368612016243736569846703785853305275833337939907521660692380533698879565137285593883499894707416181550125397064648171946708348197214488898790676503795903669672494992545279033729636162658976039498576741397359441023744329709355477982629614591442936451428617158587339746791897571211956187385783644758448423555581050025611492391518893099463428413936080383091662818811503715284967059741625628236092168075150177725387402564253470879089137291722828611515915683725241630772254406337875931059826760944203261924285317018781772960235413060672136046000389661093647095141417185777014180606443636815464440053316087783143174440811949422975599314011888683314832802706553833004693290115744147563139997221703804617092894579096271662260740718749975359212756084414737823303270330168237193648002173285734935947564334129943024850235732214597843282641421684878721673367010615094243456984401873312810107945127223737886126058165668053714396127888732527373890392890506865324138062796025930387727697783792868409325365880733988457218746021005311483351323850047827169376218004904795597959290591655470505777514308175112698985188408718564026035305583737832422924185625644255022672155980274012617971928047139600689163828665277009752767069777036439260224372841840883251848770472638440379530166905465937461619323840363893131364327137688841026811219891275223056256756254701725086349765367288605966752740868627407912856576996313789753034660616669804218267724560530660773899624218340859882071864682623215080288286359746839654358856685503773131296587975810501214916207656769950659715344763470320853215603674828608378656803073062657633469774295634643716709397193060876963495328846833613038829431040800296873869117066666147';
	  NUMERIC_CHARSET = '01234567890.',
	  ALPHA_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_',
	  OPERATOR_CHARSET = '+-/*^%',
	  HEX_CHARSET = '0123456789ABCDEFabcdef',
	  OCTAL_CHARSET = '01234567',
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
			returnValue = returnValue.times(multiplier);
		}

		return returnValue;
	},
	rad: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'rad' requires exactly one argument");
		}
		
		let PI = new Decimal(PI_5000.substring(0, Decimal.precision + 2)).times(2).dividedBy(2);

		return n.times(PI).dividedBy(180);
	},
	deg: function(n) {
		if(arguments.length !== 1) {
			throw new Error("function 'rad' requires exactly one argument");
		}
		
		let PI = new Decimal(PI_5000.substring(0, Decimal.precision + 2)).times(2).dividedBy(2);

		return n.times(180).dividedBy(PI);
	},
	rand: function(min, max) {
		if(arguments.length !== 2) {
			min = Decimal(Number.MIN_SAFE_INTEGER);
			max = Decimal(Number.MAX_SAFE_INTEGER);
		}
		
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
	isHexChar: char => HEX_CHARSET.indexOf(char) !== -1,
	isBinChar: char => char === '0' || char === '1',
	isOctalChar: char => OCTAL_CHARSET.indexOf(char) !== -1
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
			let len = obj.length,
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

/**
 * ExpressionParser - A JavaScript utility for parsing and evaluating expressions
 *
 * @author Caelan Stewart
 */
function ExpressionParser(variables, macros) {
	'use strict';
	
	var defaultVariables = {
			pi: () => new Decimal(PI_5000.substring(0, Decimal.precision + 2)).times(2).dividedBy(2),
			PI: () => new Decimal(PI_5000.substring(0, Decimal.precision + 2)).times(2).dividedBy(2),
			tau: () => new Decimal(PI_5000.substring(0, Decimal.precision + 2)).times(2),
			TAU: () => new Decimal(PI_5000.substring(0, Decimal.precision + 2)).times(2),
			e: () => new Decimal(E_5000.substring(0, Decimal.precision + 2)).times(2).dividedBy(2),
			E: new Decimal(E_5000.substring(0, Decimal.precision + 2)).times(2).dividedBy(2),
			randf: () => new Decimal(Math.random()),
			NaN: Decimal.asin(2)
		};

	if(Object.prototype.toString.call(variables) === '[object Object]') {
		this.variables = variables;
	} else {
		this.variables = defaultVariables;
	}

	if(Object.prototype.toString.call(macros) === '[object Object]') {
		this.macros = macros;
	} else {
		this.macros = { };
	}

	this.eventCallbacks = {
		'variable-set': [ ],
		'macro-set': [ ]
	}

	// Create an array of the names of the default variables
	// them being overwritten.
	this.readOnlyVariables = Object.keys(defaultVariables);

	this.settings = {
		sciNotation: true
	};
};

/**
 * Sets an event listener. To find any event types, search for
 * usages of the 'trigger' method.
 *
 * @param {string} type - The event type
 * @param {Function} callback - A callable type to be executed when
 * the given event type is triggered.
 */
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

/**
 * Removes a given event listener
 *
 * @param {string} type - The type of event
 * @param {Function} callback - The exact callback provided when
 * the event listener was set.
 */
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

/**
 * Triggers listeners of a given type, and passes arguments to
 * the callbacks.
 *
 * @param {string} type - The type of event
 * @param {array} argArray - An array of arguments to be passed to
 * the event listener callback functions.
 */
ExpressionParser.prototype.trigger = function(type, argArray) {
	if(typeof type !== 'string') {
		throw new Error('Event type must be a string');
	}

	if(!this.eventCallbacks.hasOwnProperty(type)) {
		throw new Error('Invalid event type "' + type + '"');
	}

	this.eventCallbacks[type].forEach(callback => callback.apply(null, argArray));
};

/**
 * Sets a variable of a given name to a given value.
 *
 * @param {string} name - The name of the variable
 * @param {string|Decimal} value - The value of the variable. If a 
 * string is passed, the string is fed into a new instance of Decimal.
 * If a Decimal object is passed, it is set as is.
 * @param {boolean} triggerEvent - Should this setting of a variable
 * trigger the 'variable-set' event listeners?
 */
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

/**
 * Gets the value of a variable of a given name.
 *
 * @param {string} name - The name of the variable to fetch
 */
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

/**
 * Checks to see if a variable of a given name exists.
 *
 * @param {string} name - The name of the variable to check for.
 * 
 * @return {boolean} - 'true' if the variable exists, 'false' if it does not.
 */
ExpressionParser.prototype.isVariable = function(name) {
	'use strict';

	return this.variables.hasOwnProperty(name);
};

/**
 * Sets a macro.
 *
 * @param {string} name - The name of the macro
 * @param {array} argList - An argument list, in the format of an array of tokens.
 * @param {array} exprTokens - The expression, in the format of an array of tokens.
 * @param {boolean} triggerEvent - Should the setting of this macro trigger the
 * 'macro-set' event listener type?
 */
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

/**
 * Runs a macro of a given name, passing a list of arguments
 * for the expression.
 *
 * @param {string} name - The name of the macro to execute.
 * @param {array} list - An array of values to be used as the
 * argument list for the execution of the macro's expression.
 *
 * @return {array} - Returns the last token left after the
 * execution of the macro's expression.
 */
ExpressionParser.prototype.runMacro = function(name, list) {
	'use strict';

	if(name in this.macros) {
		let macro = this.macros[name],
			vars = { },
			ep;

		if(list.length !== macro.argList.length) {
			throw new SyntaxError('Macro "' + name + '" takes ' + macro.argList.length + ' arguments');
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

/**
 * Parses an expression.
 *
 * @param {string} expression - The expression to parse.
 *
 * @return {string|Decimal} - A string if scientific notation
 * is off. An instance of Decimal if it is.
 */
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
	
	if(value === null) {
		return value;
	}

	return this.settings.sciNotation ? value : value.toFixed();
};

/**
 * Parses a token stack.
 *
 * @param {array} - An array of tokens
 *
 * @return {array} - The resulting array of tokens after being evaluated and reduced down to a single token.
 */
ExpressionParser.prototype.parseTokens = function(tkns) {
	'use strict';

	var tokens = tkns;

	tokens = this.parseArgLists(tokens);
	tokens = this.parseMacros(tokens);
	tokens = this.parseLists(tokens);
	tokens = this.parseBrackets(tokens);
	tokens = this.parseVariables(tokens);
	tokens = this.parseFunctions(tokens);
	tokens = this.parseNegatives(tokens);
	tokens = this.parseOperations(tokens);
	tokens = this.parseAssignments(tokens);
	
	// If there is more than one token, an operator was most likely missed
	if(tokens.length > 1) {
		throw new SyntaxError('Expected operator, got "' + tokens[1][1] + '"');
	}

	return tokens;
};

/**
 * Parses assignments.
 */
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
				throw new SyntaxError('Keyword "' + tokens[iter][1] + '" is reserved');
			}

			if(iter !== 0) {
				throw new SyntaxError('Macro definition must be solitary or in parentheses');
			}

			let exprTkns = tokens.slice(iter + 3);

			if(!exprTkns.length) {
				throw new SyntaxError('Macro is missing an expression');
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
				throw new SyntaxError('Invalid brace syntax');
			}

			if(braceDepth > 0) {
				if(tokens[iter][1] === '}') {
					--braceDepth;
				}

				if(braceDepth === 0 && flag_list) {
					let argTokens = tokens.slice(listIndex + 1, iter);

					if(argTokens.length !== 1 || argTokens[0][0] !== 'keyword') {
						throw new SyntaxError('Invalid argument list syntax');
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
					throw new SyntaxError('Invalid argument list syntax');
				}

				items.push(argTokens[0]);

				flag_list = true;

				continue;
			} else {
				throw new SyntaxError('Unexpected comma');
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
				throw new SyntaxError('Invalid bracket syntax');
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
				throw new SyntaxError('Unexpected comma');
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
				throw new SyntaxError('Invalid bracket syntax');
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
		throw new SyntaxError('Invalid bracket syntax');
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
					throw new ReferenceError('Undefined variable "' + tokens[iter][1] + '"');
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
				throw new ReferenceError('Undefined function "' + tokens[iter][1] + '"');
			}
		}
	}

	return tokens;
};

ExpressionParser.prototype.parseOperations = function(tkns) {
	'use strict';

	// Order of operations
	var operators = [
			['^'],
			['*', '/', '%'],
			['+', '-'],
		],
		tokens = tkns,
		self = this,
		tokensLength = tokens.length,
		iter;

	operators.forEach(operator => tokens = self.parseOperator(tokens, operator));

	return tokens;
};

ExpressionParser.prototype.parseOperator = function(tkns, oprtrArr) {
	'use strict';

	var tokens = tkns,
		operatorArray = oprtrArr,
		tokensLength = tokens.length,
		iter;

	for(iter = 0; iter < tokensLength; ++iter) {
		var token = tokens[iter],
			token_type = token[0],
			token_value = token[1];

		if(token_type === 'operator' && operatorArray.indexOf(token_value) !== -1) {
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
			} else if(
				iter + 1 < tokensLength &&
				tokens[iter][0] === 'number' &&
				tokens[iter + 1][0] === 'number'
			) {
				throw new SyntaxError('Unexpected number ' + tokens[iter + 1][1]);
			} else {
				throw new SyntaxError('Unexpected operator "' + tokens[iter][1] + '"');
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
		flag_sciNotation = false,
		flag_sciNotationHasSign = false,
		flag_hex = false,
		flag_bin = false,
		flag_oct = false;

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

		if(flag_hex) {
			if(Helpers.isHexChar(char)) {
				buffer += char;
				continue;
			} else {
				tokens.push(['number', new Decimal(buffer)]);
				buffer = '';
				flag_hex = false;
			}
		}

		if(flag_bin) {
			if(Helpers.isBinChar(char)) {
				buffer += char;
				continue;
			} else {
				tokens.push(['number', new Decimal(buffer)]);
				buffer = '';
				flag_bin = false;
			}
		}

		if(flag_oct) {
			if(Helpers.isOctalChar(char)) {
				buffer += char;
				continue;
			} else {
				tokens.push(['number', new Decimal(buffer)]);
				buffer = '';
				flag_oct = false;
			}
		}

		if(flag_sciNotation) {
			if(!char_isNumeric) {
				if((char === '+' || char === '-') && !flag_sciNotationHasSign) {
					let lastChar = buffer.charAt(buffer.length - 1);

					// There is no sign in the buffer already, so add it
					if(lastChar === 'e') {
						flag_sciNotationHasSign = true;
						buffer += char;
						continue;
					}

					// We already have a sign, and its the last char (ERROR)
					else if(lastChar === '+' || lastChar === '-') {
						throw new SyntaxError('Unexpected char "' + char + '"');
					}
				} else {
					tokens.push(['number', new Decimal(buffer)]);
					buffer = '';
					flag_sciNotation = false;
					flag_sciNotationHasSign = false;
				}
			} else {
				flag_sciNotationHasSign = true;
				buffer += char;
				continue;
			}
		}

		if(flag_numeric) {
			if(!char_isNumeric) {
				// Possible scientific notation
				if(char.toLowerCase() === 'e') {
					let nextChar = expression.charAt(iter + 1);

					// CHeck if next char is valid in sci notation syntax
					if(Helpers.isNumeric(nextChar) || nextChar === '+' || nextChar === '-') {
						flag_numeric = false;
						flag_sciNotation = true;

						buffer += char;
						continue;
					}

					// If the next char is not valid sci notation syntax, treat
					// the 'e' as a separate token.
					else {
						flag_numeric = false;
						flag_keyword = true;

						tokens.push(['number', new Decimal(buffer)]);

						buffer = char;
						continue;
					}
				}

				// Possible hex notation
				if(char.toLowerCase() === 'x') {
					let nextChar = expression.charAt(iter + 1);

					// If next character is valid hex syntax
					if(Helpers.isHexChar(nextChar)) {
						flag_numeric = false;
						flag_hex = true;

						buffer += char;
						continue;
					}

					// Else this is not valid hex syntax, so treat the 'x'
					// as separate token.
					else {
						flag_numeric = false;
						flag_keyword = true;

						tokens.push(['number', new Decimal(buffer)]);

						buffer = char;
						continue;
					}
				}

				// Possible hex notation
				if(char.toLowerCase() === 'b') {
					let nextChar = expression.charAt(iter + 1);

					// If next character is valid hex syntax
					if(Helpers.isBinChar(nextChar)) {
						flag_numeric = false;
						flag_bin = true;

						buffer += char;
						continue;
					}

					// Else this is not valid hex syntax, so treat the 'b'
					// as separate token.
					else {
						flag_numeric = false;
						flag_keyword = true;

						tokens.push(['number', new Decimal(buffer)]);

						buffer = char;
						continue;
					}
				}

				// Possible octal notation
				if(char.toLowerCase() === 'o') {
					let nextChar = expression.charAt(iter + 1);

					// If next character is valid octal syntax
					if(Helpers.isOctalChar(nextChar)) {
						flag_numeric = false;
						flag_oct = true;

						buffer += char;
						continue;
					}

					// Else this is not valid octal syntax, so treat the 'o'
					// as separate token.
					else {
						flag_numeric = false;
						flag_keyword = true;

						tokens.push(['number', new Decimal(buffer)]);

						buffer = char;
						continue;
					}
				}

				flag_numeric = false;
				tokens.push(['number', new Decimal(buffer)]);
				buffer = '';
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
			throw new SyntaxError('Unexpected char "' + char + '"');
		}
	}

	return tokens;
};
