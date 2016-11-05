var App = (function(window, document) {
	'use strict';

	var elements;

	function cacheElements() {
		elements = { };

		elements.background = document.getElementById('background');
		elements.backgroundImage = elements.background.querySelector('img');
	}

	function setFixedListeners() {

	}

	window.objectFit = new ObjectFit();

	cacheElements();
	setFixedListeners();
})(window, document);
