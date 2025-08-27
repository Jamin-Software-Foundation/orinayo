# Core Architecture

> **Relevant source files**
> * [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)
> * [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)
> * [docs/js/audio_looper.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js)
> * [docs/js/background.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js)
> * [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)
> * [docs/js/styles.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/styles.js)
> * [docs/manifest.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json)
> * [docs/settings/options.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/settings/options.js)

This document provides a technical overview of OrinAyo's core application architecture, covering the main application engine, audio processing systems, and user interface components. It explains how these systems interact to create a live music production environment in the browser.

For information about specific input controllers and device integration, see [Input Controllers](/Jus-Be/orinayo/2.3-input-controllers). For detailed audio processing workflows, see [Audio Processing Pipeline](/Jus-Be/orinayo/3.2-audio-processing-pipeline). For UI-specific implementation details, see [UI Components](/Jus-Be/orinayo/3.3-ui-components).

## Application Structure Overview

OrinAyo follows a modular architecture built around a central application engine that coordinates between audio processing, user interface, and external device systems. The application runs as a single-page web application with support for multiple deployment targets.

### Core System Architecture

```mermaid
flowchart TD

MainEngine["index.js<br>Main Application Engine"]
EventSystem["Event Handler System<br>messageHandler, resizeHandler"]
StateManager["Global State Management<br>Variables & Configuration"]
AudioLooper["AudioLooper Class<br>audio_looper.js"]
WebAudioAPI["WebAudio Context<br>audioContext"]
MIDISystem["MIDI Processing<br>WebMIDI Integration"]
HTMLStructure["index.html<br>DOM Structure"]
CanvasSystem["Canvas Rendering<br>gameCanvas, tempoCanvas"]
UIControls["Fluent UI Controls<br>Buttons, Dialogs"]
ServiceWorker["main-sw.js<br>Service Worker"]
ExtensionBG["background.js<br>Chrome Extension"]
PWAManifest["web-manifest.json<br>PWA Configuration"]

MainEngine --> AudioLooper
MainEngine --> HTMLStructure
ServiceWorker --> MainEngine
ExtensionBG --> MainEngine

subgraph subGraph3 ["Platform Layer"]
    ServiceWorker
    ExtensionBG
    PWAManifest
end

subgraph subGraph2 ["UI Layer"]
    HTMLStructure
    CanvasSystem
    UIControls
    HTMLStructure --> CanvasSystem
    HTMLStructure --> UIControls
end

subgraph subGraph1 ["Audio Subsystem"]
    AudioLooper
    WebAudioAPI
    MIDISystem
    AudioLooper --> WebAudioAPI
end

subgraph subGraph0 ["Application Engine"]
    MainEngine
    EventSystem
    StateManager
    MainEngine --> StateManager
    EventSystem --> MainEngine
end
```

**Sources:** [docs/js/index.js L1-L7341](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1-L7341)

 [docs/index.html L1-L298](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L1-L298)

 [docs/js/audio_looper.js L1-L319](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L1-L319)

 [docs/js/background.js L1-L126](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L1-L126)

## Main Application Engine

The core application engine is implemented in `index.js` and serves as the central coordinator for all system components. It manages global state, handles events from multiple input sources, and orchestrates audio playback.

### Engine Components and Responsibilities

| Component | Primary Functions | Key Code Elements |
| --- | --- | --- |
| **Global State Management** | Configuration, device state, audio parameters | [docs/js/index.js L37-L164](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L37-L164) |
| **Event Processing** | Window events, controller input, MIDI messages | [docs/js/index.js L339-L353](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L353) |
| **Audio Coordination** | WebAudio context, loop management, effects | [docs/js/index.js L193-L210](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L193-L210) |
| **Device Integration** | Bluetooth controllers, MIDI devices, Stream Deck | [docs/js/index.js L465-L679](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L465-L679) |

### Global State Architecture

```mermaid
flowchart TD

Tempo["tempo<br>BPM Control"]
Key["key, keyChange<br>Musical Key"]
Volume["bassVol, chordVol<br>drumVol, guitarVolume"]
Controllers["bluetoothGuitar<br>guitarDeviceId<br>padsDevice"]
MIDI["midiOutput<br>midiSynth<br>arrSynth"]
Audio["audioContext<br>microphone<br>streamDestination"]
Loops["bassLoop<br>chordLoop<br>drumLoop"]
Sequences["songSequence<br>arrSequence"]
Timing["nextNoteTime<br>current16thNote"]
Canvas["canvas<br>canvasContext<br>game"]
Display["mobileViewpoint<br>desktopContainer"]
Controls["playButton<br>tempoEle<br>orinayo"]

Tempo --> Loops
Key --> Sequences
Audio --> Loops
Timing --> Canvas

subgraph subGraph3 ["UI State"]
    Canvas
    Display
    Controls
    Canvas --> Controls
end

subgraph subGraph2 ["Playback State"]
    Loops
    Sequences
    Timing
    Sequences --> Timing
end

subgraph subGraph1 ["Device State"]
    Controllers
    MIDI
    Audio
    Controllers --> MIDI
end

subgraph subGraph0 ["Configuration State"]
    Tempo
    Key
    Volume
end
```

**Sources:** [docs/js/index.js L37-L164](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L37-L164)

 [docs/js/index.js L193-L210](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L193-L210)

 [docs/js/index.js L250-L258](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L250-L258)

### Event System Architecture

The application implements a comprehensive event handling system that processes input from multiple sources and coordinates responses across the system.

```mermaid
flowchart TD

WindowEvents["Window Events<br>load, unload, resize, message"]
ControllerEvents["Controller Input<br>Gamepad API, Bluetooth"]
MIDIEvents["MIDI Messages<br>WebMIDI API"]
UIEvents["User Interface<br>Button clicks, form changes"]
MessageHandler["messageHandler()<br>Handles external messages"]
ResizeHandler["resizeHandler()<br>UI layout updates"]
LoadHandler["onloadHandler()<br>Application initialization"]
DeviceHandlers["Controller-specific handlers<br>LiberLive, LavaGenie"]
AudioSystem["Audio Playback<br>Loop management"]
UIUpdates["Interface Updates<br>Canvas rendering"]
StateChanges["Configuration<br>Global state updates"]

WindowEvents --> MessageHandler
WindowEvents --> ResizeHandler
WindowEvents --> LoadHandler
ControllerEvents --> DeviceHandlers
MIDIEvents --> DeviceHandlers
UIEvents --> MessageHandler
MessageHandler --> AudioSystem
ResizeHandler --> UIUpdates
LoadHandler --> StateChanges
DeviceHandlers --> AudioSystem
DeviceHandlers --> StateChanges

subgraph subGraph2 ["System Responses"]
    AudioSystem
    UIUpdates
    StateChanges
end

subgraph subGraph1 ["Event Handlers"]
    MessageHandler
    ResizeHandler
    LoadHandler
    DeviceHandlers
end

subgraph subGraph0 ["Event Sources"]
    WindowEvents
    ControllerEvents
    MIDIEvents
    UIEvents
end
```

**Sources:** [docs/js/index.js L339-L353](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L353)

 [docs/js/index.js L465-L679](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L465-L679)

 [docs/js/index.js L681-L952](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L681-L952)

## Audio System Integration

The audio subsystem centers around the `AudioLooper` class, which manages loop-based audio playback coordinated with the WebAudio API. The main engine interfaces with audio through several key integration points.

### AudioLooper Class Architecture

```mermaid
flowchart TD

Constructor["AudioLooper(styleType)<br>drum, bass, chord"]
Properties["loopPending<br>looping<br>finished<br>playbackRate"]
AudioContext["this.audioContext<br>WebAudio Context"]
GetLoop["getLoop(id)<br>Loop selection logic"]
DoLoop["doLoop(id, beginTime, howLong, when)<br>WebAudio playback"]
StartStop["start(), stop()<br>Lifecycle management"]
Update["update(id, sync)<br>Dynamic loop changes"]
BufferSource["createBufferSource()<br>Audio sample playback"]
GainNode["createGain()<br>Volume control"]
Destination["audioContext.destination<br>Output routing"]

Properties --> GetLoop
DoLoop --> BufferSource

subgraph subGraph2 ["Audio Graph"]
    BufferSource
    GainNode
    Destination
    BufferSource --> GainNode
    GainNode --> Destination
end

subgraph subGraph1 ["Core Methods"]
    GetLoop
    DoLoop
    StartStop
    Update
    GetLoop --> DoLoop
    Update --> DoLoop
end

subgraph subGraph0 ["AudioLooper Instance"]
    Constructor
    Properties
    AudioContext
    Constructor --> Properties
end
```

**Sources:** [docs/js/audio_looper.js L1-L43](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L1-L43)

 [docs/js/audio_looper.js L44-L143](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L44-L143)

 [docs/js/audio_looper.js L216-L245](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L216-L245)

### Audio Processing Flow

The main engine coordinates three `AudioLooper` instances for drums, bass, and chords, managing their synchronization and parameter updates.

```mermaid
sequenceDiagram
  participant Main Engine
  participant drumLoop (AudioLooper)
  participant bassLoop (AudioLooper)
  participant chordLoop (AudioLooper)
  participant WebAudio API

  Main Engine->>drumLoop (AudioLooper): start("arra", when)
  drumLoop (AudioLooper)->>WebAudio API: createBufferSource()
  drumLoop (AudioLooper)->>WebAudio API: source.start(when, beginTime)
  Main Engine->>bassLoop (AudioLooper): start("key0_maj_arra", when)
  bassLoop (AudioLooper)->>WebAudio API: createBufferSource()
  bassLoop (AudioLooper)->>WebAudio API: source.start(when, beginTime)
  Main Engine->>chordLoop (AudioLooper): update("key0_min_arra", sync)
  chordLoop (AudioLooper)->>WebAudio API: source.stop()
  chordLoop (AudioLooper)->>WebAudio API: createBufferSource()
  chordLoop (AudioLooper)->>WebAudio API: source.start(when, beginTime)
  note over Main Engine,WebAudio API: Synchronized loop playback with tempo changes
```

**Sources:** [docs/js/audio_looper.js L216-L245](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L216-L245)

 [docs/js/audio_looper.js L165-L214](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L165-L214)

 [docs/js/audio_looper.js L277-L307](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L277-L307)

## User Interface Architecture

The UI system is built around a responsive HTML structure that adapts between desktop and mobile layouts, with canvas-based game interfaces and Fluent UI controls for user interaction.

### HTML Structure and Component Organization

```mermaid
flowchart TD

Body["body<br>Root container"]
MobileDiv["div#mobile<br>Mobile layout"]
DesktopDiv["div#desktop<br>Desktop layout"]
MobileHeader["mobile-header<br>Logo and toolbar"]
MobileBody["mobile-body<br>Control panels"]
MobileToolbar["mobile-toolbar<br>Dynamic controls"]
MainToolbar["Main toolbar<br>fluent-button controls"]
SettingsTable["settings table<br>Configuration UI"]
GameCanvas["gameCanvas<br>Visual feedback"]
LyricsCanvas["lyrics canvas<br>Text display"]
ChatView["chatview<br>XMPP integration"]
SettingsDialog["settings-dialog<br>Configuration modal"]

MobileDiv --> MobileHeader
MobileDiv --> MobileBody
DesktopDiv --> MainToolbar
DesktopDiv --> SettingsTable
DesktopDiv --> GameCanvas
Body --> LyricsCanvas
Body --> ChatView
Body --> SettingsDialog

subgraph subGraph3 ["Shared Components"]
    LyricsCanvas
    ChatView
    SettingsDialog
end

subgraph subGraph2 ["Desktop Components"]
    MainToolbar
    SettingsTable
    GameCanvas
end

subgraph subGraph1 ["Mobile Components"]
    MobileHeader
    MobileBody
    MobileToolbar
    MobileHeader --> MobileToolbar
end

subgraph subGraph0 ["Main HTML Structure"]
    Body
    MobileDiv
    DesktopDiv
    Body --> MobileDiv
    Body --> DesktopDiv
end
```

**Sources:** [docs/index.html L19-L86](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L19-L86)

 [docs/index.html L87-L221](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L87-L221)

 [docs/index.html L137-L150](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L137-L150)

### Canvas System Integration

The application uses multiple canvas elements for different rendering purposes, managed through the main engine's canvas context.

| Canvas Element | Purpose | Key Variables | Integration Points |
| --- | --- | --- | --- |
| `gameCanvas` | Game controller visualization | [docs/js/index.js L250-L254](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L250-L254) | Guitar Hero-style interface |
| `tempoCanvas` | Tempo and beat visualization | [docs/js/index.js L189](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L189-L189) | Metronome display |
| `lyrics` | Song lyrics and chord display | [docs/js/index.js L108-L110](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L108-L110) | ChordPro rendering |

**Sources:** [docs/index.html L224](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L224-L224)

 [docs/index.html L241](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L241-L241)

 [docs/index.html L142](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L142-L142)

 [docs/js/index.js L250-L254](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L250-L254)

## Platform Integration Layer

OrinAyo supports multiple deployment targets through a platform abstraction layer that handles Progressive Web App features, Chrome Extension functionality, and Service Worker caching.

### Multi-Platform Deployment Architecture

```mermaid
flowchart TD

AppCore["OrinAyo Application<br>index.js + index.html"]
DirectWeb["Direct Web Access<br>GitHub Pages"]
PWA["Progressive Web App<br>web-manifest.json"]
ServiceWorker["Service Worker<br>main-sw.js"]
ChromeExt["Chrome Extension<br>manifest.json"]
Background["Background Script<br>background.js"]
ExtensionWindow["Extension Window<br>Popup interface"]
AssetCache["Asset Caching<br>Audio loops, scripts"]
StateStorage["State Persistence<br>localStorage, IndexedDB"]

AppCore --> DirectWeb
AppCore --> PWA
AppCore --> ChromeExt
ServiceWorker --> AssetCache
Background --> StateStorage
PWA --> AssetCache

subgraph subGraph3 ["Shared Services"]
    AssetCache
    StateStorage
end

subgraph subGraph2 ["Extension Platform"]
    ChromeExt
    Background
    ExtensionWindow
    ChromeExt --> Background
    Background --> ExtensionWindow
end

subgraph subGraph1 ["Web Platform"]
    DirectWeb
    PWA
    ServiceWorker
    PWA --> ServiceWorker
end

subgraph subGraph0 ["Core Application"]
    AppCore
end
```

**Sources:** [docs/js/background.js L34-L80](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L34-L80)

 [docs/manifest.json L1-L31](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json#L1-L31)

 [docs/js/background.js L88-L125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L88-L125)

### Chrome Extension Integration

The Chrome Extension platform provides additional capabilities through the background service worker and dedicated window management.

```mermaid
flowchart TD

Install["chrome.runtime.onInstalled"]
Startup["chrome.runtime.onStartup"]
Action["chrome.action.onClicked"]
WindowEvents["chrome.windows events"]
OpenWindow["openOrinAyoWindow()"]
CreateWindow["createOrinAyoWindow()"]
WindowMgmt["Window lifecycle management"]
LocalStorage["chrome.storage.local"]
WindowState["orinAyoWin window ID"]

Install --> OpenWindow
Startup --> OpenWindow
Action --> OpenWindow
WindowMgmt --> LocalStorage
WindowEvents --> LocalStorage

subgraph subGraph2 ["Extension Storage"]
    LocalStorage
    WindowState
    LocalStorage --> WindowState
end

subgraph subGraph1 ["Background Functions"]
    OpenWindow
    CreateWindow
    WindowMgmt
    OpenWindow --> CreateWindow
    CreateWindow --> WindowMgmt
end

subgraph subGraph0 ["Extension Events"]
    Install
    Startup
    Action
    WindowEvents
end
```

**Sources:** [docs/js/background.js L36-L62](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L36-L62)

 [docs/js/background.js L88-L125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L88-L125)

 [docs/js/background.js L72-L79](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L72-L79)

## System Initialization and Lifecycle

The application follows a structured initialization sequence that sets up all subsystems in the correct order and manages their lifecycle throughout the application's runtime.

### Application Bootstrap Sequence

```mermaid
sequenceDiagram
  participant Browser
  participant index.html
  participant index.js
  participant AudioLooper
  participant UI Components

  Browser->>index.html: Load page
  index.html->>index.js: Load scripts
  index.js->>index.js: onloadHandler()
  index.js->>AudioLooper: Initialize audioContext
  index.js->>AudioLooper: Create AudioLooper instances
  index.js->>UI Components: Setup canvas contexts
  index.js->>UI Components: Initialize mobile/desktop layout
  index.js->>index.js: Setup event listeners
  index.js->>AudioLooper: Load initial audio samples
  note over Browser,AudioLooper: Application ready for user interaction
```

**Sources:** [docs/js/index.js L339](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L339)

 [docs/js/index.js L193-L210](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L193-L210)

 [docs/js/audio_looper.js L1-L12](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L1-L12)