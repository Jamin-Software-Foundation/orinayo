# Application Engine

> **Relevant source files**
> * [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)
> * [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)
> * [docs/js/audio_looper.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js)
> * [docs/js/background.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js)
> * [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)
> * [docs/js/styles.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/styles.js)
> * [docs/manifest.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json)
> * [docs/settings/options.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/settings/options.js)

The Application Engine serves as the central orchestration layer for OrinAyo, coordinating all major subsystems including input device handling, audio processing, user interface management, and external integrations. It is primarily implemented in [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)

 and acts as the main controller that binds together input devices, audio generation systems, communication features, and platform-specific functionality.

For information about specific audio processing capabilities, see [Audio Processing Pipeline](/Jus-Be/orinayo/3.2-audio-processing-pipeline). For UI component details, see [UI Components](/Jus-Be/orinayo/3.3-ui-components). For MIDI-specific functionality, see [MIDI Processing](/Jus-Be/orinayo/4.1-midi-processing).

## Core Architecture Overview

The Application Engine follows a centralized event-driven architecture where [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)

 serves as the main coordinator. It manages global application state through numerous variables and coordinates between subsystems through direct function calls and event handlers.

**Application Engine Architecture**

```mermaid
flowchart TD

ENGINE["index.js<br>Main Engine"]
EVENTS["Event Handlers<br>messageHandler, resizeHandler"]
STATE["Global State<br>Variables & Configuration"]
LIFECYCLE["Application Lifecycle<br>onloadHandler, onunloadHandler"]
GAMEPAD["Gamepad Handler<br>updateGamePads()"]
BLUETOOTH["Bluetooth Devices<br>onLavaGenieClick(), onLiberLiveClick()"]
MIDI_IN["MIDI Input<br>setupMidiIn()"]
KEYBOARD["Keyboard Events<br>keydown, keyup handlers"]
AUDIO_LOOPER["AudioLooper Instances<br>bassLoop, chordLoop, drumLoop"]
SYNTH_COORD["Synthesizer Coordination<br>midiSynth, arrSynth"]
EFFECTS["Effects Processing<br>pedalOutput integration"]
RECORDING["Recording Management<br>startRecording(), stopRecording()"]
XMPP_INT["XMPP Integration<br>_converse connection"]
STREAMING["WebRTC Streaming<br>publishConnection, watchConnection"]
STORAGE["Persistent Storage<br>idbKeyval operations"]

EVENTS --> GAMEPAD
EVENTS --> BLUETOOTH
EVENTS --> MIDI_IN
EVENTS --> KEYBOARD
ENGINE --> AUDIO_LOOPER
ENGINE --> SYNTH_COORD
ENGINE --> EFFECTS
ENGINE --> RECORDING
ENGINE --> XMPP_INT
ENGINE --> STREAMING
ENGINE --> STORAGE

subgraph subGraph3 ["External Integrations"]
    XMPP_INT
    STREAMING
    STORAGE
end

subgraph subGraph2 ["Audio System Coordination"]
    AUDIO_LOOPER
    SYNTH_COORD
    EFFECTS
    RECORDING
end

subgraph subGraph1 ["Input Device Integration"]
    GAMEPAD
    BLUETOOTH
    MIDI_IN
    KEYBOARD
end

subgraph subGraph0 ["Application Engine Core"]
    ENGINE
    EVENTS
    STATE
    LIFECYCLE
    ENGINE --> EVENTS
    ENGINE --> STATE
    ENGINE --> LIFECYCLE
end
```

Sources: [docs/js/index.js L1-L400](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1-L400)

 [docs/js/index.js L339-L343](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L343)

 [docs/js/audio_looper.js L1-L50](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L1-L50)

## Event Handling System

The Application Engine implements a comprehensive event handling system that processes inputs from multiple sources and routes them to appropriate subsystems. The main event loop is driven by both browser events and custom application events.

**Event Processing Flow**

```mermaid
flowchart TD

WINDOW_LOAD["window.load<br>onloadHandler()"]
WINDOW_RESIZE["window.resize<br>resizeHandler()"]
WINDOW_MESSAGE["window.message<br>messageHandler()"]
GAMEPAD_EVENTS["Gamepad API<br>navigator.getGamepads()"]
MIDI_EVENTS["MIDI Events<br>WebMIDI.js integration"]
BLUETOOTH_EVENTS["Bluetooth Events<br>characteristicvaluechanged"]
KEYBOARD_EVENTS["Keyboard Events<br>keydown, keyup"]
UPDATE_GAMEPAD["updateGamePads()<br>Processes controller input"]
DO_CHORD["doChord()<br>Handles chord triggers"]
UPDATE_CANVAS["updateCanvas()<br>Updates visual display"]
TOGGLE_START_STOP["toggleStartStop()<br>Controls playback"]
PAD_STATE["pad.buttons[], pad.axis[]<br>Controller state"]
CHORD_STATE["activeChord, forwardChord<br>Musical state"]
UI_STATE["orinayo_*, UI element updates"]

WINDOW_LOAD --> UPDATE_GAMEPAD
GAMEPAD_EVENTS --> UPDATE_GAMEPAD
MIDI_EVENTS --> DO_CHORD
BLUETOOTH_EVENTS --> DO_CHORD
KEYBOARD_EVENTS --> DO_CHORD
UPDATE_GAMEPAD --> PAD_STATE
DO_CHORD --> CHORD_STATE
UPDATE_CANVAS --> UI_STATE
PAD_STATE --> UPDATE_CANVAS
CHORD_STATE --> TOGGLE_START_STOP

subgraph subGraph3 ["State Updates"]
    PAD_STATE
    CHORD_STATE
    UI_STATE
end

subgraph subGraph2 ["Event Processing"]
    UPDATE_GAMEPAD
    DO_CHORD
    UPDATE_CANVAS
    TOGGLE_START_STOP
end

subgraph subGraph1 ["Device Events"]
    MIDI_EVENTS
    BLUETOOTH_EVENTS
    KEYBOARD_EVENTS
end

subgraph subGraph0 ["Browser Events"]
    WINDOW_LOAD
    WINDOW_RESIZE
    WINDOW_MESSAGE
    GAMEPAD_EVENTS
end
```

Sources: [docs/js/index.js L339-L387](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L387)

 [docs/js/index.js L1700-L1850](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1700-L1850)

 [docs/js/index.js L2100-L2200](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L2100-L2200)

## Device Integration Management

The Application Engine manages integration with various input devices through a unified interface that abstracts device-specific protocols while maintaining device-specific functionality where needed.

| Device Type | Integration Method | Key Functions | State Variables |
| --- | --- | --- | --- |
| Guitar Controllers | Gamepad API | `updateGamePads()`, `resetGuitarHero()` | `pad.buttons[]`, `pad.axis[]` |
| Bluetooth Guitars | Web Bluetooth API | `onLavaGenieClick()`, `onLiberLiveClick()` | `bluetoothGuitar`, `writeCharacteristic` |
| MIDI Devices | WebMIDI API | `setupMidiIn()`, `setupMidiOut()` | `midiOutput`, `input` |
| Numeric Keypads | Keyboard Events | `keydown`/`keyup` handlers | `keyboard` Map |
| Stream Deck | WebHID API | `streamDeck` integration | `streamDeckPointer` |

**Device State Coordination**

```mermaid
flowchart TD

GUITAR_CTRL["Guitar Controllers<br>pad.buttons, pad.axis"]
BT_GUITAR["Bluetooth Guitars<br>bluetoothGuitar"]
MIDI_DEV["MIDI Devices<br>input, midiOutput"]
KEYPAD["Keypads<br>keyboard Map"]
INPUT_PROC["Input Processing<br>updateGamePads()"]
CHORD_PROC["Chord Processing<br>doChord()"]
NOTE_PROC["Note Processing<br>MIDI event handlers"]
MUSICAL_STATE["Musical State<br>activeChord, fretButton"]
UI_STATE["UI State<br>orinayo_control, orinayo_pad"]
AUDIO_STATE["Audio State<br>styleStarted, tempo"]

GUITAR_CTRL --> INPUT_PROC
BT_GUITAR --> CHORD_PROC
MIDI_DEV --> NOTE_PROC
KEYPAD --> NOTE_PROC
INPUT_PROC --> MUSICAL_STATE
CHORD_PROC --> MUSICAL_STATE
NOTE_PROC --> MUSICAL_STATE

subgraph subGraph2 ["Unified State"]
    MUSICAL_STATE
    UI_STATE
    AUDIO_STATE
    MUSICAL_STATE --> UI_STATE
    MUSICAL_STATE --> AUDIO_STATE
end

subgraph subGraph1 ["State Normalization"]
    INPUT_PROC
    CHORD_PROC
    NOTE_PROC
end

subgraph subGraph0 ["Device Inputs"]
    GUITAR_CTRL
    BT_GUITAR
    MIDI_DEV
    KEYPAD
end
```

Sources: [docs/js/index.js L465-L525](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L465-L525)

 [docs/js/index.js L600-L950](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L600-L950)

 [docs/js/index.js L1400-L1600](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1400-L1600)

## Audio System Coordination

The Application Engine coordinates multiple audio subsystems through direct integration with AudioLooper instances and synthesizer components. It manages the lifecycle and synchronization of all audio-generating components.

**Audio Subsystem Integration**

```mermaid
flowchart TD

PEDAL_OUTPUT["pedalOutput<br>Guitar effects chain"]
RECORD_GAIN["recordGain<br>Recording gain stage"]
STREAM_DEST["streamDestination<br>Streaming output"]
ENGINE_AUDIO["index.js Audio Control<br>Audio system coordination"]
TEMPO_CTRL["Tempo Control<br>setTempo(), tempo variable"]
VOLUME_CTRL["Volume Control<br>bassVol, chordVol, drumVol"]
BASS_LOOP["bassLoop<br>AudioLooper('bass')"]
CHORD_LOOP["chordLoop<br>AudioLooper('chord')"]
DRUM_LOOP["drumLoop<br>AudioLooper('drum')"]
RIFF_LOOP["riffLoop<br>AudioLooper('riff')"]
MIDI_SYNTH["midiSynth<br>SF2 Synthesizer"]
ARR_SYNTH["arrSynth<br>Arranger Synthesizer"]
KEYS_PLAYER["keysPlayer<br>WebAudioFontPlayer"]

TEMPO_CTRL --> BASS_LOOP
TEMPO_CTRL --> CHORD_LOOP
TEMPO_CTRL --> DRUM_LOOP
TEMPO_CTRL --> RIFF_LOOP
VOLUME_CTRL --> BASS_LOOP
VOLUME_CTRL --> CHORD_LOOP
VOLUME_CTRL --> DRUM_LOOP
ENGINE_AUDIO --> MIDI_SYNTH
ENGINE_AUDIO --> ARR_SYNTH
ENGINE_AUDIO --> KEYS_PLAYER

subgraph subGraph2 ["Synthesis Systems"]
    MIDI_SYNTH
    ARR_SYNTH
    KEYS_PLAYER
end

subgraph subGraph1 ["AudioLooper Instances"]
    BASS_LOOP
    CHORD_LOOP
    DRUM_LOOP
    RIFF_LOOP
end

subgraph subGraph0 ["Audio Coordination Layer"]
    ENGINE_AUDIO
    TEMPO_CTRL
    VOLUME_CTRL
    ENGINE_AUDIO --> TEMPO_CTRL
    ENGINE_AUDIO --> VOLUME_CTRL
end

subgraph subGraph3 ["Effects Processing"]
    PEDAL_OUTPUT
    RECORD_GAIN
    STREAM_DEST
    PEDAL_OUTPUT --> RECORD_GAIN
    RECORD_GAIN --> STREAM_DEST
end
```

Sources: [docs/js/index.js L137-L144](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L137-L144)

 [docs/js/index.js L197-L230](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L197-L230)

 [docs/js/index.js L553-L598](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L553-L598)

 [docs/js/audio_looper.js L1-L50](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L1-L50)

## State Management Architecture

The Application Engine maintains application state through a collection of global variables and provides coordination between different subsystems. State is managed both in memory and through persistent storage mechanisms.

| State Category | Key Variables | Purpose |
| --- | --- | --- |
| Musical State | `activeChord`, `forwardChord`, `keyChange`, `tempo` | Current musical context |
| Device State | `guitarAvailable`, `bluetoothGuitar`, `midiOutput` | Connected devices |
| UI State | `orinayo`, `orinayo_section`, `orinayo_pad` | Display elements |
| Audio State | `styleStarted`, `bassVol`, `chordVol`, `drumVol` | Audio system status |
| Session State | `registration`, `songSequence`, `arrSequence` | User session data |

**State Management Flow**

```mermaid
flowchart TD

USER_INPUT["User Input<br>Device interactions"]
CONFIG_LOAD["Configuration<br>idbKeyval.get()"]
EXTERNAL_MSG["External Messages<br>messageHandler()"]
STATE_UPDATE["State Update Functions<br>setTempo(), dokeyChange()"]
VALIDATION["State Validation<br>Bounds checking"]
PERSISTENCE["State Persistence<br>idbKeyval.set()"]
MEMORY_STATE["In-Memory State<br>Global variables"]
INDEXED_DB["IndexedDB Storage<br>Persistent state"]
LOCAL_STORAGE["LocalStorage<br>Configuration"]
AUDIO_SYSTEMS["Audio Systems<br>AudioLooper, Synthesizers"]
UI_SYSTEMS["UI Systems<br>Display updates"]
EXTERNAL_SYSTEMS["External Systems<br>MIDI out, Streaming"]

USER_INPUT --> STATE_UPDATE
CONFIG_LOAD --> MEMORY_STATE
EXTERNAL_MSG --> STATE_UPDATE
VALIDATION --> MEMORY_STATE
MEMORY_STATE --> PERSISTENCE
PERSISTENCE --> INDEXED_DB
MEMORY_STATE --> AUDIO_SYSTEMS
MEMORY_STATE --> UI_SYSTEMS
MEMORY_STATE --> EXTERNAL_SYSTEMS

subgraph subGraph3 ["State Consumers"]
    AUDIO_SYSTEMS
    UI_SYSTEMS
    EXTERNAL_SYSTEMS
end

subgraph subGraph2 ["State Storage"]
    MEMORY_STATE
    INDEXED_DB
    LOCAL_STORAGE
end

subgraph subGraph1 ["State Processing"]
    STATE_UPDATE
    VALIDATION
    PERSISTENCE
    STATE_UPDATE --> VALIDATION
end

subgraph subGraph0 ["State Sources"]
    USER_INPUT
    CONFIG_LOAD
    EXTERNAL_MSG
end
```

Sources: [docs/js/index.js L37-L230](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L37-L230)

 [docs/js/index.js L260-L334](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L260-L334)

 [docs/js/index.js L2800-L3000](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L2800-L3000)

## Application Lifecycle Management

The Application Engine manages the complete application lifecycle from initialization through cleanup, coordinating the startup and shutdown of all subsystems in the correct order.

**Initialization Sequence**

```mermaid
flowchart TD

WINDOW_LOAD["window.addEventListener('load')<br>onloadHandler()"]
DETECT_PLATFORM["Platform Detection<br>mobileCheck(), chrome extension"]
SETUP_AUDIO["Audio Setup<br>audioContext creation"]
INIT_DEVICES["Device Initialization<br>MIDI, Bluetooth setup"]
LOAD_CONFIG["Load Configuration<br>idbKeyval.get()"]
SETUP_UI["UI Setup<br>Mobile/desktop layout"]
INIT_LOOPERS["Initialize AudioLoopers<br>bassLoop, chordLoop, drumLoop"]
SETUP_SYNTHS["Setup Synthesizers<br>midiSynth, arrSynth"]
EVENT_LOOP["Event Loop<br>Device polling, UI updates"]
STATE_SYNC["State Synchronization<br>Cross-system coordination"]
ERROR_HANDLING["Error Handling<br>Device disconnection, audio issues"]
WINDOW_UNLOAD["window.addEventListener('unload')<br>onunloadHandler()"]
CLEANUP_AUDIO["Audio Cleanup<br>Stop all sources"]
SAVE_STATE["Save State<br>Persistent storage"]
DISCONNECT_DEVICES["Disconnect Devices<br>Bluetooth, MIDI cleanup"]

INIT_DEVICES --> LOAD_CONFIG
SETUP_SYNTHS --> EVENT_LOOP
ERROR_HANDLING --> WINDOW_UNLOAD

subgraph subGraph3 ["Cleanup Phase"]
    WINDOW_UNLOAD
    CLEANUP_AUDIO
    SAVE_STATE
    DISCONNECT_DEVICES
    WINDOW_UNLOAD --> CLEANUP_AUDIO
    CLEANUP_AUDIO --> SAVE_STATE
    SAVE_STATE --> DISCONNECT_DEVICES
end

subgraph subGraph2 ["Runtime Phase"]
    EVENT_LOOP
    STATE_SYNC
    ERROR_HANDLING
    EVENT_LOOP --> STATE_SYNC
    STATE_SYNC --> ERROR_HANDLING
end

subgraph subGraph1 ["Configuration Phase"]
    LOAD_CONFIG
    SETUP_UI
    INIT_LOOPERS
    SETUP_SYNTHS
    LOAD_CONFIG --> SETUP_UI
    SETUP_UI --> INIT_LOOPERS
    INIT_LOOPERS --> SETUP_SYNTHS
end

subgraph subGraph0 ["Startup Phase"]
    WINDOW_LOAD
    DETECT_PLATFORM
    SETUP_AUDIO
    INIT_DEVICES
    WINDOW_LOAD --> DETECT_PLATFORM
    DETECT_PLATFORM --> SETUP_AUDIO
    SETUP_AUDIO --> INIT_DEVICES
end
```

Sources: [docs/js/index.js L339-L343](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L343)

 [docs/js/index.js L3500-L4000](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L3500-L4000)

 [docs/js/index.js L4500-L4600](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L4500-L4600)

## Integration Points

The Application Engine provides well-defined integration points for external systems and plugins, enabling extensibility while maintaining system cohesion.

| Integration Type | Interface | Examples |
| --- | --- | --- |
| Audio Effects | `pedalOutput` connection | Guitar pedalboard integration |
| Communication | `_converse` XMPP client | Chat, collaboration features |
| Streaming | WebRTC connections | Live performance streaming |
| Storage | `idbKeyval` interface | Configuration persistence |
| External Hardware | MIDI output | Arranger keyboards, loopers |

The engine's modular design allows for runtime configuration of these integration points while maintaining backward compatibility and system stability.

Sources: [docs/js/index.js L78-L95](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L78-L95)

 [docs/js/index.js L1127-L1200](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1127-L1200)

 [docs/js/index.js L2000-L2100](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L2000-L2100)