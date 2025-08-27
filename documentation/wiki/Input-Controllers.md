# Input Controllers

> **Relevant source files**
> * [README.md](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/README.md)
> * [USER-GUIDE.md](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/USER-GUIDE.md)
> * [docs/assets/screenshots/num-pad.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/num-pad.png)
> * [docs/assets/screenshots/numpad-guide.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/numpad-guide.png)
> * [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)
> * [docs/css/stackedit.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/stackedit.css)
> * [docs/help.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/help.html)
> * [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)
> * [docs/js/audio_looper.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js)
> * [docs/js/background.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js)
> * [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)
> * [docs/js/styles.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/styles.js)
> * [docs/manifest.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json)
> * [docs/settings/options.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/settings/options.js)
> * [documentation/orinayo_views.pptx](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/documentation/orinayo_views.pptx)

This document covers the input controller subsystem in OrinAyo, which handles various hardware devices used to control chord progressions, style variations, and other musical parameters. For information about audio processing and synthesis, see [Audio Processing Pipeline](/Jus-Be/orinayo/3.2-audio-processing-pipeline). For MIDI-specific processing details, see [MIDI Processing](/Jus-Be/orinayo/4.1-midi-processing).

## Overview

OrinAyo supports multiple categories of input controllers that allow users to perform live music by triggering chords, controlling arranger sections, and manipulating musical parameters. The system processes input from these devices and translates them into musical events within the application.

### Supported Input Controller Types

```mermaid
flowchart TD

GH["Guitar Hero Controllers<br>USB HID Gamepad"]
LL["LiberLive C1<br>Bluetooth MIDI"]
LG["Lava Genie<br>Bluetooth MIDI"]
MK["MIDI Keyboards<br>USB/Bluetooth"]
ART["Artiphon Instrument 1<br>USB MIDI"]
CHR["Chorda<br>USB MIDI"]
CT["ChordTracker Devices<br>MIDI Input"]
NP["Numeric Keypads<br>USB/Wireless"]
KB["Computer Keyboard<br>Numpad Section"]
SD["Stream Deck<br>USB HID"]
XTC["X-Touch Mini<br>USB MIDI"]
CORE["OrinAyo Input Handler"]

GH --> CORE
LL --> CORE
LG --> CORE
MK --> CORE
ART --> CORE
CHR --> CORE
CT --> CORE
NP --> CORE
KB --> CORE
SD --> CORE
XTC --> CORE

subgraph subGraph3 ["Accessory Controllers"]
    SD
    XTC
end

subgraph subGraph2 ["Numeric Input"]
    NP
    KB
end

subgraph subGraph1 ["MIDI Controllers"]
    MK
    ART
    CHR
    CT
end

subgraph subGraph0 ["Guitar-Style Controllers"]
    GH
    LL
    LG
end
```

Sources: [docs/js/index.js L147-L154](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L147-L154)

 [USER-GUIDE.md L89-L97](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/USER-GUIDE.md#L89-L97)

## Guitar Controllers

Guitar controllers use a chord-based input system where combinations of colored fret buttons represent different chord types. The system supports both basic and advanced chord mappings.

### Gamepad Guitar Controllers

Standard USB HID gamepad controllers like Guitar Hero controllers provide the primary interface for chord-based performance.

#### Chord Mapping System

| Chord Type | Green | Red | Yellow | Blue | Orange |
| --- | --- | --- | --- | --- | --- |
| 1 (Tonic) |  |  | X |  |  |
| 2m |  |  |  | X |  |
| 3m | X |  |  | X |  |
| 4 |  |  |  |  | X |
| 5 | X |  |  |  |  |
| 6m |  | X |  |  |  |

```mermaid
flowchart TD

PAD["pad.buttons[]<br>pad.axis[]"]
CHORD["doChord()"]
STRUM["updateCanvas()"]
MIDI["MIDI Channel 4<br>Chord Events"]
TRIGGER["Strum Detection<br>autoStrumUpDown()"]
AUDIO["Audio Looper<br>Style Triggering"]
EXT["External MIDI Out<br>Hardware Arrangers"]

subgraph subGraph0 ["Guitar Controller Input Processing"]
    PAD
    CHORD
    STRUM
    MIDI
    TRIGGER
    AUDIO
    EXT
    PAD --> CHORD
    PAD --> STRUM
    CHORD --> MIDI
    STRUM --> TRIGGER
    TRIGGER --> AUDIO
    MIDI --> EXT
end
```

Sources: [docs/js/index.js L17-L35](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L17-L35)

 [docs/js/index.js L257](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L257-L257)

 [USER-GUIDE.md L104-L135](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/USER-GUIDE.md#L104-L135)

### Bluetooth Guitar Controllers

#### LiberLive C1

The LiberLive C1 connects via Bluetooth and provides both audio output and MIDI control capabilities.

```mermaid
flowchart TD

LLC["LiberLive C1"]
BT["Bluetooth Connection<br>Service UUID"]
SETUP["doLiberLiveSetup()"]
CHAR["Characteristic Handlers<br>Read/Write/Notify"]
MAP["setLiberLiveChordMappings()"]
SETTINGS["setLiberLiveDeviceSettings()"]
EVENTS["Event Processing<br>characteristicvaluechanged"]
CHORD_PROC["Chord Processing<br>pad.buttons[]"]
STYLE["Style Control<br>toggleStartStop()"]

LLC --> BT
BT --> SETUP
SETUP --> CHAR
CHAR --> MAP
CHAR --> SETTINGS
CHAR --> EVENTS
EVENTS --> CHORD_PROC
CHORD_PROC --> STYLE
```

Sources: [docs/js/index.js L465-L492](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L465-L492)

 [docs/js/index.js L635-L679](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L635-L679)

 [docs/js/index.js L1012-L1125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1012-L1125)

#### Lava Genie

The Lava Genie provides similar Bluetooth MIDI functionality with a different communication protocol.

```mermaid
flowchart TD

LG["Lava Genie"]
BT_LG["Bluetooth Connection<br>Service 0000fee0"]
SETUP_LG["doLavaGenieSetup()"]
CHARS["Characteristic Discovery<br>Read/Write/Notify"]
CONFIG["setLavaGenieSettings()"]
HANDLER["Event Handler<br>Button Mapping"]
EVENTS_LG["Control Events<br>202,2,101 / 202,2,92"]
CHORDS["Chord Selection<br>21 Chord Mappings"]
CONTROL["Style Control<br>Start/Stop/Variation"]

LG --> BT_LG
BT_LG --> SETUP_LG
SETUP_LG --> CHARS
CHARS --> CONFIG
CHARS --> HANDLER
HANDLER --> EVENTS_LG
EVENTS_LG --> CHORDS
EVENTS_LG --> CONTROL
```

Sources: [docs/js/index.js L494-L525](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L494-L525)

 [docs/js/index.js L681-L952](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L681-L952)

 [docs/js/index.js L954-L1010](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L954-L1010)

## MIDI Controllers

MIDI controllers provide keyboard-based input and additional control capabilities through standard MIDI protocols.

### MIDI Input Processing

```mermaid
flowchart TD

NOTE["Note On/Off<br>Keyboard Playing"]
INPUT["midiInSel Dropdown<br>Device Selection"]
DEVICE["input Variable<br>Selected MIDI Device"]
PC["Program Change<br>Settings Recall"]
CC["Control Change<br>Parameter Control"]
SYNTH["Internal Synthesizer<br>Piano/Pads Voices"]
RECALL["Settings Slots<br>1-128 Recall"]
PARAM["Parameter Control<br>Volume/Effects"]

subgraph subGraph1 ["MIDI Input System"]
    INPUT
    DEVICE
    SYNTH
    RECALL
    PARAM
    INPUT --> DEVICE
    DEVICE --> NOTE
    DEVICE --> PC
    DEVICE --> CC
    NOTE --> SYNTH
    PC --> RECALL
    CC --> PARAM

subgraph subGraph0 ["Message Types"]
    NOTE
    PC
    CC
end
end
```

Sources: [docs/js/index.js L149-L154](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L149-L154)

 [docs/index.html L164](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L164-L164)

 [USER-GUIDE.md L223-L261](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/USER-GUIDE.md#L223-L261)

### Specialized MIDI Controllers

#### Artiphon Instrument 1

Uses the first five pads like a Guitar Hero controller, with strum bridge pads providing control functions.

#### ChordTracker Integration

Processes chord detection from external MIDI sources for automatic accompaniment control.

```mermaid
flowchart TD

CT["ChordTracker Device"]
MIDI_IN["MIDI Input Channel"]
DETECT["Chord Detection<br>Real-time Analysis"]
TRANS["Chord Translation<br>Nashville Numbers"]
STYLE_CTRL["Style Control<br>Automatic Changes"]

CT --> MIDI_IN
MIDI_IN --> DETECT
DETECT --> TRANS
TRANS --> STYLE_CTRL
```

Sources: [docs/js/index.js L156](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L156-L156)

 [docs/index.html L186](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L186-L186)

 [USER-GUIDE.md L214-L216](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/USER-GUIDE.md#L214-L216)

## Numeric Keypads

Numeric keypads provide an alternative input method for users without guitar or MIDI controllers.

### Keypad Mapping

The numeric keypad maps to chord functions and control operations:

```mermaid
flowchart TD

K7["7<br>Chord"]
K8["8<br>Chord"]
K9["9<br>Chord"]
K4["4<br>Chord"]
K5["5<br>Chord"]
K6["6<br>Chord"]
K1["1<br>Chord"]
K2["2<br>Chord"]
K3["3<br>Chord"]
K0["0<br>Control"]
KPLUS["Plus<br>Start/Stop"]
KENTER["Enter<br>Variation"]
KEYMAP["keyboard Map<br>Key State Tracking"]
HANDLER["Keyboard Event Handler<br>keydown/keyup"]
CHORD_OUT["Chord Output<br>Musical Events"]

K1 --> KEYMAP
K2 --> KEYMAP
K3 --> KEYMAP
K4 --> KEYMAP
K5 --> KEYMAP
K6 --> KEYMAP
K7 --> KEYMAP
K8 --> KEYMAP
K9 --> KEYMAP
K0 --> KEYMAP
KPLUS --> KEYMAP
KENTER --> KEYMAP
HANDLER --> CHORD_OUT

subgraph Processing ["Processing"]
    KEYMAP
    HANDLER
    KEYMAP --> HANDLER
end

subgraph subGraph0 ["Numeric Keypad Layout"]
    K7
    K8
    K9
    K4
    K5
    K6
    K1
    K2
    K3
    K0
    KPLUS
    KENTER
end
```

Sources: [docs/js/index.js L136](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L136-L136)

 [USER-GUIDE.md L96](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/USER-GUIDE.md#L96-L96)

## Input Controller Selection and Configuration

### Controller Type Selection

The `inputDeviceType` variable and corresponding UI dropdown control which type of input system is active:

```mermaid
flowchart TD

UI["midiInType Dropdown<br>Input Controller Selection"]
VAR["inputDeviceType Variable<br>Current Selection"]
GUITAR["'guitar'<br>Guitar Hero Controllers"]
KEYBOARD["'keyboard'<br>Numeric/MIDI Keyboard"]
LIBERLIVE["'liberlive'<br>LiberLive C1"]
LAVAGENIE["'lavagenie'<br>Lava Genie"]
ARTIPHON["'artiphon'<br>Artiphon Instrument 1"]
HANDLER_G["Guitar Input Handler"]
HANDLER_K["Keyboard Input Handler"]
HANDLER_L["Bluetooth Handler"]
HANDLER_LG["Bluetooth Handler"]
HANDLER_A["MIDI Handler"]

UI --> VAR
VAR --> GUITAR
VAR --> KEYBOARD
VAR --> LIBERLIVE
VAR --> LAVAGENIE
VAR --> ARTIPHON
GUITAR --> HANDLER_G
KEYBOARD --> HANDLER_K
LIBERLIVE --> HANDLER_L
LAVAGENIE --> HANDLER_LG
ARTIPHON --> HANDLER_A

subgraph subGraph0 ["Device Types"]
    GUITAR
    KEYBOARD
    LIBERLIVE
    LAVAGENIE
    ARTIPHON
end
```

Sources: [docs/js/index.js L147](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L147-L147)

 [docs/index.html L167](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L167-L167)

### Bluetooth Controller Setup

Bluetooth controllers require specific pairing and setup procedures:

```mermaid
sequenceDiagram
  participant User
  participant Bluetooth Button
  participant Bluetooth API
  participant BT Controller
  participant Event Handler

  User->>Bluetooth Button: Click Bluetooth Button
  Bluetooth Button->>Bluetooth API: requestDevice()
  Bluetooth API->>BT Controller: Connect Request
  BT Controller-->>Bluetooth API: Device Found
  Bluetooth API-->>Bluetooth Button: Device Object
  Bluetooth Button->>Event Handler: Setup Device Handlers
  Event Handler->>BT Controller: Configure Characteristics
  BT Controller-->>Event Handler: Ready for Events
  Event Handler->>Event Handler: Start Event Processing
```

Sources: [docs/js/index.js L476-L491](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L476-L491)

 [docs/js/index.js L505-L524](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L505-L524)

## Input Processing Architecture

### Event Flow

```mermaid
flowchart TD

AUDIO_SYS["Audio System<br>AudioLooper"]
INPUT_DEV["Input Devices<br>Various Types"]
EVENT_SYS["Event System<br>Browser APIs"]
GAMEPAD["Gamepad Handler<br>pad.buttons/axis"]
MIDI_H["MIDI Handler<br>WebMIDI API"]
BT_H["Bluetooth Handler<br>Web Bluetooth API"]
KB_H["Keyboard Handler<br>KeyboardEvent"]
CHORD_PROC["doChord()<br>Chord Processing"]
CANVAS_UPD["updateCanvas()<br>Visual Updates"]
STYLE_CTRL["Style Control<br>toggleStartStop()"]
UI_UPD["UI Updates<br>Visual Feedback"]
MIDI_OUT["MIDI Output<br>External Devices"]

subgraph subGraph3 ["Input Event Processing"]
    INPUT_DEV
    EVENT_SYS
    INPUT_DEV --> EVENT_SYS
    EVENT_SYS --> GAMEPAD
    EVENT_SYS --> MIDI_H
    EVENT_SYS --> BT_H
    EVENT_SYS --> KB_H
    GAMEPAD --> CHORD_PROC
    MIDI_H --> CHORD_PROC
    BT_H --> CHORD_PROC
    KB_H --> CHORD_PROC
    CANVAS_UPD --> UI_UPD
    STYLE_CTRL --> AUDIO_SYS
    STYLE_CTRL --> MIDI_OUT

subgraph subGraph2 ["Output Systems"]
    AUDIO_SYS
    UI_UPD
    MIDI_OUT
end

subgraph subGraph1 ["Processing Layer"]
    CHORD_PROC
    CANVAS_UPD
    STYLE_CTRL
    CHORD_PROC --> CANVAS_UPD
    CHORD_PROC --> STYLE_CTRL
end

subgraph subGraph0 ["Event Handlers"]
    GAMEPAD
    MIDI_H
    BT_H
    KB_H
end
end
```

Sources: [docs/js/index.js L257](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L257-L257)

 [docs/js/index.js L339-L342](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L342)