const presetTimers = [5, 10, 15, 20, 30, 45];

const moods = [
	{
		text: 'Forêt sombre',
		id: 'O1BnakexgSU',
		style: {
			background: 'linear-gradient(0.25turn, #232d35, #6f7182, #232d35)',
		},
		start: 12,
	},
	{
		text: 'Classical Lofi Girl',
		id: 'jfKfPfyJRdk',
		start: 0,
		style: {
			background: 'linear-gradient(0.25turn, #be8c6a, #2c1f17, #5f6149, #7d5437)',
		},
		start: undefined,
	},
	{
		text: 'Building Boys',
		id: 'fR0ZlSDUKCg',
		style: {
			background: 'linear-gradient(0.125turn, #23091d, #bf4f72, #f8c4a3)',
		},
		start: 12,
	},
	{
		text: 'Winter night',
		id: 'WaOZMNM6Oa4',
		style: {
			background: 'linear-gradient(#4d608e, #c6bbd2, #111834)',
		},
		start: 12,
	},
	{
		text: 'Spring Girls',
		id: 'y--847NiTQw',
		style: {
			background: 'linear-gradient(0.4turn, #f6edcc, #d2965d, #b09650)',
		},
		start: 18,
	},
	{
		text: 'Summer beach walk',
		id: 'Re1m9O7q-9U',
		style: {
			background: 'linear-gradient(#b884c2, #945490, #e8c6b6, #3a2c3d)',
		},
		start: 12,
	},
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
	moods.forEach(({ text, id, style, start }) => {
		const buttonMood = document.createElement('div');
		buttonMood.addEventListener('click', () => {
			reloadingVideo = true;
			player.cueVideoById(id, start);
			clock.pause();
		});
		buttonMood.innerText = text;
		buttonMood.className = 'button';
		buttonMood.style.background = style.background;
		document.getElementById('moodoptions').appendChild(buttonMood);
	});
}

function toggleMenu(menuToToggleId) {
	const otherMenuId = menuToToggleId === 'timeroptions' ? 'moodoptions' : 'timeroptions';
	const menuToToggle = document.getElementById(menuToToggleId);
	const otherMenu = document.getElementById(otherMenuId);

	otherMenu.classList.add('hidden');
	menuToToggle.classList.toggle('hidden');
}
