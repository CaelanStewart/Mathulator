var Mathulator = (function(window, document) {
	'use strict';

	var elements,
		ep = new ExpressionParser(),
		expressionHistory = [],
		historyEntries = [ ],
		tooltip = new Tooltips.Tooltip('', {auto: true}),
		tooltips = new Tooltips(document.body),
		variableEntries = [ ],
		variables = { },
		macroEntries = [ ],
		macros = { };

	function clearScreen() {
		elements.input.value = '';
	}

	function backspace() {
		elements.input.value = elements.input.value.substr(0, elements.input.value.length - 1);
	}

	function onHistoryEntryClick(event) {
		elements.input.value = event.currentTarget.cachedExpression;
	}

	function onVariableEntryClick(event) {
		elements.input.value += event.currentTarget.cachedName;
	}

	function onMacroEntryClick(event) {
		elements.input.value += event.currentTarget.cachedName;
	}

	function onGetAnswerMouseEvent(event) {
		if(event.type === 'mouseenter') {
			tooltip
				.content(event.currentTarget.cachedAnswer)
				.place('left')
				.show(event.currentTarget);
		} else {
			tooltip.hide();
		}
	}

	function onVariableButtonMouseEvent(event) {
		if(event.type === 'mouseenter') {
			tooltip
				.content(event.currentTarget.cachedValue)
				.place('left')
				.show(event.currentTarget);
		} else {
			tooltip.hide();
		}
	}

	function onGetAnswerClick(event) {
		event.stopPropagation();

		elements.input.value = event.currentTarget.cachedAnswer;
	}

	function onVariableButtonClick(event) {
		event.stopPropagation();

		elements.input.value += event.currentTarget.cachedValue;
	}

	function onMacroClick(event) {
		event.stopPropagation();

		elements.input.value = event.currentTarget.cachedAnswer;
	}

	function addHistoryEntry(expression, answer) {
		var div = document.createElement('div'),
			button = document.createElement('button'),
			replacedExpression = expression.replace(/\s+/g,'');

		div.classList.add('entry');
		div.textContent = replacedExpression;
		div.cachedExpression = replacedExpression;
		div.onclick = onHistoryEntryClick;

		button.classList.add('entry-button');
		button.textContent = 'Answer';
		button.type = 'button';
		button.onmouseenter = button.onmouseleave = onGetAnswerMouseEvent;
		button.onclick = onGetAnswerClick;

		div.appendChild(button);

		if(!historyEntries.length) {
			elements.historyEntryContainer.appendChild(div);
		} else {
			elements.historyEntryContainer.insertBefore(div, historyEntries[historyEntries.length - 1]);
		}

		button.cachedAnswer = answer;

		historyEntries.push(div);
	}

	function addVariableEntry(name, value) {
		var div = document.createElement('div'),
			button = document.createElement('button');

		div.classList.add('entry');
		div.textContent = name;
		div.cachedName = name;
		div.onclick = onVariableEntryClick;

		button.classList.add('entry-button');
		button.textContent = 'Value';
		button.type = 'button';
		button.onmouseenter = button.onmouseleave = onVariableButtonMouseEvent;
		button.onclick = onVariableButtonClick;

		div.appendChild(button);

		if(!variableEntries.length) {
			elements.variableEntryContainer.appendChild(div);
		} else {
			elements.variableEntryContainer.insertBefore(div, variableEntries[variableEntries.length - 1]);
		}

		button.cachedValue = value;

		variableEntries.push(div);
	}

	function addMacroEntry(name, argList) {
		var div = document.createElement('div'),
			button = document.createElement('button'),
			title = name + '{',
			argListLen = argList.length;

		argList.forEach((arg, index) => {
			title += arg[1];

			if(index < argListLen - 1) {
				title += ',';
			}
		});

		title += '}';

		div.classList.add('entry');
		div.textContent = title;
		div.cachedName = name;
		div.onclick = onVariableEntryClick;

		if(!macroEntries.length) {
			elements.macroEntryContainer.appendChild(div);
		} else {
			elements.macroEntryContainer.insertBefore(div, macroEntries[macroEntries.length - 1]);
		}

		macroEntries.push(div);
	}

	function onVariableSet(name, value) {
		variables[name] = value;

		addVariableEntry(name, value);

		var variablesJson = localStorage.getItem('variables'),
			variableObj;

		if(typeof variablesJson !== 'string') {
			variablesJson = '{ }';
		}

		variableObj = JSON.parse(variablesJson);
		
		if(Object.prototype.toString.call(variableObj) !== '[object Object]') {
			variableObj = { };	
		}

		variableObj[name] = value;

		localStorage.setItem('variables', JSON.stringify(variableObj));
	}

	function onMacroSet(name, argList, exprTkns) {
		addMacroEntry(name, argList);

		var macrosJson = localStorage.getItem('macros'),
			macrosObj;

		if(typeof macrosJson !== 'string') {
			macrosJson = '{ }';
		}

		macrosObj = JSON.parse(macrosJson);
		
		if(Object.prototype.toString.call(macrosObj) !== '[object Object]') {
			macrosObj = { };	
		}

		macrosObj[name] = {
			argList: argList,
			exprTkns: exprTkns
		};

		localStorage.setItem('macros', JSON.stringify(macrosObj));
	}

	function addToLocalStorage(expression, answer) {
		var historyJson = localStorage.getItem("history"),
			history;

		if(typeof historyJson !== 'string') {
			historyJson = '[ ]';
		}

		history = JSON.parse(historyJson);

		history.push([expression, answer]);

		localStorage.setItem('history', JSON.stringify(history));
	}

	function clearHistory() {
		localStorage.setItem('history', '[ ]');

		historyEntries.forEach(function(entry) {
			entry.parentNode.removeChild(entry);
		});

		historyEntries = [ ];
	}

	function clearVariables() {
		localStorage.setItem('variables', '{ }');

		variableEntries.forEach(function(entry) {
			entry.parentNode.removeChild(entry);
		});

		variableEntries = [ ];
	}

	function clearMacros() {
		localStorage.setItem('macros', '{ }');

		macroEntries.forEach(function(entry) {
			entry.parentNode.removeChild(entry);
		});

		macroEntries = [ ];
	}

	function evaluate() {
		var expression = elements.input.value,
			result;

		try {
			result = ep.parse(expression);
			elements.input.value = result;
			addHistoryEntry(expression, result);
			addToLocalStorage(expression, result);
		} catch(e) {
			elements.input.value = e.message;
		}
	}

	function inputCharacter(character) {
		elements.input.value += character;
	}

	function doAction(action, value) {
		switch(action) {
			case 'inputCharacter':
				inputCharacter(value);
				break;

			case 'clearScreen':
				clearScreen();
				break;

			case 'evaluate':
				evaluate();
				break;

			case 'backspace':
				backspace();
				break;
		}
	}

	function onButtonClick(event) {
		var button = event.currentTarget,
			action = button.getAttribute('data-action'),
			value = button.getAttribute('data-value');

		doAction(action, value);
	}

	function onInputKeyup(event) {
		// Enter key was pressed
		if(event.keyCode === 13) {
			evaluate();
		}
	}

	function getFromLocalStorage() {
		var historyJson = localStorage.getItem('history'),
			history;

		if(typeof historyJson !== 'string') {
			historyJson = '[ ]';
		}

		history = JSON.parse(historyJson);

		history.forEach(function(item) {
			addHistoryEntry.apply(null, item);
		});

		var variablesJson = localStorage.getItem('variables'),
			variableObj;

		if(typeof variablesJson !== 'string') {
			variablesJson = '{ }';
		}

		variableObj = JSON.parse(variablesJson);

		let name;

		for(name in variableObj) {
			if(variableObj.hasOwnProperty(name)) {
				addVariableEntry(name, variableObj[name]);
				ep.setVariable(name, variableObj[name], false);
			}
		}

		var macrosJson = localStorage.getItem('macros'),
			macrosObj;

		if(typeof macrosJson !== 'string') {
			macrosJson = '{ }';
		}

		macrosObj = JSON.parse(macrosJson);

		let macroName;

		for(macroName in macrosObj) {
			if(macrosObj.hasOwnProperty(macroName)) {
				let argList = macrosObj[macroName].argList,
					exprTkns = macrosObj[macroName].exprTkns;

				addMacroEntry(macroName, argList);
				ep.setMacro(macroName, argList, exprTkns, false);
			}
		}
	}

	function onCloseSidebarClick(event) {
		tooltips.hide(event.currentTarget);

		if(document.body.classList.contains('sidebar-closed')) {
			document.body.classList.remove('sidebar-closed');
			//event.currentTarget.setAttribute('data-tooltip')
		} else {
			document.body.classList.add('sidebar-closed');
		}
	}

	function cacheElements() {
		elements = { };

		elements.mathulator = document.getElementById('mathulator');
		elements.buttons = document.getElementsByTagName('button');
		elements.input = document.getElementsByTagName('input')[0];
		elements.sidebar = document.getElementById('mathulator-sidebar');
		elements.history = elements.sidebar.querySelector('.tab-pane[data-name="history"]');
		elements.historyEntryContainer = elements.history.querySelector('.history-entries');
		elements.variableEntryContainer = elements.sidebar.querySelector('.variable-list');
		elements.macroEntryContainer = elements.sidebar.querySelector('.macro-list');
		elements.clearHistory = elements.sidebar.querySelector('.clear-history');
		elements.clearVariables = elements.sidebar.querySelector('.clear-variables');
		elements.clearMacros = elements.sidebar.querySelector('.clear-macros');
		elements.closeSidebar = elements.sidebar.querySelector('.close-history');
	}

	function setFixedListeners() {
		Array.prototype.forEach.call(elements.buttons, function(button) {
			button.addEventListener('click', onButtonClick);
		});

		elements.clearHistory.addEventListener('click', clearHistory);
		elements.clearMacros.addEventListener('click', clearMacros);
		elements.closeSidebar.addEventListener('click', onCloseSidebarClick);
		elements.clearVariables.addEventListener('click', clearVariables);

		elements.input.addEventListener('keyup', onInputKeyup);

		ep.onVariableSet('variable-list', onVariableSet);
		ep.onMacroSet('macro-list', onMacroSet);
	}

	cacheElements();
	setFixedListeners();
	getFromLocalStorage();

	return {
		ep: ep
	}
})(window, document);
