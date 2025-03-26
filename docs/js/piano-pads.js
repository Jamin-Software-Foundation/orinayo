import { SplendidGrandPiano, ElectricPiano, getElectricPianoNames, Soundfont2Sampler } from "./smplr.mjs"; 

const { SoundFont2 } = window.SoundFont2;
let reverberator;

window.setupPianos = function(context) {
	console.debug("setupPianos", context);
	
	reverberator = keysPlayer.createReverberator(audioContext);	
	reverberator.output.connect(audioContext.destination);
	reverberator.wet.gain.setTargetAtTime(0.25, 0, 0.0001);	
	
	smplrKeys[0] = {name: "Grand Piano", instrument: new SplendidGrandPiano(context)}
	smplrKeys[0].instrument.output.addEffect('reverb', reverberator, 0.25);
	
	let ep = 1;
	
	for (let pianoName of getElectricPianoNames()) {
		smplrKeys[ep] = {name: pianoName, instrument: new ElectricPiano(context, {instrument: pianoName})}
		smplrKeys[ep].instrument.output.addEffect('reverb', reverberator, 0.25);
		ep++;
	}

	let wp = 0;
	const warmPad = new Soundfont2Sampler(context, { url: "./assets/pads/glass-pad.sf2",  createSoundfont: (data) => new SoundFont2(data), decayTime: 1.25});
	
	warmPad.load.then(() => {
		warmPad.loadInstrument(warmPad.instrumentNames[wp]);
	  
		for (let name of warmPad.instrumentNames) {
			smplrPads[wp] = {name, sf2: true, instrument: warmPad}
			//smplrPads[wp].instrument.output.addEffect('reverb', reverberator, 0.15);
			wp++;
		}

		const stringPad = new Soundfont2Sampler(context, { url: "./assets/pads/ensemble-pad.sf2",  createSoundfont: (data) => new SoundFont2(data), decayTime: 1.25});

		stringPad.load.then(() => 
		{
			for (let name of stringPad.instrumentNames) {
				smplrPads[wp] = {name, sf2: true, instrument: stringPad}
				//smplrPads[wp].instrument.output.addEffect('reverb', reverberator, 0.15);
				wp++;
			}

			let lead = 0;
			const leadInstr = new Soundfont2Sampler(context, { url: "./assets/leads/synth_calliope.sf2",  createSoundfont: (data) => new SoundFont2(data), decayTime: 1.25});
			
			leadInstr.load.then(() => {
				leadInstr.loadInstrument(leadInstr.instrumentNames[lead]);
			  
				for (let name of leadInstr.instrumentNames) {
					smplrLeads[lead] = {name, sf2: true, instrument: leadInstr}
					//smplrLeads[lead].instrument.output.addEffect('reverb', reverberator, 0.05);
					lead++;
				}		
			})				
		});		
	})
		
	
	// TODO epiano effects. sync with guitar and tempo
	//epiano.tremolo.level(30);		
}


window.addDbKeysAndPads = function(context, f, h) {
	const config = getConfig();	
	console.debug("addDbKeysAndPads", f, h, config);
	
	indexedDB.databases().then(function (databases) 
	{
		databases.forEach(function (db) 
		{				
			if ((db.name.toLowerCase().endsWith(".keys") && f == 0) || (db.name.toLowerCase().endsWith(".pads") && f == 1) || (db.name.toLowerCase().endsWith(".leads") && f == 2)) {
				console.debug("found keys/pads", db.name);	

				const store = new idbKeyval.Store(db.name, db.name);		

				idbKeyval.get(db.name, store).then(function (data) 
				{
					if (data) {
						console.debug("addDbKeysAndPads", db.name, data);
						
						if (f == 0) {
							const soundfont = new SoundFont2(new Uint8Array(data));
							const instrument = new Soundfont2Sampler(context, {soundfont, decayTime: 1.25});						
							let keys = smplrKeys.length;
							
							for (let name of instrument.instrumentNames) {
								smplrKeys[keys] = {name, sf2: true, instrument}
								smplrKeys[keys].instrument.output.addEffect('reverb', reverberator, 0.25);									

								const optn = document.createElement("option");
								optn.textContent = name;
								h.appendChild(optn);
								
								if (config["instrument" + f] == keys) {
									h.selectedIndex = config["instrument" + f];
									instrument.loadInstrument(name);									
								}
								keys++;	
							}									
						}
						else 
						
						if (f == 1) {
							const soundfont = new SoundFont2(new Uint8Array(data));
							const instrument = new Soundfont2Sampler(context, {soundfont, decayTime: 1.25});							
							let pads = smplrPads.length;
							
							for (let name of instrument.instrumentNames) {
								smplrPads[pads] = {name, sf2: true, instrument}
								smplrPads[pads].instrument.output.addEffect('reverb', reverberator, 0.25);
								
								const optn = document.createElement("option");
								optn.textContent = name;
								h.appendChild(optn);
								
								if (config["instrument" + f] == pads) {
									h.selectedIndex = config["instrument" + f];								
									instrument.loadInstrument(name);										
								}
								pads++;																		
							}											
						}
						
						else 
						
						if (f == 2) {
							const soundfont = new SoundFont2(new Uint8Array(data));
							const instrument = new Soundfont2Sampler(context, {soundfont, decayTime: 1.25});							
							let leads = smplrLeads.length;
							
							for (let name of instrument.instrumentNames) {
								smplrLeads[leads] = {name, sf2: true, instrument}
								smplrLeads[leads].instrument.output.addEffect('reverb', reverberator, 0.25);
								
								const optn = document.createElement("option");
								optn.textContent = name;
								h.appendChild(optn);
								
								if (config["instrument" + f] == leads) {
									h.selectedIndex = config["instrument" + f];								
									instrument.loadInstrument(name);										
								}
								leads++;																		
							}											
						}						
						
		
					}			
				}).catch(function (err) {
					console.error('addDbKeysAndPads failed!', err)
				});					
				
			}
		})	
	});	
}
