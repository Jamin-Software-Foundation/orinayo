(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["converse"], factory);
    } else {
        factory(converse);
    }
}(this, function (converse) {
    let _converse, html, __, model, harker, videoDiv, msgDiv, pcListen = {}, speakers = {}, audioStream, screenStream, chatsLoaded, screenStreamUri, audioStreamUri, pcScreen, pcSpeak, button, screenButton, recognition, recognitionActive, myJid, myself, me, startTime;

	converse.plugins.add("voicechat", {
		dependencies: [],

		initialize: function () {
             _converse = this._converse;
            html = converse.env.html;
            __ = _converse.__;
			
            _converse.api.listen.on('getToolbarButtons', async function(toolbar_el, buttons) {
                console.debug("getToolbarButtons", toolbar_el.model);	

				const view = _converse.chatboxviews.get(toolbar_el.model.get('jid'));

				if (view) {
					msgDiv = view.querySelector(".chat-content__messages");
					videoDiv = document.createElement('iframe');
					videoDiv.style = "display:none; width: 100%; height: 800px; border:none; margin:0; padding:0; overflow:hidden;";
					videoDiv.src = "./packages/voicechat/dish.html";											
					msgDiv.parentNode.appendChild(videoDiv);
				}				
				
				const voiceChatStart = await _converse.api.user.settings.get('voicechat_start');
				const screenCastStart = await _converse.api.user.settings.get('screenshare_start');				
				
                let color = "fill:var(--secondary-color);";
                if (toolbar_el.model.get("type") == "chatbox") color = "fill:var(--chat-color);";
                if (toolbar_el.model.get("type") === "chatroom") color = "fill:var(--muc-color);";

                buttons.push(html`
                    <button class="btn plugin-voicechat" title="${voiceChatStart}" @click=${performAudio}/>
						<svg style="width:18px; height:18px; ${color}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" class="svg-inline--fa fa-volume-up fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>					
                    </button>
                `);
				
				// TODO
				/*
				buttons.push(html`
					<button class="btn plugin-screencast" title="${screenCastStart}" @click=${performScreenCast} />
						<svg style="width:18px; height:18px; ${color}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 30,2L 2,2 C 0.896,2,0,2.896,0,4l0,18 c0,1.104, 0.896,2, 2,2l 9.998,0 c-0.004,1.446-0.062,3.324-0.61,4L 10.984,28 C 10.44,28, 10,28.448, 10,29C 10,29.552, 10.44,30, 10.984,30l 10.030,0 C 21.56,30, 22,29.552, 22,29c0-0.552-0.44-1-0.984-1l-0.404,0 c-0.55-0.676-0.606-2.554-0.61-4L 30,24 c 1.104,0, 2-0.896, 2-2L 32,4 C 32,2.896, 31.104,2, 30,2z M 14,24l-0.002,0.004 C 13.998,24.002, 13.998,24.002, 14,24L 14,24z M 18.002,24.004L 18,24l 0.002,0 C 18.002,24.002, 18.002,24.002, 18.002,24.004z M 30,20L 2,20 L 2,4 l 28,0 L 30,20 z"></path></g></svg>
					</button>
				`);		
				*/
                return buttons;
            });	

			_converse.api.listen.on('connected', async function() {
	            console.debug("voicechat - connected");	
				
				await _converse.api.user.settings.set({
						voicechat_prefix: 'VC',					
						voicechat_transcribe: false,
						voicechat_transcribeLanguage: 'en-GB',
						
						voicechat_start:  __('Start voice chat'),
						voicechat_stop: __('Stop voice chat'),	
						
						screenshare_start: __('Start a screen share'),
						screenshare_stop: __('Stop a screen share'),						
				});
				
				myJid = await _converse.api.connection.get().jid;
				myself = converse.env.Strophe.getBareJidFromJid(myJid);	
				me = converse.env.Strophe.getNodeFromJid(myJid);
				
				startTime = new Date(+(new Date()) + 3000);
				chatsLoaded = false;
			});	

			_converse.api.listen.on('parseMessage', (stanza, attrs) => {
				return parseStanza(stanza, attrs);
			});	
			
			_converse.api.listen.on('parseMUCMessage', (stanza, attrs) => {
				return parseStanza(stanza, attrs);
			});	

			_converse.api.listen.on('parseMUCPresence', (stanza, attrs) => {
				console.debug("parseMUCPresence", stanza, attrs);
				return attrs;
			});						

            _converse.api.listen.on('chatRoomViewInitialized', async function (view) {
                console.debug("chatRoomViewInitialized", view);
				stopVoiceChat();
				stopScreenCast(view);
			});
			
            _converse.api.listen.on('chatBoxViewInitialized', async function (view)  {
                console.debug("chatBoxViewInitialized", view);			
				stopVoiceChat();
				stopScreenCast(view);
			});
			
            _converse.api.listen.on('chatBoxClosed', async function (model)  {
                console.debug("chatBoxClosed", model);			
				stopVoiceChat();
				stopScreenCast();
            });			
			
			console.log("voicechat plugin is ready");
		}
	});
	
    async function performScreenCast(ev)   {
        ev.stopPropagation();
        ev.preventDefault();

		const toolbar_el = converse.env.utils.ancestor(ev.target, 'converse-chat-toolbar');
		const view = _converse.chatboxviews.get(toolbar_el.model.get('jid'));		
		model = toolbar_el.model;
		
		screenButton = toolbar_el.querySelector('.plugin-screencast');
		console.debug("screenshare is clicked", model);	

		if (screenButton.classList.contains('blink_me')) {
			stopScreenCast(view);						
		} else {
			startScreenCast(view);						
		}		

	}	

	async function performAudio(ev) {
        ev.stopPropagation();
        ev.preventDefault();

		const toolbar_el = converse.env.utils.ancestor(ev.target, 'converse-chat-toolbar');	
		const view = _converse.chatboxviews.get(toolbar_el.model.get('jid'));		
		model = toolbar_el.model;
		const type = (model.get('type') == 'chatroom') ? 'groupchat' : 'chat';				
		const target = model.get('jid');
										
		button = toolbar_el.querySelector('.plugin-voicechat');		
		console.debug("voicechat is clicked", model, button);

		if (button.classList.contains('blink_me')) {
			stopVoiceChat(view);						
		} else {
			startVoiceChat(view);						
		}				
	}
	
	async function stopScreenCast() {
		console.debug("stopScreenCast", model);		
		
		if (!model) return;	

		if (pcScreen){
			screenStream.getTracks().forEach(track => track.stop());
			pcScreen.close();	
			delete pcListen[screenStreamUri];				
		}		
		
		if (screenButton.classList.contains('blink_me')) {
			screenButton.classList.remove('blink_me');
			screenButton.title = await _converse.api.user.settings.get('screenshare_start');
			
			const message = "/me stopped screen share";
			const target = (model.get('type') == 'chatbox') ? model.get('jid') : (model.get('type') == 'chatroom' ? model.get('jid') : model.get('from'));			
			const type = (model.get('type') == 'chatroom') ? 'groupchat' : 'chat';				
			const msg = converse.env.stx`<message xmlns="jabber:client" from="${myJid}" to="${target}" type="${type}"><body>${message}</body><retract xmlns='urn:xmpp:call-invites:0' id='${screenStreamUri}' /></message>`;
			_converse.api.send(msg);			
		}			

	}	

	async function stopVoiceChat() {	
		console.debug("stopVoiceChat", model);		
		if (!model) return;	
		
		if (pcSpeak){
			audioStream.getTracks().forEach(track => track.stop());			
			pcSpeak.close();
			delete pcListen[audioStreamUri];			
		}
		
		if (button && button.classList.contains('blink_me')) {
			button.classList.remove('blink_me');
			button.title = await _converse.api.user.settings.get('voicechat_start');

			const message = "/me stopped speaking";
			const target = (model.get('type') == 'chatbox') ? model.get('jid') : (model.get('type') == 'chatroom' ? model.get('jid') : model.get('from'));			
			const type = (model.get('type') == 'chatroom') ? 'groupchat' : 'chat';				
			const msg = converse.env.stx`<message xmlns="jabber:client" from="${myJid}" to="${target}" type="${type}"><body>${message}</body><retract xmlns='urn:xmpp:call-invites:0' id='${audioStreamUri}' /></message>`;
			_converse.api.send(msg);
		
		}
		
		if (recognitionActive && recognition) {
			recognition.stop();
			recognitionActive = false;
		}
		
		if (harker) {
			harker.stop();
		}
	}
	
	async function startScreenCast() {
		console.debug("startScreenCast", model);			
		
		if (pcScreen) {	
			screenStream.getTracks().forEach(track => track.stop());		
			pcScreen.close();
			delete pcListen[screenStreamUri];
		}	
		
		const displayMediaOptions = {video: {cursor: 'always', frameRate: {ideal: 30}, width: {ideal: 1280, max: 1920}, height: {ideal: 720, max: 1080}}, audio: false,  preferCurrentTab: false,  selfBrowserSurface: "exclude",  systemAudio: "exclude",  surfaceSwitching: "include", monitorTypeSurfaces: "include"};		
		screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		
		if (screenStream) {
		
			pcScreen = new RTCPeerConnection();	

			pcScreen.oniceconnectionstatechange = () => {
				console.debug("screen oniceconnectionstatechange screen", pcScreen.iceConnectionState);
			}
			
			pcScreen.ontrack = function (event) {
				console.debug("screen ontrack screen", event.streams, event);			
			}			
			
			screenStream.getTracks().forEach(t => {
				console.debug("screen getTracks", t);
				
				if (t.kind === 'audio') {
				  pcScreen.addTransceiver(t, {direction: 'sendonly'});
				  
				} else {
				  pcScreen.addTransceiver(t, {direction: 'sendonly', sendEncodings: [{rid: 'high'}, {rid: 'med', scaleResolutionDownBy: 2.0}, {rid: 'low',	scaleResolutionDownBy: 4.0}]});
				}
			});

			const offer = await pcScreen.createOffer();
			pcScreen.setLocalDescription(offer);
			
			const res = await _converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whip', {xmlns: 'urn:xmpp:whip:0'}).c('sdp', offer.sdp));
			screenStreamUri = res.querySelector('whip').getAttribute("uri");
			pcListen[screenStreamUri] = pcScreen;	

			const answer = res.querySelector('sdp').innerHTML;
			pcScreen.setRemoteDescription({sdp: answer,  type: 'answer'});	
			console.debug('screen whip answer', answer);

			screenButton.classList.add('blink_me');	
			screenButton.title = await _converse.api.user.settings.get('screenshare_stop');

			const message = "/me started screen share";				
			const type = (model.get('type') == 'chatroom') ? 'groupchat' : 'chat';	
			const target = (model.get('type') == 'chatbox') ? model.get('jid') : (model.get('type') == 'chatroom' ? model.get('jid') : model.get('from'));			
			const msg = converse.env.stx`<message xmlns="jabber:client" from="${myJid}" to="${target}" type="${type}"><body>${message}</body><invite video="true" xmlns="urn:xmpp:call-invites:0"><external uri="${screenStreamUri}" /></invite></message>`;
			_converse.api.send(msg);			
		}
	}	
	
	async function startVoiceChat() {
		console.debug("startVoiceChat", model);	
			
		if (pcSpeak) {	
			audioStream.getTracks().forEach(track => track.stop());
			pcSpeak.close();
			delete pcListen[audioStreamUri];
		}

		const question = await _converse.api.user.settings.get('voicechat_start') + "?";
		const sure = confirm(question);
		
		if (sure) {
			pcSpeak = new RTCPeerConnection();

			pcSpeak.oniceconnectionstatechange = () => {
				console.debug("oniceconnectionstatechange speak", pcSpeak.iceConnectionState);
			}
			
			pcSpeak.ontrack = function (event) {
				console.debug("ontrack speak", event.streams, event);			
			}			
				
			audioStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});		

			if (audioStream) {
				audioStream.getTracks().forEach(t => 
				{
					if (t.kind === 'audio') {
						pcSpeak.addTransceiver(t, {direction: 'sendonly'})
					}
				})	

				if (await _converse.api.user.settings.get('voicechat_transcribe')) {
					setupSpeechRecognition();
				}					

				harker = hark(audioStream, {interval: 100, history: 4 });

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
				audioStreamUri = res.querySelector('whip').getAttribute("uri");
				pcListen[audioStreamUri] = pcSpeak;	
				
				const answer = res.querySelector('sdp').innerHTML;
				pcSpeak.setRemoteDescription({sdp: answer,  type: 'answer'});	
				console.debug('whip answer', answer);

				button.classList.add('blink_me');	
				button.title = await _converse.api.user.settings.get('voicechat_stop');

				const message = "/me started speaking";				
				const type = (model.get('type') == 'chatroom') ? 'groupchat' : 'chat';	
				const target = (model.get('type') == 'chatbox') ? model.get('jid') : (model.get('type') == 'chatroom' ? model.get('jid') : model.get('from'));			
				const msg = converse.env.stx`<message xmlns="jabber:client" from="${myJid}" to="${target}" type="${type}"><body>${message}</body><invite xmlns="urn:xmpp:call-invites:0"><external uri="${audioStreamUri}" /></invite></message>`;
				_converse.api.send(msg);				
			}
		}
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
		const now = new Date(attrs.time);
		console.debug("parseStanza", (startTime < now), stanza, attrs);
		
		if (!chatsLoaded && startTime < now) {
			chatsLoaded = true;
			startListening(attrs);
		}

		const accept = stanza.querySelector('accept');			
		const invite = stanza.querySelector('invite');	
		const retract = stanza.querySelector('retract');
			
		if (invite) { 	
			const uri = invite.querySelector('external').getAttribute("uri");
			speakers[uri] = {video: invite.getAttribute("video")};			

			if (startTime < now) {	// live invite
				console.debug("remote add stream", uri);				
				
				if (!pcListen[uri])  {	
					handleStream(uri, attrs);			
				}	
			} else { // history invite
				console.debug("remote history add stream", uri);				
			}				
		}
		else
			
		if (accept) {	
			const uri = accept.getAttribute("id");
			
			if (startTime < now) {	// live accept
				console.debug("remote accept stream", uri);	
				
			} else {	// historical accept

			}				
		}
		else
			
		if (retract) {	
			const uri = retract.getAttribute("id");
			const mediaData = speakers[uri];						
			
			if (startTime < now) {
				console.debug("remote remove stream", uri);				
				
				if (pcListen[uri])  {	// live retraction	
					pcListen[uri].close();						
					delete pcListen[uri];

					if (mediaData.video) {
						videoDiv.contentWindow.document.getElementById("voicechat-" + uri)?.remove();	
						
						if (videoDiv.contentWindow.document.getElementsByClassName("voicechat-video").length == 0) {	
							msgDiv.style.display = "";
							videoDiv.innerHTML = "";
							videoDiv.style.display = "none";
						}						
						
					} else {
						document.getElementById("voicechat-" + uri)?.remove();								
					}
				}		
				
			} else {	// historical retraction
				console.debug("remote history remove stream", uri);			
			}

			delete speakers[uri];
		}		
					
		return attrs;
	}	
	
	async function handleStream(uri, attrs) {
		const mediaData = speakers[uri];
		console.debug("handleStream - media data", mediaData);
		
		pcListen[uri] = new RTCPeerConnection();

		pcListen[uri].oniceconnectionstatechange = () => {
			console.debug("oniceconnectionstatechange listen", pcListen[uri].iceConnectionState);
		}
		
		pcListen[uri].ontrack = function (event) {
			console.debug("ontrack listen ", event.streams, event, videoDiv.contentWindow.dish);	

			if (mediaData.video && event.track.kind == "video") {
				msgDiv.style.display = "none";
				videoDiv.style.display = "";
				
				let video = document.getElementById("voicechat-" + uri);				

				if (!video) {				
					video = document.createElement('video');
					video.id = "voicechat-" + uri;	
					video.classList.add("voicechat-video");
					video.autoplay = true;
					video.controls = true;	
				}
				video.srcObject = event.streams[0];						
				videoDiv.contentWindow.addVideo(video);							
			} 
			else

			if (!mediaData.video && event.track.kind == "audio") {
				let ele = document.getElementById("voicechat-" + uri);
				
				if (!ele) {
					ele = document.createElement("audio");
					ele.id = "voicechat-" + uri;	
					ele.setAttribute("autoplay", true);					
					document.body.appendChild(ele);
				}
				
				ele.srcObject = event.streams[0];		
			}				
		}			
		
		pcListen[uri].addTransceiver('audio', { direction: 'recvonly' });
		
		if (mediaData.video) {
			pcListen[uri].addTransceiver('video', { direction: 'recvonly' });
		}

		const offer = await pcListen[uri].createOffer();
		pcListen[uri].setLocalDescription(offer);
		console.debug('handleStream - whep offer', uri, offer.sdp);					

		const res = await _converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whep', {uri: uri, xmlns: 'urn:xmpp:whep:0'}).c('sdp', offer.sdp));				
		console.debug('whep set response', uri, res);
		
		const answer = res.querySelector('sdp').innerHTML;
		pcListen[uri].setRemoteDescription({sdp: answer,  type: 'answer'});	
		console.debug('whep answer', uri, answer);	

		const message = "/me " + (mediaData.video ? "watching" : "listening to") + " " + uri;
		const type = attrs.type;
		const target = (type == "chat") ? attrs.from : attrs.from_muc;
		const msg = converse.env.stx`<message xmlns="jabber:client" from="${myJid}" to="${target}" type="${type}"><body>${message}</body><accept xmlns='urn:xmpp:call-invites:0' id='${uri}' /></message>`;
		_converse.api.send(msg);
			
	}	
	
	async function startListening(attrs) {
		const speakerURIs = Object.getOwnPropertyNames(speakers);
		console.debug("startListening", speakerURIs, attrs);
		
		for (let uri of speakerURIs) {
			handleStream(uri, attrs)
		}

		speakers = {};		
	}
	
	async function getSelectedModel() {
		var models = await _converse.api.chatboxes.get(); //_converse.chatboxes.models;
		console.debug("getSelectedModel", models);

		for (var i=0; i<models.length; i++) 
		{
			if (!models[i].get('hidden')) {
				return models[i];
			}
		}
		return null;
	}	
	
	function injectMessage(model, body, nick) {
		const msgId = 'inject-' + Math.random().toString(36).substr(2,9);
		const type = model.get("type") == "chatbox" ? "chat" : "groupchat";
		const from = nick == me ? _converse.jid : model.get("jid");		

		let attrs = {message: body, body, id: msgId, msgId, type, from}; 
		
		if (type == "groupchat") {
			attrs = {message: body, body, id: msgId, msgId, type, from_muc: model.get("jid"), from: model.get("jid") + '/' + nick, nick};  
		}
		
		model.queueMessage(attrs);		
	}	
	
}));
