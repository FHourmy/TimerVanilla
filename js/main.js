const clock = new Clock(document.getElementById('timer'), 30 * 60000);

initPresetButtons([5, 10, 15, 20, 30, 45], clock.setBaseTimer);
const controlElements = getControlElements();
setControlesListeners(controlElements, clock);

function setControlesListeners({ play, stop }, clock) {
	play.addEventListener('click', () => {
		if (!clock.clock) {
			play.children[0].src = 'assets/pause-solid.svg';
			clock.play();
		} else {
			play.children[0].src = 'assets/play-solid.svg';
			clock.pause();
		}
	});
	stop.addEventListener('click', clock.stop);
}
