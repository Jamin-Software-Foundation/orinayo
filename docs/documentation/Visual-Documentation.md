# Visual Documentation

> **Relevant source files**
> * [docs/assets/screenshots/guitar_hero.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/guitar_hero.png)
> * [docs/assets/screenshots/orinayo.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo.png)
> * [docs/assets/screenshots/orinayo_chordpro.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_chordpro.png)
> * [docs/assets/screenshots/orinayo_desktop.svg](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_desktop.svg)
> * [docs/assets/screenshots/orinayo_mobile.jpeg](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_mobile.jpeg)
> * [docs/assets/screenshots/orinayo_mobile.svg](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_mobile.svg)
> * [docs/assets/screenshots/orinayo_pedalboard.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_pedalboard.png)

This page provides a comprehensive visual guide to OrinAyo's user interface, featuring screenshots and visual assets that demonstrate the application's features across different platforms and use cases. The documentation covers the main application interface, platform-specific variations, input device integration, and key functional areas through actual interface captures.

For technical details about the underlying UI implementation, see [UI Components](/Jus-Be/orinayo/3.3-ui-components). For information about the core application architecture powering these interfaces, see [Application Engine](/Jus-Be/orinayo/3.1-application-engine).

## Application Interface Overview

OrinAyo presents a unified interface that adapts to different platforms while maintaining consistent functionality. The main interface combines multiple functional areas including audio controls, device input handling, effects processing, and music notation display.

### UI Architecture Mapping

```mermaid
flowchart TD

MainUI["docs/index.html"]
CSS["docs/css/main.css"]
Bootstrap["docs/css/bootstrap.css"]
HitBar["HitBar Component"]
GameBoard["Game Board Interface"]
Pedalboard["Pedalboard Controls"]
Notation["Music Notation Display"]
IndexJS["docs/js/index.js"]
AudioLooper["docs/js/audio_looper.js"]
PedalboardJS["docs/js/pedalboard.js"]
MidiParser["docs/js/midi-parser.js"]

MainUI --> HitBar
MainUI --> GameBoard
MainUI --> Pedalboard
MainUI --> Notation
HitBar --> IndexJS
GameBoard --> IndexJS
Pedalboard --> PedalboardJS
Notation --> MidiParser

subgraph subGraph2 ["Core Engine Integration"]
    IndexJS
    AudioLooper
    PedalboardJS
    MidiParser
end

subgraph subGraph1 ["Interactive Components"]
    HitBar
    GameBoard
    Pedalboard
    Notation
end

subgraph subGraph0 ["Visual Interface Layer"]
    MainUI
    CSS
    Bootstrap
    CSS --> MainUI
    Bootstrap --> MainUI
end
```

Sources: [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)

 [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)

 [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)

 [docs/js/pedalboard.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/pedalboard.js)

## Platform-Specific Interfaces

### Desktop Interface

The desktop version provides the full-featured interface optimized for larger screens and mouse/keyboard interaction. It displays all functional areas simultaneously with dedicated space for each component.

```mermaid
flowchart TD

Header["Application Header"]
MainArea["Central Game Board"]
Sidebar["Control Sidebar"]
Footer["Status Footer"]
MultiWindow["Multiple Window Support"]
KeyboardShorts["Keyboard Shortcuts"]
MenuBar["Full Menu System"]

MultiWindow --> Header
KeyboardShorts --> MainArea
MenuBar --> Header

subgraph subGraph1 ["Desktop Features"]
    MultiWindow
    KeyboardShorts
    MenuBar
end

subgraph subGraph0 ["Desktop Layout"]
    Header
    MainArea
    Sidebar
    Footer
    Header --> MainArea
    MainArea --> Sidebar
    MainArea --> Footer
end
```

Sources: [docs/assets/screenshots/orinayo_desktop.svg](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_desktop.svg)

### Mobile Interface

The mobile interface adapts the layout for touch interaction and smaller screens, using a responsive design that prioritizes essential controls while maintaining access to all features through navigation.

```mermaid
flowchart TD

TouchNav["Touch Navigation"]
CompactBoard["Compact Game Board"]
SwipeControls["Swipe Gesture Controls"]
ResponsiveCSS["Responsive CSS Grid"]
TouchTargets["Large Touch Targets"]
VerticalLayout["Vertical Layout Priority"]

ResponsiveCSS --> TouchNav
TouchTargets --> CompactBoard
VerticalLayout --> SwipeControls

subgraph subGraph1 ["Mobile Optimizations"]
    ResponsiveCSS
    TouchTargets
    VerticalLayout
end

subgraph subGraph0 ["Mobile Viewport"]
    TouchNav
    CompactBoard
    SwipeControls
    TouchNav --> CompactBoard
    CompactBoard --> SwipeControls
end
```

Sources: [docs/assets/screenshots/orinayo_mobile.svg](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_mobile.svg)

## Feature-Specific Interface Areas

### Pedalboard Effects Interface

The pedalboard interface provides visual controls for guitar effects processing, presenting familiar pedal-style interfaces for various audio effects.

```mermaid
flowchart TD

ReverbPedal["Reverb Pedal UI"]
DelayPedal["Delay Pedal UI"]
ChorusPedal["Chorus Pedal UI"]
DistortionPedal["Distortion Pedal UI"]
PedalboardJS["docs/js/pedalboard.js"]
WebAudioAPI["Web Audio API Nodes"]
EffectChain["Effect Chain Processing"]

ReverbPedal --> PedalboardJS
DelayPedal --> PedalboardJS
ChorusPedal --> PedalboardJS
DistortionPedal --> PedalboardJS

subgraph subGraph1 ["Pedalboard Code Integration"]
    PedalboardJS
    WebAudioAPI
    EffectChain
    PedalboardJS --> WebAudioAPI
    WebAudioAPI --> EffectChain
end

subgraph subGraph0 ["Pedalboard Visual Components"]
    ReverbPedal
    DelayPedal
    ChorusPedal
    DistortionPedal
end
```

| Effect Type | Visual Control | Code Implementation |
| --- | --- | --- |
| Reverb | Knob controls for room size, decay | `pedalboard.js` reverb node |
| Delay | Time and feedback sliders | `pedalboard.js` delay node |
| Chorus | Rate and depth controls | `pedalboard.js` chorus node |
| Distortion | Drive and tone knobs | `pedalboard.js` distortion node |

Sources: [docs/assets/screenshots/orinayo_pedalboard.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_pedalboard.png)

 [docs/js/pedalboard.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/pedalboard.js)

### Music Notation Display

The ChordPro notation interface displays chord charts and lyrics in a readable format, supporting standard ChordPro syntax for musical notation.

```mermaid
flowchart TD

ChordChart["Chord Chart Renderer"]
LyricDisplay["Lyric Text Display"]
ChordPositions["Chord Position Diagrams"]
ChordProParser["ChordPro Format Parser"]
RenderEngine["Text Rendering Engine"]
FontSystem["Music Font System"]

ChordChart --> ChordProParser
LyricDisplay --> ChordProParser
ChordPositions --> ChordProParser

subgraph subGraph1 ["Notation Processing"]
    ChordProParser
    RenderEngine
    FontSystem
    ChordProParser --> RenderEngine
    RenderEngine --> FontSystem
end

subgraph subGraph0 ["Notation Display Components"]
    ChordChart
    LyricDisplay
    ChordPositions
end
```

Sources: [docs/assets/screenshots/orinayo_chordpro.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/orinayo_chordpro.png)

## Input Device Integration

### Guitar Controller Visualization

The interface provides visual feedback for guitar controller input, showing button states and fret positions in real-time.

```mermaid
flowchart TD

FretButtons["Fret Button Indicators"]
StrumBar["Strum Bar Visual"]
WhamyBar["Whamy Bar Position"]
StarPower["Star Power Indicator"]
InputHandler["docs/js/index.js input handling"]
ButtonMapping["Controller Button Mapping"]
GameLogic["Game Logic Processing"]

FretButtons --> InputHandler
StrumBar --> InputHandler
WhamyBar --> InputHandler
StarPower --> InputHandler

subgraph subGraph1 ["Controller Input Processing"]
    InputHandler
    ButtonMapping
    GameLogic
    InputHandler --> ButtonMapping
    ButtonMapping --> GameLogic
end

subgraph subGraph0 ["Guitar Controller Display"]
    FretButtons
    StrumBar
    WhamyBar
    StarPower
end
```

| Controller Element | Visual Indicator | Input Processing |
| --- | --- | --- |
| Green Fret | Green button highlight | Gamepad button 0 |
| Red Fret | Red button highlight | Gamepad button 1 |
| Yellow Fret | Yellow button highlight | Gamepad button 2 |
| Blue Fret | Blue button highlight | Gamepad button 3 |
| Orange Fret | Orange button highlight | Gamepad button 4 |
| Strum Bar | Directional arrow | Gamepad axis movement |

Sources: [docs/assets/screenshots/guitar_hero.png](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/guitar_hero.png)

 [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)

## Visual Asset Organization

### Screenshot Asset Structure

```mermaid
flowchart TD

ScreenshotDir["docs/assets/screenshots/"]
PedalboardPNG["orinayo_pedalboard.png"]
ChordProPNG["orinayo_chordpro.png"]
MobileSVG["orinayo_mobile.svg"]
DesktopSVG["orinayo_desktop.svg"]
GuitarPNG["guitar_hero.png"]
Documentation["Wiki Documentation"]
UserGuides["User Guide References"]
FeatureDemo["Feature Demonstrations"]

PedalboardPNG --> Documentation
ChordProPNG --> Documentation
MobileSVG --> UserGuides
DesktopSVG --> UserGuides
GuitarPNG --> FeatureDemo

subgraph subGraph1 ["Asset Usage"]
    Documentation
    UserGuides
    FeatureDemo
end

subgraph subGraph0 ["Screenshot Assets"]
    ScreenshotDir
    PedalboardPNG
    ChordProPNG
    MobileSVG
    DesktopSVG
    GuitarPNG
    ScreenshotDir --> PedalboardPNG
    ScreenshotDir --> ChordProPNG
    ScreenshotDir --> MobileSVG
    ScreenshotDir --> DesktopSVG
    ScreenshotDir --> GuitarPNG
end
```

Sources: [docs/assets/screenshots/](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/screenshots/)

## Interface State Management

The visual interface maintains state through JavaScript event handlers and DOM manipulation, coordinating between user interactions and audio processing.

```mermaid
flowchart TD

DOMElements["DOM Element References"]
EventHandlers["Event Handler Registry"]
StateUpdaters["Visual State Updaters"]
AudioState["Audio Engine State"]
InputState["Input Device State"]
GameState["Game Logic State"]

StateUpdaters --> AudioState
StateUpdaters --> InputState
StateUpdaters --> GameState
AudioState --> DOMElements
InputState --> DOMElements
GameState --> DOMElements

subgraph subGraph1 ["State Synchronization"]
    AudioState
    InputState
    GameState
end

subgraph subGraph0 ["UI State Components"]
    DOMElements
    EventHandlers
    StateUpdaters
    DOMElements --> EventHandlers
    EventHandlers --> StateUpdaters
end
```

Sources: [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)

 [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)