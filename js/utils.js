function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return seconds == 60 ? minutes + 1 + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function initPresetButtons(values, callback) {
	values.forEach((value) => {
		const buttonPreset = document.createElement('div');
		buttonPreset.addEventListener('click', () => callback(value * 60000));
		buttonPreset.innerText = value;
		buttonPreset.className = 'button';
		document.getElementById('presets').appendChild(buttonPreset);
	});
}

function getControlElements() {
	return {
		play: document.getElementById('play'),
		stop: document.getElementById('stop'),
	};
}
