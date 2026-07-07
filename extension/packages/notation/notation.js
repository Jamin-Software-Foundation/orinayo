(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["converse"], factory);
    } else {
        factory(converse);
    }
}(this, function (converse) {
    let _converse, __, html, formatter;

    converse.plugins.add("notation", {
        'dependencies': [],

        'initialize': function () {
            _converse = this._converse;
            html = converse.env.html;
            __ = _converse.__;			

            _converse.api.listen.on('afterMessageBodyTransformed', function(text) {				
				renderNotation(text);
            });	
			
			_converse.api.listen.on('getMessageActionButtons', (el, buttons) => {
				const text = el.model.get('message');
				
				if (isMusic(text)) {
				   buttons.push({
					   'i18n_text': __('Play'), 
					   'handler': ev => handlePlayMusicAction(el),
					   'button_class': 'chat-msg__action-play-music',
					   'icon_class': 'fa fa-arrow-right',
					   'name': 'play-music'
					});			   
				}
				return buttons;
			});			
			
			formatter = new ChordSheetJS.HtmlTableFormatter();
            console.debug("notation plugin is ready");
        }
    });

	function isAbc(text) {
		return text.startsWith("X:");
	}

	function isChordPro(text) {
		return text.startsWith("{comment:") || text.startsWith("{title:");
	}
	
	function isMusic(text) {
		return isAbc(text) || isChordPro(text);
	}
	
	function handlePlayMusicAction(el) {
		
		if (window.midiBuffer) {	// stop ABC sysnth
			midiBuffer.stop();
			midiBuffer = null;
		}
		
		const text = el.model.get('message');
		
		if (isChordPro(text)) {
			let chordpro = "";			
			if (text.indexOf("{key:") == -1) chordpro += "{key: " + KEYS[keyChange] + "}\n";
			if (text.indexOf("{tempo:") == -1) chordpro += "{tempo: " + tempo + "}\n";			
			if (text.indexOf("{time:") == -1) chordpro += "{time: 4/4}\n";			
			chordpro += "{start_accomp}\n" + text + "\n[*EA]";
			console.debug('handlePlayMusicAction - chordpro', chordpro);
			
			playChordPro(chordpro);
		}
		else

        if (isAbc(text)) {
			window.abcChordList = [];
			
			window.midiBuffer = new ABCJS.synth.CreateSynth();
			const visualObj = ABCJS.renderAbc("*", text)[0];	
			console.debug('handlePlayMusicAction - abc', visualObj);
			
			const chordsOff = false;
			const millisecondsPerMeasure = (60 / tempo * 4) * 1000;	// global tempo
			
			midiBuffer.init({audioContext, visualObj, millisecondsPerMeasure, options: {sequenceCallback, onEnded, chordsOff}}).then(function (response) {
				console.debug("handlePlayMusicAction abc init", response);	
				
				midiBuffer.prime().then(function (response) {
					console.debug("handlePlayMusicAction abc prime", response);						
				});
				
			}).catch(function (error) {
				console.warn("handlePlayMusicAction abc - audio problem:", error);
			});			
		}			
		
	}
	
	function onEnded(info) {
		//console.debug("onEnded", info);		
	}
	
	function sequenceCallback(tracks) {
		console.debug("sequenceCallback style notes", tracks, window.abcChordList, window.abcGainNode);		
		playAbc(tracks);	
	}

    function renderNotation(text)  {
		const msgId = Math.random().toString(36).substr(2,9);
        console.debug("renderNotation", text, msgId);

        if (text.length == 0) return;

        if (isAbc(text)) {
            text.addTemplateResult(0, text.length, html`<div id="abc-${msgId}"></div>`);

            setTimeout(function() {
                ABCJS.renderAbc("abc-" + msgId, text.replace(/<br>/g, '\n'), {foregroundColor: ""});	// use default color
            }, 1000);
        }
		else
			
        if (isChordPro(text)) {
            text.addTemplateResult(0, text.length, html`<div style="overflow-x: hidden;" id="chordpro-${msgId}"></div>`);
			
            setTimeout(function() {			
				const song = chordproParser.parse(text.replace(/<br>/g, '\n'));	
				const ele = document.getElementById("chordpro-" + msgId);
				if (ele) ele.innerHTML = formatter.format(song);
            }, 1000);				
		}			
    }
}));
