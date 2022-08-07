const clock = new Clock(document.getElementById('timer'), 5 * 60000);

initOptions();

const controlElements = getControlElements();
const { play: playElement, stop: stopElement } = controlElements;
setControlesListeners(controlElements, clock);

function setControlesListeners({ play, stop }, clock) {
	document.addEventListener('keyup', (event) => {
		if (event.code === 'Space') {
			handlePlay(clock);
		}
	});
	play.addEventListener('click', () => {
		handlePlay(clock);
	});
	stop.addEventListener('click', () => {
		clock.stop();
		player.pauseVideo();
	});
}

function handlePlay(clock) {
	if (!clock.clock) {
		clock.play();
		player.playVideo();
	} else {
		clock.pause();
		player.pauseVideo();
	}
}
