var player;

let tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		videoId: 'jfKfPfyJRdk',
		height: '100%',
		width: '100%',
		playerVars: { controls: 0, rel: 0, modestbranding: 0 },
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange,
		},
	});
}

function onPlayerReady(event) {
	event.target.playVideo();
	player.mute();
	player.setVolume(100);
}

let done = false;
let reloadingVideo = false;

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		// unmute will cause the video to pause with the desired interface on start
		player.pauseVideo();
		player.unMute();
		done = true;
	}

	// when reloading we play/pause the video to have the desired interface
	if (reloadingVideo === true && event.data == YT.PlayerState.CUED) {
		player.mute();
		player.playVideo();
	}
	if (reloadingVideo === true && event.data == YT.PlayerState.PLAYING) {
		player.unMute();
		player.pauseVideo();
		reloadingVideo = false;
	}
	if (event.data == YT.PlayerState.ENDED) {
		player.playVideo();
	}
}

function pauseVideo() {
	player.pauseVideo();
}
