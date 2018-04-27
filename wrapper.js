/*
Large portions of code taken from easyaudioeffects by rm-labo
https://github.com/rm-labo/easyaudioeffects
*/

function SoundUI(sounds, options) {
	
	var defaultOptions = {
		playType: "oneShotPolyphonic", // Could be "oneShotPolyphonic" , "oneShotMonophonic" , "gate" or "loop"
		eventType: "hover",
	}

	this.sounds = sounds;
	this.options = options;

	for (var i = 0; i < sounds.length; i++) {
		var sound = sounds[i]
		var audio = new Audio();
		sound.polyTmpAudio = [];
		sound.polyTmpAudioKey = 0;
		try {
			if (sound.url == null) {
				audio.src = sound.url;
				sound.audio = audio;
			} else {
				throw "Runtime Error: Sound needs an url";
			};
		} catch (e) {
			console.log(e);
			sound.audio = null;
		}
	}

	this.play = function(soundName) {
		var sound = null;
		for (var i = 0; i < this.sounds.length; i++){
			if (this.sounds[i].name == soundName) {
				sound = this.sounds[i]
			}
		}
		if (sound == null) {
			throw "Runtime Error: '" + soundName + "' not found in sounds";
			return;
		} else {
			var audio = sound.audio;
			var polyTmpAudioKey = sound.polyTmpAudioKey
			var polyTmpAudio = sound.polyTmpAudio
			switch(this.options.playType) {
				case 'loop' :
					audio.currentTime = 0;
					audio.loop = true;
					audio.play();
					break;
				case 'gate' :
					audio.currentTime = 0;
					audio.play();
					break;
				case 'oneShotMonophonic' :
					audio.currentTime = 0;
					audio.play();
					break;
				case 'oneShotPolyphonic' :
				default:
				if(sound.url != null){
						polyTmpAudio[polyTmpAudioKey] = new Audio(sound.url);
						polyTmpAudio[polyTmpAudioKey].play();
						polyTmpAudio[polyTmpAudioKey].addEventListener('ended', function() {
							polyTmpAudio[polyTmpAudioKey] = null;
						});
						polyTmpAudioKey++;
					}
				break;
			}
		}
	}
}