(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["converse"], factory);
    } else {
        factory(converse);
    }
}(this, function (converse) {
    let _converse, html, __, model, harker, pcListen = {}, pcSpeak, button, recognition, recognitionActive, stopSpeaking, startSpeaking, myJid, myself, me, startTime;

	converse.plugins.add("voicechat", {
		dependencies: [],

		initialize: function () {
             _converse = this._converse;
            html = converse.env.html;
            __ = _converse.__;
			
			_converse.api.listen.on('connected', async function() {
				await _converse.api.user.settings.set({
						voicechat_prefix: 'VC',					
						voicechat_transcribe: false,
						voicechat_transcribeLanguage: 'en-GB',
						voicechat_start:  __('Start Voice Chat'),
						voicechat_stop: __('Stop Voice Chat'),
						voicechat_started: __('has started speaking'),
						voicechat_stopped: __('has stopped speaking')					
				});
				
				stopSpeaking = await _converse.api.user.settings.get('voicechat_stopped');
				startSpeaking = await _converse.api.user.settings.get('voicechat_started');	
				
				myJid = await _converse.api.connection.get().jid;
				myself = converse.env.Strophe.getBareJidFromJid(myJid);	
				me = converse.env.Strophe.getNodeFromJid(myJid);
				
				startTime = new Date();
			});	

			_converse.api.listen.on('parseMessage', (stanza, attrs) => {
				return parseStanza(stanza, attrs);
			});	
			
			_converse.api.listen.on('parseMUCMessage', (stanza, attrs) => {
				return parseStanza(stanza, attrs);
			});				
						
            _converse.api.listen.on('getToolbarButtons', async function(toolbar_el, buttons) {
				const voiceChatStart = await _converse.api.user.settings.get('voicechat_start');
                let color = "fill:var(--chat-toolbar-btn-color);";
                if (toolbar_el.model.get("type") === "chatroom") color = "fill:var(--muc-toolbar-btn-color);";

                buttons.push(html`
                    <button class="plugin-voicechat" title="${voiceChatStart}" @click=${performAudio}/>
						<svg style="width:18px; height:18px; ${color}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" class="svg-inline--fa fa-volume-up fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>					
                    </button>
                `);

                return buttons;
            });			

            _converse.api.listen.on('chatRoomViewInitialized', function (view) {
                console.debug("chatRoomViewInitialized", view);
				stopVoiceChat();
			});
			
            _converse.api.listen.on('chatBoxViewInitialized', function (view)  {
                console.debug("chatBoxViewInitialized", view);
				stopVoiceChat();
			});
			
            _converse.api.listen.on('chatBoxClosed', function (model)  {
                console.debug("chatBoxClosed", model);
				stopVoiceChat();
            });			
			
			console.log("voicechat plugin is ready");
		}
	});
	
	async function performAudio(ev) {
        ev.stopPropagation();
        ev.preventDefault();

		const toolbar_el = converse.env.utils.ancestor(ev.target, 'converse-chat-toolbar');	
		model = toolbar_el.model;
		const type = (model.get('type') == 'chatroom') ? 'groupchat' : 'chat';				
		const target = model.get('jid');
										
		button = toolbar_el.querySelector('.plugin-voicechat');

		console.debug("voicechat is clicked", model, button);

		if (button.classList.contains('blink_me')) {
			stopVoiceChat(model);						
		} else {
			startVoiceChat();						
		}				
	}

	async function stopVoiceChat() {	
		console.debug("stopVoiceChat", model);
		
		if (pcSpeak){
			pcSpeak.close();
		}
		
		if (button && button.classList.contains('blink_me')) {
			button.classList.remove('blink_me');
			button.title = await _converse.api.user.settings.get('voicechat_start');
			const nick = model.get('nick');	
			model.sendMessage({body: '/me ' + stopSpeaking});	
		}
		
		if (recognitionActive && recognition)
		{
			recognition.stop();
			recognitionActive = false;
		}
		
		if (harker) {
			harker.stop();
		}
		
		// notify subscribers
		_converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whip', {xmlns: 'urn:xmpp:whip:0'}));
		
	}
	
	async function startVoiceChat() {
		console.debug("startVoiceChat", model);		
		
		if (pcSpeak) {		
			pcSpeak.close();
			pcSpeak = null;
		}

		pcSpeak = new RTCPeerConnection();

		pcSpeak.oniceconnectionstatechange = () => {
			console.debug("oniceconnectionstatechange speak", pcSpeak.iceConnectionState);
		}
		
		pcSpeak.ontrack = function (event) {
			console.debug("ontrack speak", event.streams, event);			
		}			
 			
		const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});		
				
		stream.getTracks().forEach(t => 
		{
			if (t.kind === 'audio') {
				pcSpeak.addTransceiver(t, {direction: 'sendonly'})
			}
		})	

		if (await _converse.api.user.settings.get('voicechat_transcribe')) {
			setupSpeechRecognition();
		}					

		harker = hark(stream, {interval: 100, history: 4 });

		harker.on('speaking', async () => {
			
			if (await _converse.api.user.settings.get('voicechat_transcribe') && model) {					
				model.setChatState(_converse.COMPOSING);											
			}
		});

		harker.on('stopped_speaking', async () =>  {
			
			if (await _converse.api.user.settings.get('voicechat_transcribe') && model) {						
				model.setChatState(_converse.PAUSED);												
			}
		});	

		const offer = await pcSpeak.createOffer();
		pcSpeak.setLocalDescription(offer);
		
		const res = await _converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whip', {xmlns: 'urn:xmpp:whip:0'}).c('sdp', offer.sdp));
		const answer = res.querySelector('sdp').innerHTML;
		pcSpeak.setRemoteDescription({sdp: answer,  type: 'answer'});	
		console.debug('whip answer', answer);

		if (button) {
			button.classList.add('blink_me');	
			button.title = await _converse.api.user.settings.get('voicechat_stop');
			const nick = model.get('nick');	
			model.sendMessage({body: '/me ' + startSpeaking});			
		}		
	}
	
	function getTargetJidFromMessageModel(model) {
		const type = model.get("type");	
		let target = model.get('from_muc');
		
		if (type === "chat")  {
			target = model.get('jid');
			if (model.get('sender') === 'them') {
				target = model.get('from');
			}		
		}
		return target;
	}	
	
    async function setupSpeechRecognition() {
        console.debug("setupSpeechRecognition");

        recognition = new webkitSpeechRecognition();
        recognition.lang = await _converse.api.user.settings.get('voicechat_transcribeLanguage');
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = function(event)
        {
            console.debug("Speech recog event", event)

            if (event.results[event.resultIndex].isFinal==true)
            {
                const transcript = event.results[event.resultIndex][0].transcript;
                console.debug("Speech recog transcript", transcript);
                if (model) model.sendMessage({'body': transcript});		
				if (model) model.setChatState(_converse.ACTIVE);					
			}
        }

        recognition.onspeechend  = function(event)
        {
            console.debug("Speech recog onspeechend", event);		
        }

        recognition.onstart = function(event)
        {
            console.debug("Speech to text started", event);
            recognitionActive = true;			
        }

        recognition.onend = function(event)
        {
            console.debug("Speech to text ended", event);

            if (recognitionActive)
            {
                console.debug("Speech to text restarted");
                setTimeout(function() {recognition.start()}, 1000);
            }
        }

        recognition.onerror = function(event)
        {
            console.debug("Speech to text error", event);
        }

        recognition.start();		
    }

	async function parseStanza(stanza, attrs) {
		const whip = stanza.querySelector('whip');	
			
		if (whip && startTime < (new Date(attrs.time))) {	
			const username = whip.getAttribute("id");
			const action = whip.getAttribute("action");
			
			if (username != me)	{		
				
				if (action == "start" && !pcListen[username]) {
					console.debug("remote add stream", username);				
					handleStream(username);				
				}
				else
					
				if (action == "stop" && pcListen[username]) {
					console.debug("remote remove stream", username);					
					pcListen[username].close();						
					delete pcListen[username];							
					document.getElementById("voicechat-" + username)?.remove();				
				}	
			}				
		}
		
		return attrs;
	}	
	
	async function handleStream(streamKey) {
		pcListen[streamKey] = new RTCPeerConnection();

		pcListen[streamKey].oniceconnectionstatechange = () => {
			console.debug("oniceconnectionstatechange listen", pcListen[streamKey].iceConnectionState);
		}
		
		pcListen[streamKey].ontrack = function (event) {
			console.debug("ontrack listen ", event.streams, event);	

			let ele = document.getElementById("voicechat-" + streamKey);
			
			if (!ele) {
				ele = document.createElement("audio");
				ele.id = "voicechat-" + streamKey;					
				document.body.appendChild(ele);
			}
			
			ele.setAttribute("autoplay", true);
			ele.srcObject = event.streams[0];			
		}			
		
		pcListen[streamKey].addTransceiver('audio', { direction: 'recvonly' })

		const offer = await pcListen[streamKey].createOffer();
		pcListen[streamKey].setLocalDescription(offer);
		console.debug('handleStream - whep offer', streamKey, offer.sdp);					

		const res = await _converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whep', {id: streamKey, xmlns: 'urn:xmpp:whep:0'}).c('sdp', offer.sdp));				
		console.debug('whep set response', streamKey, res);
		
		const answer = res.querySelector('sdp').innerHTML;
		pcListen[streamKey].setRemoteDescription({sdp: answer,  type: 'answer'});	
		console.debug('whep answer', streamKey, answer);		
	}	
	
}));
