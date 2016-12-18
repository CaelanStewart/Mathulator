var Tabs = function(cntr) {
	'use strict';

	var container = cntr,
		elements;

	function show(name) {
		[].forEach.call(elements.tabs, tab => tab.classList.remove('active'));
		[].forEach.call(elements.tabPanes, tabPane => tabPane.classList.remove('active'));

		elements.tabsByName[name].classList.add('active');
		elements.tabPanesByName[name].classList.add('active');
	}

	function onTabClick(event) {
		var tab = event.currentTarget,
			name = tab.getAttribute('data-name') || tab.textContent;

		if(name)
			show(name);
		else
			throw new Exception('Logged tab has invalid name');
	}

	function cacheElements() {
		elements = { };

		elements.tabs = container.querySelectorAll('.tab');
		elements.tabPanes = container.querySelectorAll('.tab-pane');

		elements.tabsByName = { };
		elements.tabPanesByName = { };

		[].forEach.call(
			elements.tabs,
			tab => {
				let name = tab.getAttribute('data-name');

				if(name in elements.tabsByName)
					console.log(
						'Logged element has duplicate data-name attribute',
						tab
					);
				else if(name)
					elements.tabsByName[name] = tab;
				else
					console.log(
						'Logged element has data-name attribute',
						tab);
			}
		);

		[].forEach.call(
			elements.tabPanes,
			tabPane => {
				let name = tabPane.getAttribute('data-name');

				if(name in elements.tabPanesByName)
					console.log(
						'Logged element has duplicate data-name attribute',
						tabPane
					);
				else if(name)
					elements.tabPanesByName[name] = tabPane;
				else
					console.log(
						'Logged element has no data-name attribute',
						tabPane);
			}
		);
	}

	function setFixedListeners() {
		let tabsByName = elements.tabsByName;

		for(name in tabsByName)
			tabsByName[name].addEventListener('mousedown', onTabClick);
	}

	cacheElements();
	setFixedListeners();
};

var TabInstances = ((window, document) => {
	'use strict';

	var tabsInstances = [ ];

	[].forEach.call(
		document.querySelectorAll('.tabs'),
		tabs => tabsInstances.push(new Tabs(tabs))
	);

	return tabsInstances;
})(window, document);
