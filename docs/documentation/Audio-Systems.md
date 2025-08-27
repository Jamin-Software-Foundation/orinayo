# Audio Systems

> **Relevant source files**
> * [docs/assets/gmgsx.sf2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gmgsx.sf2)
> * [docs/assets/leads/synth_calliope.sf2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/leads/synth_calliope.sf2)
> * [docs/assets/pads/glass-pad.sf2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/pads/glass-pad.sf2)
> * [docs/css/synth.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/synth.css)
> * [docs/js/midi-parser.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js)
> * [docs/js/midi.ble.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js)
> * [docs/js/piano-pads.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js)
> * [docs/js/sf2.synth.min.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js)
> * [docs/js/smplr.mjs](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/smplr.mjs)
> * [docs/packages/notation/abcjs.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/abcjs.js)
> * [docs/packages/notation/notation.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js)
> * [orinayo.exe](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/orinayo.exe)

This document covers OrinAyo's comprehensive audio processing capabilities, including MIDI parsing, sound synthesis, instrument management, and music notation systems. The audio systems handle input from various controllers, process MIDI data, synthesize sounds using SoundFont technology, and provide real-time audio effects.

For information about input device handling, see [Input Controllers](/Jus-Be/orinayo/2.3-input-controllers). For details about the audio looping engine that coordinates these systems, see [Audio Processing Pipeline](/Jus-Be/orinayo/3.2-audio-processing-pipeline).

## MIDI Processing Pipeline

OrinAyo's MIDI processing system handles multiple file formats and provides real-time MIDI communication through Bluetooth Low Energy. The system supports Yamaha SFF, Ketron KST, Casio AC7, and standard MIDI files.

### MIDI File Parser Architecture

```mermaid
flowchart TD

SFF["SFF Files<br>(Yamaha)"]
KST["KST Files<br>(Ketron)"]
AC7["AC7 Files<br>(Casio)"]
MID["MID Files<br>(Standard MIDI)"]
SAS["SAS Files<br>(Style)"]
parseMidi["parseMidi(data, arrName)"]
Parser["Parser Class<br>Binary Data Reader"]
parseAc7["parseAc7(data)"]
parseCasm["parseCasm(data)"]
parseSmf["parseSmf(parser, arrName)"]
parseSas["parseSas(parser, arrName)"]
parseData["parseData(data, arrName)"]
Events["events{}<br>Structured MIDI Data"]
Header["header{}<br>Format Information"]
CASM["casm[]<br>Chord Accompaniment"]

SFF --> parseMidi
KST --> parseMidi
AC7 --> parseMidi
MID --> parseMidi
SAS --> parseMidi
parseMidi --> parseAc7
parseMidi --> parseCasm
parseMidi --> parseSmf
parseMidi --> parseSas
parseMidi --> parseData
parseAc7 --> Events
parseSmf --> Events
parseSas --> Events
parseData --> Events
parseCasm --> CASM
Parser --> Header

subgraph subGraph3 ["Output Structure"]
    Events
    Header
    CASM
end

subgraph subGraph2 ["Format-Specific Processors"]
    parseAc7
    parseCasm
    parseSmf
    parseSas
    parseData
end

subgraph subGraph1 ["Parser Engine"]
    parseMidi
    Parser
    parseMidi --> Parser
end

subgraph subGraph0 ["MIDI Input Sources"]
    SFF
    KST
    AC7
    MID
    SAS
end
```

The MIDI parser supports multiple industry-standard arranger file formats through specialized parsing functions. Each format processor extracts musical sections like "Main A", "Fill In AA", "Intro A", and "Ending A" into a unified event structure.

**Sources:** [docs/js/midi-parser.js L4-L53](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L4-L53)

 [docs/js/midi-parser.js L204-L426](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L204-L426)

 [docs/js/midi-parser.js L517-L583](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L517-L583)

### BLE MIDI Communication

```mermaid
flowchart TD

blepacket["BLE Packet"]
bleMIDIrx["bleMIDIrx(blepacket)"]
parseMidiByte["parseMidiByte(currentByte)"]
convertTimestamp["convertTimestamp(timestampBLE, connTime)"]
handleChordaMidiMessage["handleChordaMidiMessage(midiMessage)"]
translateChordaToI1["translateChordaToI1(callback, flag, trigger, velocity, channel)"]
handleNoteOn["handleNoteOn(note, device, velocity)"]
handleNoteOff["handleNoteOff(note, device, velocity)"]

parseMidiByte --> handleChordaMidiMessage
translateChordaToI1 --> handleNoteOn
translateChordaToI1 --> handleNoteOff

subgraph subGraph2 ["Output Events"]
    handleNoteOn
    handleNoteOff
end

subgraph subGraph1 ["MIDI Message Handling"]
    handleChordaMidiMessage
    translateChordaToI1
    handleChordaMidiMessage --> translateChordaToI1
end

subgraph subGraph0 ["BLE Input Processing"]
    blepacket
    bleMIDIrx
    parseMidiByte
    convertTimestamp
    blepacket --> bleMIDIrx
    bleMIDIrx --> parseMidiByte
    bleMIDIrx --> convertTimestamp
end
```

The BLE MIDI system processes incoming Bluetooth MIDI packets, handles timestamp synchronization, and translates device-specific MIDI messages into OrinAyo's internal event format.

**Sources:** [docs/js/midi.ble.js L122-L171](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L122-L171)

 [docs/js/midi.ble.js L12-L89](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L12-L89)

 [docs/js/midi.ble.js L173-L221](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L173-L221)

 [docs/js/midi.ble.js L224-L264](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L224-L264)

## Sound Synthesis Engine

OrinAyo uses SoundFont 2 synthesis for realistic instrument sounds, implemented through a WebAudio-based synthesizer that supports polyphonic playback and real-time parameter control.

### SoundFont Synthesis Architecture

```mermaid
flowchart TD

sf2synth["sf2synth.min.js<br>Main Synthesizer"]
CreateSynth["CreateSynth Class"]
SynthSequence["SynthSequence"]
SynthController["SynthController"]
noteOn["P.prototype.noteOn(channel, note, velocity)"]
noteOff["P.prototype.noteOff(channel, note)"]
AudioContext["WebAudio Context"]
BufferSource["Audio Buffer Sources"]
SF2Files["SoundFont Files (.sf2)"]
Samples["Audio Samples"]
Presets["Instrument Presets"]
Zones["Sample Zones"]
GainNode["Gain Nodes"]
FilterNode["Filter Nodes"]
ReverbNode["Reverb Effects"]
DestinationNode["Audio Destination"]

SF2Files --> sf2synth
CreateSynth --> noteOn
CreateSynth --> noteOff
BufferSource --> GainNode
Presets --> sf2synth

subgraph subGraph3 ["Effects Chain"]
    GainNode
    FilterNode
    ReverbNode
    DestinationNode
    GainNode --> FilterNode
    FilterNode --> ReverbNode
    ReverbNode --> DestinationNode
end

subgraph subGraph2 ["Instrument Data"]
    SF2Files
    Samples
    Presets
    Zones
    Samples --> Zones
    Zones --> Presets
end

subgraph subGraph1 ["Audio Generation"]
    noteOn
    noteOff
    AudioContext
    BufferSource
    noteOn --> AudioContext
    noteOff --> AudioContext
    AudioContext --> BufferSource
end

subgraph subGraph0 ["SF2 Synthesis Core"]
    sf2synth
    CreateSynth
    SynthSequence
    SynthController
    sf2synth --> CreateSynth
end
```

The synthesis engine creates individual voice instances for each note, applies envelope shaping, filtering, and routing through a WebAudio effects chain to the final output destination.

**Sources:** [docs/js/sf2.synth.min.js L38-L96](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L38-L96)

 [docs/js/sf2.synth.min.js L745-L775](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L745-L775)

 [docs/js/sf2.synth.min.js L412-L449](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L412-L449)

## Instrument Management

The instrument system provides high-quality piano, pad, and lead sounds through both built-in samples and user-loaded SoundFont files stored in IndexedDB.

### Piano and Pad Instruments

| Instrument Type | Implementation | Audio Engine | Effects |
| --- | --- | --- | --- |
| Grand Piano | `SplendidGrandPiano` | Smplr Library | Reverb 0.25 |
| Electric Piano | `ElectricPiano` | Smplr Library | Reverb 0.25 |
| Glass Pad | `Soundfont2Sampler` | SF2 + Smplr | Reverb 0.15 |
| Ensemble Pad | `Soundfont2Sampler` | SF2 + Smplr | Reverb 0.15 |
| Synth Lead | `Soundfont2Sampler` | SF2 + Smplr | Reverb 0.05 |

```mermaid
flowchart TD

setupPianos["setupPianos(context)"]
addDbKeysAndPads["addDbKeysAndPads(context, f, h)"]
SplendidGrandPiano["SplendidGrandPiano"]
ElectricPiano["ElectricPiano"]
getElectricPianoNames["getElectricPianoNames()"]
Soundfont2Sampler["Soundfont2Sampler"]
SoundFont2["SoundFont2 Class"]
GlassPadSF2["glass-pad.sf2"]
EnsemblePadSF2["ensemble-pad.sf2"]
SynthCalliopeSF2["synth_calliope.sf2"]
IndexedDB["IndexedDB Storage"]
idbKeyval["idbKeyval Store"]
DatabaseQuery["indexedDB.databases()"]
Reverberator["Reverberator Effect"]
AudioDestination["audioContext.destination"]

setupPianos --> SplendidGrandPiano
setupPianos --> ElectricPiano
setupPianos --> getElectricPianoNames
setupPianos --> Reverberator
addDbKeysAndPads --> IndexedDB
addDbKeysAndPads --> idbKeyval
addDbKeysAndPads --> Soundfont2Sampler
SplendidGrandPiano --> Reverberator
ElectricPiano --> Reverberator
Soundfont2Sampler --> Reverberator

subgraph subGraph4 ["Audio Effects"]
    Reverberator
    AudioDestination
    Reverberator --> AudioDestination
end

subgraph subGraph3 ["Storage System"]
    IndexedDB
    idbKeyval
    DatabaseQuery
end

subgraph subGraph2 ["SoundFont Instruments"]
    Soundfont2Sampler
    SoundFont2
    GlassPadSF2
    EnsemblePadSF2
    SynthCalliopeSF2
    Soundfont2Sampler --> SoundFont2
    Soundfont2Sampler --> GlassPadSF2
    Soundfont2Sampler --> EnsemblePadSF2
    Soundfont2Sampler --> SynthCalliopeSF2
end

subgraph subGraph1 ["Built-in Instruments"]
    SplendidGrandPiano
    ElectricPiano
    getElectricPianoNames
end

subgraph subGraph0 ["Instrument Setup"]
    setupPianos
    addDbKeysAndPads
end
```

The instrument management system automatically scans IndexedDB for user-uploaded SoundFont files and integrates them with built-in instruments, providing a unified interface for sound selection.

**Sources:** [docs/js/piano-pads.js L6-L64](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L6-L64)

 [docs/js/piano-pads.js L67-L160](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L67-L160)

 [docs/js/smplr.mjs L1-L100](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/smplr.mjs#L1-L100)

## Audio Effects Processing

Audio effects are implemented through WebAudio nodes and provide real-time processing capabilities including reverb, filtering, and dynamic range control.

### Effects Chain Architecture

```mermaid
flowchart TD

InstrumentOutput["Instrument Audio Output"]
MidiNoteEvents["MIDI Note Events"]
GainNodes["Gain Nodes<br>Volume Control"]
BiquadFilter["Biquad Filter<br>Low-pass Filtering"]
StereoPanner["Stereo Panner<br>Spatial Positioning"]
Reverberator["Reverberator<br>Spatial Ambience"]
DynamicsCompressor["Dynamics Compressor<br>Level Control"]
MasterGain["Master Gain Node"]
AudioDestination["Audio Context Destination"]
ExternalHardware["External Hardware Output"]

InstrumentOutput --> GainNodes
MidiNoteEvents --> GainNodes
DynamicsCompressor --> MasterGain

subgraph subGraph2 ["Output Routing"]
    MasterGain
    AudioDestination
    ExternalHardware
    MasterGain --> AudioDestination
    MasterGain --> ExternalHardware
end

subgraph subGraph1 ["Effects Processing"]
    GainNodes
    BiquadFilter
    StereoPanner
    Reverberator
    DynamicsCompressor
    GainNodes --> BiquadFilter
    BiquadFilter --> StereoPanner
    StereoPanner --> Reverberator
    Reverberator --> DynamicsCompressor
end

subgraph subGraph0 ["Audio Input"]
    InstrumentOutput
    MidiNoteEvents
end
```

The effects chain processes audio through multiple stages, with each effect implemented as WebAudio nodes that can be dynamically connected and controlled in real-time.

**Sources:** [docs/js/sf2.synth.min.js L58-L80](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L58-L80)

 [docs/js/piano-pads.js L9-L21](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L9-L21)

 [docs/css/synth.css L1-L83](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/synth.css#L1-L83)

## Music Notation System

OrinAyo supports both ABC notation and ChordPro format for displaying and playing musical scores, integrated with the XMPP communication system for collaborative music sharing.

### Notation Processing Pipeline

```mermaid
flowchart TD

ABCNotation["ABC Notation<br>(X: header format)"]
ChordPro["ChordPro Format<br>({title:} {key:} format)"]
isAbc["isAbc(text)<br>text.startsWith('X:')"]
isChordPro["isChordPro(text)<br>startsWith('{comment:') || startsWith('{title:')"]
isMusic["isMusic(text)"]
ABCJS["ABCJS.renderAbc(elementId, text)"]
ChordSheetJS["ChordSheetJS.HtmlTableFormatter"]
chordproParser["chordproParser.parse(text)"]
handlePlayMusicAction["handlePlayMusicAction(el)"]
ABCJSSynth["ABCJS.synth.CreateSynth()"]
playChordPro["playChordPro(chordpro)"]
sequenceCallback["sequenceCallback(tracks)"]
ConversePlugin["converse.js Plugin"]
MessageTransform["afterMessageBodyTransformed"]
ActionButtons["getMessageActionButtons"]

ABCNotation --> isAbc
ChordPro --> isChordPro
isMusic --> ABCJS
isMusic --> ChordSheetJS
isMusic --> handlePlayMusicAction
MessageTransform --> isMusic
ActionButtons --> handlePlayMusicAction

subgraph subGraph4 ["XMPP Integration"]
    ConversePlugin
    MessageTransform
    ActionButtons
    ConversePlugin --> MessageTransform
    ConversePlugin --> ActionButtons
end

subgraph subGraph3 ["Playback System"]
    handlePlayMusicAction
    ABCJSSynth
    playChordPro
    sequenceCallback
    handlePlayMusicAction --> ABCJSSynth
    handlePlayMusicAction --> playChordPro
    ABCJSSynth --> sequenceCallback
end

subgraph subGraph2 ["Rendering System"]
    ABCJS
    ChordSheetJS
    chordproParser
    ChordSheetJS --> chordproParser
end

subgraph subGraph1 ["Format Detection"]
    isAbc
    isChordPro
    isMusic
    isAbc --> isMusic
    isChordPro --> isMusic
end

subgraph subGraph0 ["Input Formats"]
    ABCNotation
    ChordPro
end
```

The notation system automatically detects music formats in chat messages, renders them as interactive musical scores, and provides playback capabilities through the audio synthesis engine.

**Sources:** [docs/packages/notation/notation.js L42-L52](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L42-L52)

 [docs/packages/notation/notation.js L54-L97](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L54-L97)

 [docs/packages/notation/notation.js L108-L132](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L108-L132)

 [docs/packages/notation/abcjs.js L74-L88](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/abcjs.js#L74-L88)

## System Integration

The audio systems integrate with OrinAyo's core architecture through event-driven communication and shared WebAudio context management.

### Audio System Data Flow

```mermaid
flowchart TD

Controllers["MIDI Controllers<br>Guitar Heroes, BLE devices"]
FileLoader["Style File Loader<br>.sff, .kst, .ac7"]
UserInput["User Interface<br>Virtual keyboards, buttons"]
MidiParser["midi-parser.js<br>parseMidi()"]
BLEMidi["midi.ble.js<br>bleMIDIrx()"]
AudioLooper["audio_looper.js<br>Main coordination"]
SF2Synth["sf2synth.min.js<br>SoundFont synthesis"]
SmplrInstruments["piano-pads.js<br>Premium instruments"]
NotationPlayback["notation.js<br>ABC/ChordPro playback"]
WebAudioAPI["WebAudio API<br>Browser audio output"]
MIDIOutput["Web MIDI API<br>External hardware"]
RecordingSystem["Recording system<br>OGG/MP4 files"]

Controllers --> MidiParser
Controllers --> BLEMidi
FileLoader --> MidiParser
UserInput --> AudioLooper
AudioLooper --> SF2Synth
AudioLooper --> SmplrInstruments
AudioLooper --> NotationPlayback
SF2Synth --> WebAudioAPI
SmplrInstruments --> WebAudioAPI
NotationPlayback --> WebAudioAPI
SF2Synth --> MIDIOutput

subgraph subGraph3 ["Output Layer"]
    WebAudioAPI
    MIDIOutput
    RecordingSystem
    WebAudioAPI --> RecordingSystem
end

subgraph subGraph2 ["Synthesis Layer"]
    SF2Synth
    SmplrInstruments
    NotationPlayback
end

subgraph subGraph1 ["Processing Layer"]
    MidiParser
    BLEMidi
    AudioLooper
    MidiParser --> AudioLooper
    BLEMidi --> AudioLooper
end

subgraph subGraph0 ["Input Layer"]
    Controllers
    FileLoader
    UserInput
end
```

The audio systems operate through a shared WebAudio context with centralized routing through the AudioLooper engine, enabling synchronized playback, recording, and external hardware integration.

**Sources:** [docs/js/midi-parser.js L1-L10](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L1-L10)

 [docs/js/sf2.synth.min.js L412-L449](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/sf2.synth.min.js#L412-L449)

 [docs/js/piano-pads.js L6-L25](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/piano-pads.js#L6-L25)

 [docs/js/midi.ble.js L1-L15](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L1-L15)