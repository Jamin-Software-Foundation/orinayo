function AudioLooper(styleType) {
	this.loopPending = false;
	this.looping = false;
	this.finished = true;	
	this.styleType = styleType;
	this.cb_loaded = null;
	this.cb_status = null;
    this.audioContext = audioContext; //new AudioContext();	

	this.channel = (this.styleType == "drum" ? "16" : (this.styleType == "bass" ? "17" : "18"));	
	this.counter = 6;	
}

AudioLooper.prototype.getLoop = function(id) {	// key0 OR key0_maj OR key0_min_arra	
	const keys = id.split("_");
	this.keys = keys;		
	
	if (this.styleType != "drum" && this.bpm != tempo) {	// transpose key to counter-balance stretched pitch (this.playbackRate)
		const tonic = parseInt(keys[0].substring(3));
		keys[0] = keys[0].substring(0, 3) + ((12 + tonic - parseInt(tempoEle.value)) % 12);
	}

	let key = keys[0];			
	if (!this.loop[key]) key = keys[0] + "_" + keys[1] + "_" + keys[2];
	if (!this.loop[key]) key = keys[0] + "_" + keys[1];
	if (!this.loop[key]) key = keys[0] + "_maj_int3";
	if (!this.loop[key]) key = keys[0] + "_maj_end3";		
	if (!this.loop[key]) key = keys[0] + "_maj_arra";		
	if (!this.loop[key]) key = keys[0] + "_maj";		
	if (!this.loop[key]) key = keys[0];		
	
	const loop = this.loop[key];
	this.sample = window.loopCache[this.loop.url];
	
	if (key.startsWith("int3") || key.startsWith("end3") || key.endsWith("_int3") || key.endsWith("_end3")) {
		this.sample = window.loopCache[this.loop.riffUrl];
	}
	
	console.debug("getLoop", id, key, loop);	
	
	return loop;		
};
		
AudioLooper.prototype.doLoop = function(id, beginTime, howLong, when) {
		if (this.loopPending) return;
		
		this.loopPending = true;
		this.stopPending = false;		

		console.debug("doLoop starts", this.styleType, id, this.id, howLong, when, tempo, this.bpm);
		
		if (id == "end1")  this.playbackOffset = 0; 
		if (when == undefined) when = this.audioContext.currentTime;
		
		this.startTime = when - (this.playbackOffset);
		this.oldSource = this.source;
		
		this.source = this.audioContext.createBufferSource();		
		this.source.buffer = this.sample;		
		this.source.playbackRate.value =  this.playbackRate;
		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = 0.01;			
			
		if (this.firstTime) {
			this.firstTime = false;
			this.gainNode.gain.setTargetAtTime(this.vol, when, 0.5);			
			
		} else {
			this.gainNode.gain.exponentialRampToValueAtTime(this.vol, when + 0.01);	
		}
		
		this.gainNode.connect(this.audioContext.destination);		
		if (recorderDestination) this.gainNode.connect(recorderDestination);		
		if (streamDestination) this.gainNode.connect(streamDestination);			
		this.source.connect(this.gainNode);			
		
		try {			
			this.source.start(when, (beginTime + (this.playbackOffset) * this.playbackRate));
			this.source.stop(when + howLong - (this.playbackOffset));	
			if (this.oldSource) this.oldSource.buffer = null;			
		} catch (e) {
			console.error("doLoop cannot start and stop", e);
		}

		this.gainNode.gain.setValueAtTime(this.vol, when + howLong - (this.playbackOffset) - 0.01);
		this.gainNode.gain.exponentialRampToValueAtTime(0.01, when + howLong - (this.playbackOffset));			
		
		if (this.cb_status) this.cb_status("_eventPlaying", id); 		
		
		this.source.addEventListener("ended", () => {
			console.debug("doLoop ends", this.styleType, id, id, this.reloop);	
			
			if (this.cb_status) this.cb_status("_eventEnded", id);	
			
			if (this.id == "int1") 	this.id = "arra";	
			
			if (id == "end1" || id == "end3" || id.endsWith("end3") || this.finished) 	{
				this.looping = false;	
				this.finished = true;
				this.mute();
				this.source.stop();
				this.source.buffer = null;
				this.displayUI(false);		
				verifyStartStopWebAudio();	
				return;
			}
			
			if (this.id.startsWith("fil") || this.id.startsWith("brk")) {
				this.id = "arr" + this.id.substring(3);	
				this.playbackOffset = 0;				
			}

			if (this.loop.riffUrl && this.styleType != "drum" && this.playbackOffset == 0) {		// play riff after tonic major plays a complete loop
				
				if (this.riffAutoTriggered) {
					const tonic = parseInt(this.keys[0].substring(3));
					if (keyChange - tonic == 0) this.id = this.keys[0] + "_maj_int3";
					this.riffAutoTriggered = false;
				} else {
					this.riffAutoTriggered = true;
				}
			}
			
			const loop = this.getLoop(this.id);
			
			if (loop && !this.stopPending) {
				const beginTime =  loop.start /1000;
				const endTime = loop.stop / 1000;
				const howLong = (endTime - beginTime) / this.playbackRate;
							
				if (this.looping && this.reloop) {
					this.doLoop(this.id, beginTime, howLong);				
				}
				
				if (!this.reloop) {
					this.reloop = true;
					this.playbackOffset = 0;
				}
			}
		});	

		this.loopPending = false;		
}

AudioLooper.prototype.muteToggle = function(id) {

	if (this.vol == 0.0001) {
		this.unmute();
	} else {
		this.mute();
	}
}

AudioLooper.prototype.mute = function(id) {
	this.prevVol = this.vol;	
	this.vol = 0.0001;
	this.gainNode.gain.setTargetAtTime(this.vol, this.audioContext.currentTime, 0.5);	
}

AudioLooper.prototype.unmute = function(id) {
	this.vol = this.prevVol;		
	this.gainNode.gain.setTargetAtTime(this.vol, this.audioContext.currentTime, 0.5);	
}

AudioLooper.prototype.update = function(id, sync) {
	const interval = this.audioContext.currentTime - this.updateTime;
	const one32Note = 30 / tempo;
	
	if (interval < one32Note) {
		return;		// must be at least 1/32 beat long
	}
	
	this.updateTime = this.audioContext.currentTime;
	this.riffAutoTriggered = false;		
	
	if (id == this.id) return;	
	if (drumLoop?.id == "end1") return;	
	if (this.stopPending) return;
	
	this.playbackRate =  2 ** (parseInt(tempoEle.value) / 12);
	this.vol = this.styleType == "bass" ? bassVol/100 : ( this.styleType == "chord" ? chordVol/100 : drumVol/100);	
	this.displayUI(true);	
	
	if (this.source) {	
		this.id = id;	
		this.source.stop();	
		this.source.buffer = null;
		
		const loop = this.getLoop(id);
		
		if (loop) {				
			const beginTime =  loop.start /1000;
			const endTime = loop.stop / 1000;
			let howLong = (endTime - beginTime) / this.playbackRate;
			const duration = this.audioContext.currentTime - this.startTime;	

			console.debug("AudioLooper " + this.styleType + " update", howLong, duration);
			
			if (sync) {	
				this.reloop = true;			
				this.playbackOffset = 0;
				console.debug("update sync", id);				
				
			} else {	
				this.reloop = false;
				this.playbackOffset = ((duration * 1000) % (howLong * 1000)) / 1000;				
				console.debug("update demand", id, howLong, duration, this.playbackOffset);			

				const gain = this.gainNode.gain;							
				this.doLoop(id, beginTime, howLong);	
			}
		}	
	}
};

AudioLooper.prototype.start = function(id, when) {
    if (!this.finished || this.looping || this.stopPending) return;
	if (!window.loopCache[this.loop.url]) return;

	this.updateTime = this.audioContext.currentTime;
	this.riffAutoTriggered = false;
	this.playbackRate =  2 ** (parseInt(tempoEle.value) / 12);
	this.playbackOffset = 0;
	this.displayUI(true);	
	this.looping = true;
	this.finished = false;	
	this.reloop = true;
	this.firstTime = true;
	this.id = id;
	this.vol = this.styleType == "bass" ? bassVol/100 : ( this.styleType == "chord" ? chordVol/100 : drumVol/100);
	this.prevVol = this.vol;

	const loop = this.getLoop(this.id);
	
	if (loop) {	
		const beginTime =  loop.start /1000;
		const endTime = loop.stop / 1000;
		const howLong = (endTime - beginTime) / this.playbackRate;	
		
		console.debug("AudioLooper " + this.styleType + " start", when);	

		if (this.sample) this.doLoop(id, beginTime, howLong, when);
		verifyStartStopWebAudio();
	}
};

AudioLooper.prototype.setVolume = function(vol) {
	if (typeof vol != "undefined") {
		this.vol = vol;
		
		if (this.gainNode) {
			this.gainNode.gain.value = vol;
		}
	}
	
	return vol;
};

AudioLooper.prototype.displayUI = function(flag) {
	this.instrumentNode = document.getElementById("arr-instrument-" + this.channel);	
	console.debug("displayUI", this.instrumentNode, this.channel);
	
	if (this.instrumentNode && !mobileCheck()) {
		const classList = this.instrumentNode.parentNode.parentNode.parentNode.parentNode.querySelector("tbody > tr:nth-child(" + (parseInt(this.channel) + 1) + ") > td:nth-child(" + this.counter + ")").classList;				
		
		if (classList) 
		{
			if (flag) {
				if (!classList.contains("note-on")) classList.add("note-on");
			} else {
				classList.remove("note-on");			
			}
		}
	}
};

AudioLooper.prototype.stop = function() {
	this.displayUI(false);
	this.firstTime = false;	
	
	if (this.source && this.id) {
		this.stopPending = true;		
		const loop = this.getLoop(this.id);
		const when = this.audioContext.currentTime;
		let fadeOutSeconds = 0.01;
		
		if (loop) {
			const beginTime =  loop.start /1000;
			const endTime = loop.stop / 1000;
			const duration = (endTime - beginTime);
			const timePassed = (this.audioContext.currentTime - this.startTime);	
			
			fadeOutSeconds += (duration - timePassed) / 4;				
			console.debug("AudioLooper " + this.styleType + " stop", fadeOutSeconds, this.finished);		
		}
		this.gainNode.gain.setTargetAtTime(0.01, this.audioContext.currentTime, 0.5);		
		this.source.stop(when + fadeOutSeconds);
		
		setTimeout(() => {
			this.source.buffer = null;
			this.looping = false;	
			this.stopPending = false;			
			verifyStartStopWebAudio;
			
		}, (fadeOutSeconds + 0.5) * 1000);
	}
};

AudioLooper.prototype.callback = function(cb_loaded, cb_status) {
	this.cb_status = cb_status;
	this.cb_loaded = cb_loaded;
};

AudioLooper.prototype.addUri = function(loop, output, bpm) {
	this.loop = loop;
	this.bpm = bpm;		

	if (output) this.audioContext.setSinkId(output.deviceId);		
};