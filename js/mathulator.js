var Mathulator = (function(window, document) {
	'use strict';

	var historyEntries = [ ],
		tooltip = new Tooltips.Tooltip('', {auto: true}),
		tooltips = new Tooltips(document.body),
		variableEntries = [ ],
		macroEntries = [ ],
		macros = { },
		data = { },
		elements,
		ep;
		
	function loadData() {
		var storedData = localStorage.getItem('data'),
			parsedData;
		
		if(!storedData) {
			storedData = '{ }';
		}
		
		parsedData = JSON.parse(storedData);
		
		// Error checking
		if(!parsedData || typeof parsedData !== 'object' || Object.prototype.toString.call(parsedData) !== '[object Object]') {
			console.log('Stored data is corrupted, resetting.');
			parsedData = { };
		}
		
		data = parsedData;
	}
		
	function saveData() {
		// Error checking
		if(!data || typeof data !== 'object' || Object.prototype.toString.call(data) !== '[object Object]') {
			console.log('Data in memory is corrupted, resetting.');
			data = { };
		}
		
		var jsonData = JSON.stringify(data);
		
		window.localStorage.setItem('data', jsonData);
	}
		
	function setData(name, value) {
		data[name] = value;
		
		saveData();
	}
	
	function getData(name) {
		if(data.hasOwnProperty(name)) {
			return data[name];
		}
		
		return null;
	}

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
				.content(event.currentTarget.cachedAnswer.toString())
				.place('left')
				.show(event.currentTarget);
		} else {
			tooltip.hide();
		}
	}

	function onVariableButtonMouseEvent(event) {
		if(event.type === 'mouseenter') {
			tooltip
				.content(event.currentTarget.cachedValue.toString())
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
		
		historyEntries.push(div);

		button.cachedAnswer = answer;
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
		var variableObj = getData('variables');
		
		// Error checking
		if(!variableObj || typeof variableObj !== 'object' || Object.prototype.toString.call(variableObj) !== '[object Object]') {
			console.log('Variables data is corrupted, resetting.');
			variableObj = { };
		}

		variableObj[name] = value;
		
		addVariableEntry(name, value);
		setData('variables', variableObj);
	}

	function onMacroSet(name, argList, exprTkns) {
		var macroObj = getData('macros');
		
		// Error checking
		if(!macroObj || typeof macroObj !== 'object' || Object.prototype.toString.call(macroObj) !== '[object Object]') {
			console.log('macros data is corrupted, resetting.');
			macroObj = { };
		}

		macroObj[name] = {
			argList: argList,
			exprTkns: exprTkns
		};
		
		addMacroEntry(name, argList);
		setData('macros', macroObj);
	}

	function saveHistory(expression, answer) {
		var historyArr = getData('history');
		
		// Error checking
		if(!historyArr || typeof historyArr !== 'object' || Object.prototype.toString.call(historyArr) !== '[object Array]') {
			console.log('history data is corrupted, resetting.');
			historyArr = [ ];
		}
		
		historyArr.push([expression, answer]);
		
		setData('history', historyArr);
	}

	function clearHistory() {
		setData('history', [ ]);

		historyEntries.forEach(function(entry) {
			entry.parentNode.removeChild(entry);
		});
	}

	function clearVariables() {
		setData('variables', { });

		variableEntries.forEach(function(entry) {
			entry.parentNode.removeChild(entry);
		});
	}

	function clearMacros() {
		setData('macros', { });

		macroEntries.forEach(function(entry) {
			entry.parentNode.removeChild(entry);
		});
	}

	function evaluate() {
		var expression = elements.input.value,
			result;
		
		try {
			result = ep.parse(expression);
			elements.input.value = result;
			addHistoryEntry(expression, result);
			saveHistory(expression, result);
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
	
	function getHistory() {
		var historyArr = getData('history');
		
		if(!historyArr || typeof historyArr !== 'object' || Object.prototype.toString.call(historyArr) !== '[object Array]') {
			console.log('history data is corrupted, resetting.');
			historyArr = [ ];
		}
		
		var len = historyArr.length,
			iter;
			
		for(iter = 0; iter < len; ++iter) {
			let [expression, value] = historyArr[iter];
			
			if(!value && value !== 0 && value !== '0')
				continue;
			
			addHistoryEntry(expression, value);
		}
	}
	
	function getVariables() {
		var variableObj = getData('variables');
		
		// Error checking
		if(!variableObj || typeof variableObj !== 'object' || Object.prototype.toString.call(variableObj) !== '[object Object]') {
			console.log('Variables data is corrupted, resetting.');
			variableObj = { };
		}
		
		var name;
		
		for(name in variableObj) {
			if(variableObj.hasOwnProperty(name)) {
				let value = variableObj[name];
				
				if(!value && value !== 0 && value !== '0')
					continue;
				
				ep.setVariable(name, value, false);
				
				addVariableEntry(name, ep.getVariable(name));
			}
		}
	}
	
	function getMacros() {
		var macroObj = getData('macros');
		
		// Error checking
		if(!macroObj || typeof macroObj !== 'object' || Object.prototype.toString.call(macroObj) !== '[object Object]') {
			console.log('macros data is corrupted, resetting.');
			macroObj = { };
		}
		
		let name;
		
		for(name in macroObj) {
			if(macroObj.hasOwnProperty(name)) {
				let macro = macroObj[name],
					{argList, exprTkns} = macro;
					
				if(
					!argList || typeof argList !== 'object' || Object.prototype.toString.call(argList) !== '[object Array]' ||
					!exprTkns || typeof exprTkns !== 'object' || Object.prototype.toString.call(exprTkns) !== '[object Array]'
				) continue;
					
				addMacroEntry(name, argList);
				ep.setMacro(name, argList, exprTkns, false);
			}
		}
	}

	function getFromLocalStorage() {
		getHistory();
		getVariables();
		getMacros();
		
		var precision = getData('precision');
		
		if(typeof precision === 'number') {
			elements.inputPrecision.value = precision;
			onPrecisionChange();
		}
		
		var sciNotation = getData('sci-notation');
		
		if(typeof sciNotation !== 'boolean') {
			sciNotation = true;
		}
		
		elements.inputSciNotation.checked = sciNotation;
		onSciNotationChange();
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
	
	/**
	 * Shows an error inside a tooltip over the given element
	 * @param element - An element object
	 * @param {string} message - The message to display
	 */
	function showTooltip(element, message, placement) {
		if(element.tooltipTimeout) {
			clearTimeout(element.tooltipTimeout);
		}
		
		if('tooltipInstance' in element) {
			element.tooltipInstance
				.hide();
			
			element.tooltipInstance
				.content(message)
				.position(element)
				.show();
		} else {
			if(typeof placement !== 'string') {
				placement = 'top';
			}
			
			element.tooltipInstance = new Tooltips.Tooltip(message)
				.type('error')
				.effect('fade')
				.position(element)
				.place(placement)
				.show(element);
		}

		element.tooltipTimeout = setTimeout(function() {
			element.tooltipInstance.hide();
			element.tooltipTimeout = null;
		}, 3000);
	}
	
	function onPrecisionChange() {
		var precision = +elements.inputPrecision.value;
		
		if(precision > 5000) {
			alert('Precision exceeds maximum of 5000');
			elements.inputPrecision.value = 5000;
			precision = 5000;
		}
		
		Decimal.config({ precision: precision });
		
		setData('precision', precision);
		
		console.log('Precision updated to ' + precision);
	}
	
	function onSciNotationChange() {
		var sciNotation = elements.inputSciNotation.checked;
		
		setData('sci-notation', sciNotation);
		
		ep.settings.sciNotation = sciNotation;
		
		console.log('Sci-notation ' + (sciNotation ? 'on' : 'off'));
	}
	
	function onFormSubmit(event) {
		event.preventDefault();
		
		onPrecisionChange();
		onSciNotationChange();
		
		showTooltip(elements.settingsButton, 'Settings Saved', 'left');
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
		elements.settingsButton = elements.sidebar.querySelector('[data-remodal-target="settings"]');
		elements.settingsForm = document.getElementById('settings-form');
		elements.inputPrecision = document.getElementById('input-precision');
		elements.inputSciNotation = document.getElementById('input-sci-notation');
		elements.saveButton = elements.settingsForm.querySelector('[data-remodal-action="confirm"]');
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
		console.log(elements.settingsForm);
		elements.saveButton.addEventListener('click', onFormSubmit);

		ep.on('variable-set', onVariableSet);
		ep.on('macro-set', onMacroSet);
	}
	
	ep = new ExpressionParser();
	
	loadData();
	
	cacheElements();
	setFixedListeners();
	getFromLocalStorage();

	return {
		ep: ep
	}
})(window, document);
