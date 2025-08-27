# MIDI Processing

> **Relevant source files**
> * [docs/assets/gmgsx.sf2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gmgsx.sf2)
> * [docs/css/synth.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/synth.css)
> * [docs/js/midi-parser.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js)
> * [docs/js/midi.ble.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js)
> * [docs/packages/notation/abcjs.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/abcjs.js)
> * [docs/packages/notation/notation.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js)
> * [orinayo.exe](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/orinayo.exe)

This document covers OrinAyo's MIDI processing capabilities, including file parsing, BLE MIDI integration, and music notation rendering systems. For information about sound synthesis and audio output, see [Sound Synthesis](/Jus-Be/orinayo/4.2-sound-synthesis). For details about audio effects processing, see [Audio Effects (Pedalboard)](/Jus-Be/orinayo/4.3-audio-effects-(pedalboard)).

## Overview

OrinAyo's MIDI processing system handles multiple aspects of MIDI data flow:

* **MIDI File Parsing**: Support for various MIDI and style file formats (.mid, .kst, .sff, .sas, .ac7)
* **BLE MIDI Communication**: Real-time MIDI over Bluetooth Low Energy
* **Music Notation Rendering**: ABC notation and ChordPro format display and playback
* **MIDI Event Processing**: Real-time MIDI message handling and transformation

## MIDI File Parser Architecture

The core MIDI parsing system supports multiple file formats through a unified interface:

```mermaid
flowchart TD

parseMidi["parseMidi()"]
headerChunk["Header Chunk Reader"]
parseSmf["parseSmf()"]
parseSas["parseSas()"]
parseAc7["parseAc7()"]
parseData["parseData()"]
Parser["Parser Class"]
readEvent["readEvent()"]
readChunk["readChunk()"]
parseCasm["parseCasm()"]
midFile[".mid files"]
kstFile[".kst files"]
sasFile[".sas files"]
ac7File[".ac7 files"]
sffFile[".sff files"]

headerChunk --> parseSmf
headerChunk --> parseSas
headerChunk --> parseAc7
headerChunk --> parseData
parseSmf --> Parser
parseSas --> Parser
parseAc7 --> Parser
parseData --> Parser
midFile --> parseSmf
sasFile --> parseSas
ac7File --> parseAc7
kstFile --> parseData
sffFile --> parseData

subgraph subGraph3 ["File Format Support"]
    midFile
    kstFile
    sasFile
    ac7File
    sffFile
end

subgraph subGraph2 ["Low-Level Parsing"]
    Parser
    readEvent
    readChunk
    parseCasm
    Parser --> readEvent
    Parser --> readChunk
    Parser --> parseCasm
end

subgraph subGraph1 ["Format-Specific Parsers"]
    parseSmf
    parseSas
    parseAc7
    parseData
end

subgraph subGraph0 ["MIDI Parser Entry Points"]
    parseMidi
    headerChunk
    parseMidi --> headerChunk
end
```

**Sources**: [docs/js/midi-parser.js L4-L53](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L4-L53)

 [docs/js/midi-parser.js L55-L122](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L55-L122)

### Format Detection and Routing

The main `parseMidi` function determines file format through header inspection:

| File Format | Header ID | Parser Function | Description |
| --- | --- | --- | --- |
| Standard MIDI | `MThd` | `parseSmf()` | Standard MIDI files |
| Ketron Style | `MThd` + `.kst` | `parseData()` | Ketron style files |
| SAS Style | `MThd` + `.sas` | `parseSas()` | SAS arranger files |
| AC7 Style | `AC07` | `parseAc7()` | Casio AC7 format |
| SFF Style | `MThd` + CASM | `parseData()` | Yamaha SFF format |

**Sources**: [docs/js/midi-parser.js L10-L53](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L10-L53)

### Event Processing System

MIDI events are processed through a hierarchical system:

```mermaid
flowchart TD

readEvent["readEvent()"]
deltaTime["Delta Time Reading"]
eventType["Event Type Detection"]
metaEvents["Meta Events"]
sysexEvents["SysEx Events"]
channelEvents["Channel Events"]
systemEvents["System Events"]
noteOn["Note On/Off"]
controller["Controller Change"]
programChange["Program Change"]
pitchBend["Pitch Bend"]
marker["Marker Events"]
tempo["Tempo Changes"]
timeSignature["Time Signature"]
keySignature["Key Signature"]
lyrics["Lyrics/Text"]

eventType --> metaEvents
eventType --> sysexEvents
eventType --> channelEvents
eventType --> systemEvents
channelEvents --> noteOn
channelEvents --> controller
channelEvents --> programChange
channelEvents --> pitchBend
metaEvents --> marker
metaEvents --> tempo
metaEvents --> timeSignature
metaEvents --> keySignature
metaEvents --> lyrics

subgraph subGraph3 ["Meta Event Types"]
    marker
    tempo
    timeSignature
    keySignature
    lyrics
end

subgraph subGraph2 ["Channel Event Types"]
    noteOn
    controller
    programChange
    pitchBend
end

subgraph subGraph1 ["Event Categories"]
    metaEvents
    sysexEvents
    channelEvents
    systemEvents
end

subgraph subGraph0 ["Event Reading"]
    readEvent
    deltaTime
    eventType
    readEvent --> deltaTime
    readEvent --> eventType
end
```

**Sources**: [docs/js/midi-parser.js L585-L776](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L585-L776)

## BLE MIDI Integration

The BLE MIDI system provides real-time MIDI communication over Bluetooth:

```mermaid
flowchart TD

bleMIDIrx["bleMIDIrx()"]
parseMidiByte["parseMidiByte()"]
convertTimestamp["convertTimestamp()"]
handleChordaMidiMessage["handleChordaMidiMessage()"]
translateChordaToI1["translateChordaToI1()"]
runningStatus["Running Status Handler"]
noteOnOff["Note On/Off"]
controlChange["Control Change"]
programChange["Program Change"]
pitchBend["Pitch Bend"]
systemRealtime["System Realtime"]
chordaDevice["Chorda Device"]
handleNoteOn["handleNoteOn()"]
handleNoteOff["handleNoteOff()"]

parseMidiByte --> handleChordaMidiMessage
parseMidiByte --> runningStatus
handleChordaMidiMessage --> noteOnOff
handleChordaMidiMessage --> controlChange
handleChordaMidiMessage --> programChange
handleChordaMidiMessage --> pitchBend
translateChordaToI1 --> handleNoteOn
translateChordaToI1 --> handleNoteOff
chordaDevice --> translateChordaToI1

subgraph subGraph3 ["Device Integration"]
    chordaDevice
    handleNoteOn
    handleNoteOff
end

subgraph subGraph2 ["Message Types"]
    noteOnOff
    controlChange
    programChange
    pitchBend
    systemRealtime
end

subgraph subGraph1 ["MIDI Message Processing"]
    handleChordaMidiMessage
    translateChordaToI1
    runningStatus
    handleChordaMidiMessage --> translateChordaToI1
end

subgraph subGraph0 ["BLE MIDI Reception"]
    bleMIDIrx
    parseMidiByte
    convertTimestamp
    bleMIDIrx --> parseMidiByte
    bleMIDIrx --> convertTimestamp
end
```

**Sources**: [docs/js/midi.ble.js L12-L89](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L12-L89)

 [docs/js/midi.ble.js L122-L171](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L122-L171)

 [docs/js/midi.ble.js L224-L264](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L224-L264)

### BLE MIDI Packet Structure

BLE MIDI packets are processed with timestamp handling:

| Component | Function | Description |
| --- | --- | --- |
| Timestamp | `convertTimestamp()` | Converts BLE timestamps to local time |
| Running Status | `runningStatus` variable | Maintains MIDI running status |
| Third Byte Flag | `thirdByteFlag` variable | Tracks multi-byte message state |
| Message Parser | `parseMidiByte()` | Parses individual MIDI bytes |

**Sources**: [docs/js/midi.ble.js L1-L11](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L1-L11)

 [docs/js/midi.ble.js L92-L119](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L92-L119)

## Music Notation System

OrinAyo supports multiple music notation formats for collaborative music sharing:

```mermaid
flowchart TD

abcNotation["ABC Notation"]
chordPro["ChordPro Format"]
renderNotation["renderNotation()"]
isAbc["isAbc()"]
isChordPro["isChordPro()"]
abcjs["ABCJS Library"]
chordSheetJS["ChordSheetJS"]
htmlFormatter["HtmlTableFormatter"]
handlePlayMusicAction["handlePlayMusicAction()"]
midiBuffer["ABCJS Synth Buffer"]
playChordPro["playChordPro()"]
sequenceCallback["sequenceCallback()"]
conversePlugin["Converse.js Plugin"]
messageButtons["Message Action Buttons"]
playButton["Play Button"]

abcNotation --> isAbc
chordPro --> isChordPro
renderNotation --> abcjs
renderNotation --> chordSheetJS
playButton --> handlePlayMusicAction

subgraph subGraph4 ["Chat Integration"]
    conversePlugin
    messageButtons
    playButton
    conversePlugin --> messageButtons
    messageButtons --> playButton
end

subgraph subGraph3 ["Playback System"]
    handlePlayMusicAction
    midiBuffer
    playChordPro
    sequenceCallback
    handlePlayMusicAction --> midiBuffer
    handlePlayMusicAction --> playChordPro
    handlePlayMusicAction --> sequenceCallback
end

subgraph subGraph2 ["Display Libraries"]
    abcjs
    chordSheetJS
    htmlFormatter
    chordSheetJS --> htmlFormatter
end

subgraph subGraph1 ["Rendering Engine"]
    renderNotation
    isAbc
    isChordPro
    isAbc --> renderNotation
    isChordPro --> renderNotation
end

subgraph subGraph0 ["Notation Formats"]
    abcNotation
    chordPro
end
```

**Sources**: [docs/packages/notation/notation.js L10-L40](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L10-L40)

 [docs/packages/notation/notation.js L108-L133](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L108-L133)

### Notation Format Detection

The system automatically detects notation formats through content analysis:

| Format | Detection Pattern | Rendering Library | Playback Support |
| --- | --- | --- | --- |
| ABC | Starts with `X:` | ABCJS | Yes (ABCJS Synth) |
| ChordPro | Starts with `{comment:` or `{title:` | ChordSheetJS | Yes (Custom engine) |

**Sources**: [docs/packages/notation/notation.js L42-L52](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L42-L52)

### ABC Notation Processing

ABC notation files are processed through the ABCJS library with enhanced playback capabilities:

```mermaid
flowchart TD

abcText["ABC Text Input"]
visualObj["ABCJS Visual Object"]
synthBuffer["ABCJS Synth Buffer"]
audioPlayback["Audio Playback"]
init["midiBuffer.init()"]
prime["midiBuffer.prime()"]
sequenceCallback["sequenceCallback()"]
onEnded["onEnded()"]

synthBuffer --> init
sequenceCallback --> audioPlayback
audioPlayback --> onEnded

subgraph subGraph1 ["Playback Controls"]
    init
    prime
    sequenceCallback
    onEnded
    init --> prime
    prime --> sequenceCallback
end

subgraph subGraph0 ["ABC Processing Pipeline"]
    abcText
    visualObj
    synthBuffer
    audioPlayback
    abcText --> visualObj
    visualObj --> synthBuffer
end
```

**Sources**: [docs/packages/notation/notation.js L75-L96](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/notation/notation.js#L75-L96)

## MIDI Data Structures

The parser generates structured event data compatible with OrinAyo's audio engine:

### Event Object Schema

```yaml
{
  deltaTime: number,          // Time since last event
  type: string,              // Event type (noteOn, noteOff, etc.)
  channel: number,           // MIDI channel (0-15)
  noteNumber?: number,       // Note number for note events
  velocity?: number,         // Note velocity
  controllerType?: number,   // Controller number for CC events
  value?: number,           // Controller/parameter value
  programNumber?: number,    // Program number for PC events
  text?: string,            // Text for meta events
  microsecondsPerBeat?: number // Tempo information
}
```

**Sources**: [docs/js/midi-parser.js L585-L776](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L585-L776)

### Style File Organization

Style files are organized into musical sections:

| Section Type | Description | Usage |
| --- | --- | --- |
| `SInt` | Setup/Initialization | Initial settings |
| `Main A-D` | Main accompaniment variations | Primary backing patterns |
| `Intro A-C` | Introduction patterns | Song openings |
| `Ending A-C` | Ending patterns | Song conclusions |
| `Fill In AA-DD` | Fill patterns | Transitional elements |

**Sources**: [docs/js/midi-parser.js L128-L201](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L128-L201)

 [docs/js/midi-parser.js L517-L583](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L517-L583)

## Integration with Audio Engine

The MIDI processing system integrates with OrinAyo's broader audio architecture:

```mermaid
flowchart TD

midiFiles["MIDI Files"]
bleMidi["BLE MIDI"]
notation["Music Notation"]
midiParser["MIDI Parser"]
eventProcessor["Event Processor"]
channelMapping["Channel Mapping"]
audioLooper["AudioLooper"]
synthEngine["SF2 Synthesizer"]
pedalboard["Guitar Effects"]
speakers["Internal Audio"]
midiOut["MIDI Output"]
webrtc["WebRTC Stream"]

midiFiles --> midiParser
bleMidi --> eventProcessor
notation --> midiParser
channelMapping --> audioLooper
channelMapping --> synthEngine
channelMapping --> pedalboard
audioLooper --> speakers
synthEngine --> speakers
pedalboard --> speakers
channelMapping --> midiOut

subgraph subGraph3 ["Output Destinations"]
    speakers
    midiOut
    webrtc
    speakers --> webrtc
end

subgraph subGraph2 ["Audio Engine Integration"]
    audioLooper
    synthEngine
    pedalboard
end

subgraph subGraph1 ["MIDI Processing Core"]
    midiParser
    eventProcessor
    channelMapping
    midiParser --> channelMapping
    eventProcessor --> channelMapping
end

subgraph subGraph0 ["MIDI Input Sources"]
    midiFiles
    bleMidi
    notation
end
```

**Sources**: [docs/js/midi-parser.js L1-L939](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi-parser.js#L1-L939)

 [docs/js/midi.ble.js L1-L318](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/midi.ble.js#L1-L318)