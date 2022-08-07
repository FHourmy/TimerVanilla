const presetTimers = [5, 10, 15, 20, 30, 45];
const moods = [
	{ text: 'Forêt sombre', id: 'O1BnakexgSU' },
	{ text: 'Classical Lofi Girl', id: 'jfKfPfyJRdk' },
	{ text: 'Building Boys', id: 'fR0ZlSDUKCg' },
	{ text: 'Winter night', id: 'WaOZMNM6Oa4' },
	{ text: 'Spring Girls', id: 'y--847NiTQw' },
	{ text: 'Summer beach walk', id: 'Re1m9O7q-9U' },
];

function initOptions() {
	initPresetButtons(presetTimers, clock.setBaseTimer);
	initMoodButtons(moods);

	document.getElementById('toggle-time').addEventListener('click', (e) => {
		toggleMenu('timeroptions');
	});
	document.getElementById('toggle-mood').addEventListener('click', (e) => {
		toggleMenu('moodoptions');
	});

	document.getElementById('minutes').addEventListener('input', (e) => {
		e.target.value = e.target.value.replace(/[^0-9.]/g, '');
	});

	document.getElementById('seconds').addEventListener('input', (e) => {
		e.target.value = e.target.value.replace(/[^0-9.]/g, '');
		if (e.target.value.length > 2) {
			e.target.value = e.target.value.substring(0, 2);
		}
		if (Number(e.target.value > 59)) {
			e.target.value = '59';
		}
	});

	document.getElementById('set').addEventListener('click', () => {
		const minutes = (Number(document.getElementById('minutes').value) || 0) * 60000;
		const seconds = (Number(document.getElementById('seconds').value) || 0) * 1000;
		clock.setBaseTimer(minutes + seconds);
		player.pauseVideo();
	});
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

function initMoodButtons(moods) {
	moods.forEach(({ text, id }) => {
		const buttonMood = document.createElement('div');
		buttonMood.addEventListener('click', () => {
			reloadingVideo = true;
			player.cueVideoById(id);
			clock.pause();
		});
		buttonMood.innerText = text;
		buttonMood.className = 'button';
		document.getElementById('moodoptions').appendChild(buttonMood);
	});
}

function toggleMenu(menuToToggleId) {
	const otherMenuId = menuToToggleId === 'timeroptions' ? 'moodoptions' : 'timeroptions';
	const menuToToggle = document.getElementById(menuToToggleId);
	const otherMenu = document.getElementById(otherMenuId);

	if (!otherMenu.className.includes('hidden')) {
		otherMenu.className += ' hidden';
	}
	if (menuToToggle.className.includes('hidden')) {
		menuToToggle.className = menuToToggle.className.split('hidden').join('');
	} else {
		menuToToggle.className += ' hidden';
	}
}
