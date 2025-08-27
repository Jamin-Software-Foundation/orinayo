# Sound Synthesis

> **Relevant source files**
> * [docs/assets/gs-e-pianos/CP80/cp80.websfz.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gs-e-pianos/CP80/cp80.websfz.json)
> * [docs/assets/leads/synth_calliope.sf2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/leads/synth_calliope.sf2)
> * [docs/assets/pads/glass-pad.sf2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/pads/glass-pad.sf2)
> * [docs/js/0270_Aspirin_sf2_file.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0270_Aspirin_sf2_file.js)
> * [docs/js/0280_JCLive_sf2_file.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0280_JCLive_sf2_file.js)
> * [docs/js/piano-pads.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js)
> * [docs/js/sf2.synth.min.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js)
> * [docs/js/smplr.mjs](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/smplr.mjs)

The sound synthesis system in OrinAyo handles the conversion of MIDI note events into digital audio using multiple synthesis engines and sample libraries. This system provides the core sound generation capabilities for all instruments in the application, from piano sounds to synthesized leads and pads.

For audio effects processing that operates on the synthesized output, see [Audio Effects (Pedalboard)](/Jus-Be/orinayo/4.3-audio-effects-(pedalboard)). For MIDI event processing that feeds into synthesis, see [MIDI Processing](/Jus-Be/orinayo/4.1-midi-processing).

## SF2 Synthesis Engine

The primary sound synthesis engine uses SoundFont 2 (SF2) format instruments through a specialized synthesis library. The `SoundFont.WebMidiLink` class serves as the main interface for SF2-based synthesis.

```mermaid
flowchart TD

SoundFont["SoundFont.WebMidiLink"]
Parser["I (SF2 Parser)"]
Synth["P (Synthesizer)"]
Voice["y (Voice Management)"]
SF2Files["SF2 Files<br>(tone*_sf2_file.js)"]
BinarySF2["Binary SF2<br>(*.sf2)"]
WebAudio["WebAudio Nodes"]
AudioDest["audioContext.destination"]

SF2Files --> Parser
BinarySF2 --> Parser
Voice --> WebAudio

subgraph subGraph2 ["Audio Output"]
    WebAudio
    AudioDest
    WebAudio --> AudioDest
end

subgraph subGraph1 ["Instrument Data"]
    SF2Files
    BinarySF2
end

subgraph subGraph0 ["SF2 Synthesis Core"]
    SoundFont
    Parser
    Synth
    Voice
    Parser --> Synth
    Synth --> Voice
    SoundFont --> Parser
    SoundFont --> Synth
end
```

The synthesis engine processes MIDI events through the `ga` function, which handles note on/off events, control changes, and program changes. Each synthesized voice uses WebAudio buffer sources with envelope shaping and filtering.

Sources: [docs/js/sf2.synth.min.js L1-L954](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L1-L954)

## Sample-Based Synthesis

Modern sample-based synthesis is provided through the smplr library, which offers high-quality instrument sampling with advanced features like velocity layers and round-robin sampling.

```mermaid
flowchart TD

SplendidGrand["SplendidGrandPiano"]
ElectricPiano["ElectricPiano"]
SF2Sampler["Soundfont2Sampler"]
WebSFZ["WebSFZ Files<br>(*.websfz.json)"]
SF2Assets["SF2 Assets<br>(*.sf2)"]
OGGSamples["OGG Samples"]
SmplrKeys["smplrKeys[]"]
SmplrPads["smplrPads[]"]
SmplrLeads["smplrLeads[]"]

WebSFZ --> SF2Sampler
SF2Assets --> SF2Sampler
OGGSamples --> SplendidGrand
SplendidGrand --> SmplrKeys
ElectricPiano --> SmplrKeys
SF2Sampler --> SmplrPads
SF2Sampler --> SmplrLeads

subgraph subGraph2 ["Instrument Arrays"]
    SmplrKeys
    SmplrPads
    SmplrLeads
end

subgraph subGraph1 ["Sample Libraries"]
    WebSFZ
    SF2Assets
    OGGSamples
end

subgraph subGraph0 ["Smplr Engine"]
    SplendidGrand
    ElectricPiano
    SF2Sampler
end
```

The `setupPianos` function initializes the smplr-based instruments and connects them to a shared reverb effect. The system supports dynamic loading of SF2 instruments from IndexedDB storage.

Sources: [docs/js/piano-pads.js L6-L64](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L6-L64)

 [docs/js/smplr.mjs L1-L114](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/smplr.mjs#L1-L114)

## Instrument Management

OrinAyo manages instruments through multiple channels, with different synthesis engines assigned to specific channel ranges:

| Channel Range | Synthesis Engine | Instrument Type |
| --- | --- | --- |
| 0 (Keys) | smplr / SF2Sampler | Piano, Keys |
| 1 (Pads) | smplr / SF2Sampler | Synth Pads |
| 2 (Leads) | smplr / SF2Sampler | Lead Synths |
| 3-8, 10-15 | SF2 Synth | General MIDI |
| 9 | SF2 Synth | MIDI Drums |
| 16-18 | Audio Loops | Drums, Bass, Chords |

The `addDbKeysAndPads` function handles dynamic loading of SF2 instruments from browser storage, creating `Soundfont2Sampler` instances for each discovered instrument bank.

```mermaid
flowchart TD

CH0["Channel 0<br>Keys/Piano"]
CH1["Channel 1<br>Pads"]
CH2["Channel 2<br>Leads"]
CH3_8["Channels 3-8<br>GM Instruments"]
CH9["Channel 9<br>MIDI Drums"]
CH16_18["Channels 16-18<br>Audio Loops"]
SmplrEngine["smplr Engine"]
SF2Engine["SF2 Synthesis Engine"]
LoopEngine["Audio Loop Engine"]

CH0 --> SmplrEngine
CH1 --> SmplrEngine
CH2 --> SmplrEngine
CH3_8 --> SF2Engine
CH9 --> SF2Engine
CH16_18 --> LoopEngine

subgraph subGraph1 ["Synthesis Engines"]
    SmplrEngine
    SF2Engine
    LoopEngine
end

subgraph subGraph0 ["Channel Assignment"]
    CH0
    CH1
    CH2
    CH3_8
    CH9
    CH16_18
end
```

Sources: [docs/js/piano-pads.js L67-L160](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L67-L160)

 [docs/js/sf2.synth.min.js L587-L717](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L587-L717)

## SF2 File Format Support

The synthesis system supports multiple SF2 instrument encoding formats:

### JavaScript-Encoded SF2

Instruments can be embedded directly in JavaScript files with base64-encoded sample data. Each instrument defines zones with key ranges, loop points, and ADSR envelope parameters.

```mermaid
flowchart TD

Zones["zones[]<br>Key/Velocity Ranges"]
Sample["Base64 Sample Data"]
Params["Synthesis Parameters"]
KeyRange["keyRangeLow/High"]
VelRange["lovel/hivel"]
Pitch["originalPitch"]
Loop["loopStart/End"]
Envelope["AHDSR Parameters"]

Zones --> KeyRange
Zones --> VelRange
Zones --> Pitch
Zones --> Loop
Zones --> Envelope

subgraph subGraph1 ["Zone Properties"]
    KeyRange
    VelRange
    Pitch
    Loop
    Envelope
end

subgraph subGraph0 ["SF2 Structure"]
    Zones
    Sample
    Params
    Zones --> Sample
end
```

### WebSFZ Format

Modern instruments use the WebSFZ JSON format, which provides more flexible sample mapping and supports multiple audio formats (OGG, M4A).

Sources: [docs/js/0270_Aspirin_sf2_file.js L1-L18](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0270_Aspirin_sf2_file.js#L1-L18)

 [docs/js/0280_JCLive_sf2_file.js L1-L18](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0280_JCLive_sf2_file.js#L1-L18)

 [docs/assets/gs-e-pianos/CP80/cp80.websfz.json L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gs-e-pianos/CP80/cp80.websfz.json#L1-L1)

## Synthesis Pipeline

The complete synthesis pipeline processes MIDI events through multiple stages:

```mermaid
flowchart TD

MIDI["MIDI Note Events"]
ChannelRoute["Channel Routing"]
SF2Synth["SF2 Synthesizer"]
VoiceAlloc["Voice Allocation"]
BufferSource["AudioBufferSource"]
Envelope["ADSR Envelope"]
Filter["Biquad Filter"]
SmplrInst["Smplr Instrument"]
SampleTrigger["Sample Triggering"]
VelLayers["Velocity Layers"]
Effects["Built-in Effects"]
Output["Audio Output"]

MIDI --> ChannelRoute
ChannelRoute --> SF2Synth
ChannelRoute --> SmplrInst
Filter --> Output
Effects --> Output

subgraph subGraph1 ["Smplr Path"]
    SmplrInst
    SampleTrigger
    VelLayers
    Effects
    SmplrInst --> SampleTrigger
    SampleTrigger --> VelLayers
    VelLayers --> Effects
end

subgraph subGraph0 ["SF2 Path"]
    SF2Synth
    VoiceAlloc
    BufferSource
    Envelope
    Filter
    SF2Synth --> VoiceAlloc
    VoiceAlloc --> BufferSource
    BufferSource --> Envelope
    Envelope --> Filter
end
```

The `noteOn` and `noteOff` methods in the SF2 synthesizer handle voice lifecycle management, while smplr instruments provide their own optimized triggering mechanisms.

Sources: [docs/js/sf2.synth.min.js L745-L775](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L745-L775)

 [docs/js/piano-pads.js L13-L21](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L13-L21)