const MODE_ADVANCED = 'advanced',
	  MODE_BASIC = 'basic';

class Wrapper {
	constructor(wrapper) {
		this.wrapper = wrapper;
		
		this.init();
	}
	
	init() {
		let mode;
		
		if(window.location.hash) {
			mode = window.location.hash.substring(1);
			
			if(mode !== MODE_ADVANCED && mode !== MODE_BASIC) {
				mode = MODE_BASIC;
			}
		} else {
			mode = this.fetchLastMode();
		}

		this.setMode(mode);
	}

	setMode(mode) {
		if(mode !== MODE_ADVANCED && mode !== MODE_BASIC) {
			throw new Error('Invalid mode passed to switchMode, use the constants `MODE_ADVANCED` and `MODE_BASIC` instead of strings');
		}

		localStorage.setItem('view-mode', mode);
		
		window.location.href = mode + '-view.html';
	}

	fetchLastMode() {
		let mode = localStorage.getItem('view-mode');

		if(mode !== MODE_ADVANCED && mode !== MODE_BASIC) {
			mode = MODE_BASIC;
		}

		return mode;
	}
}
