class Clock {
	clock;

	/**
	 *
	 * @param {Node} element : element that display the timer
	 * @param {number} timer : initial value of the timer
	 */
	constructor(element, timer, onTimerChange, onEnd) {
		this.baseTimer = timer;
		this.currentTimer = timer;
		this.element = element;
		this.setElementValue(timer);
		this.onEnd = onEnd;
		this.onTimerChange = onTimerChange;
	}

	setBaseTimer = (value) => {
		this.pause();
		this.baseTimer = value;
		this.currentTimer = this.baseTimer;
		this.setElementValue(this.currentTimer);
	};

	setElementValue = (currentTimer) => {
		this.element.innerHTML = millisToMinutesAndSeconds(currentTimer);
	};
	play = () => {
		if (!this.clock) {
			this.start = Date.now();
			this.end = this.start + this.currentTimer;
			playElement.children[0].src = 'assets/pause-solid.svg';
			this.clock = window.setInterval(() => {
				this.currentTimer = this.end - Date.now();
				this.setElementValue(this.currentTimer);
				this.onTimerChange(this.currentTimer);
				if (this.currentTimer <= 0) {
					this.clock = window.clearInterval(this.clock);
					this.setElementValue(0);
					this.onEnd();
				}
			}, 1000);
		}
	};
	pause = () => {
		playElement.children[0].src = 'assets/play-solid.svg';
		this.clock = window.clearInterval(this.clock);
	};
	stop = () => {
		this.pause();
		this.currentTimer = this.baseTimer;
		this.setElementValue(this.currentTimer);
	};
}

function attachClockEvents(play) {}
