# Audio Processing Pipeline

> **Relevant source files**
> * [docs/assets/pedalboard.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/pedalboard.js)
> * [docs/assets/src/pedals/chorus.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/chorus.js)
> * [docs/assets/src/pedals/compressor.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/compressor.js)
> * [docs/assets/src/pedals/delay.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/delay.js)
> * [docs/assets/src/pedals/harmonic-tremolo.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/harmonic-tremolo.js)
> * [docs/assets/src/pedals/multihead-delay.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/multihead-delay.js)
> * [docs/assets/src/pedals/overdrive.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/overdrive.js)
> * [docs/assets/src/pedals/reverb.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/reverb.js)
> * [docs/assets/src/pedals/tremolo.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/tremolo.js)
> * [docs/assets/src/pedals/wah.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/wah.js)
> * [docs/assets/style.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/style.css)
> * [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)
> * [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)
> * [docs/js/audio_looper.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js)
> * [docs/js/background.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js)
> * [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)
> * [docs/js/styles.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/styles.js)
> * [docs/manifest.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json)
> * [docs/settings/options.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/settings/options.js)

## Purpose and Scope

The Audio Processing Pipeline covers OrinAyo's complete audio flow from input devices through effects processing to final output destinations. This includes input device handling, audio looping, effects processing, synthesis, and output routing. For information about individual input controllers, see [Input Controllers](/Jus-Be/orinayo/2.3-input-controllers). For details about MIDI processing specifically, see [MIDI Processing](/Jus-Be/orinayo/4.1-midi-processing). For sound synthesis details, see [Sound Synthesis](/Jus-Be/orinayo/4.2-sound-synthesis).

## High-Level Audio Flow

The audio processing pipeline processes multiple input types through a unified WebAudio-based architecture, routing audio through various processing stages before reaching output destinations.

### Audio Flow Architecture

```

```

Sources: [docs/js/index.js L193-L194](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L193-L194)

 [docs/assets/pedalboard.js L13-L17](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/pedalboard.js#L13-L17)

 [docs/js/audio_looper.js L8](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L8-L8)

## Input Processing

### Input Device Integration

OrinAyo processes input from multiple device types through a unified event handling system. The main application handles device events and converts them to audio processing commands.

| Input Type | Processing Method | Key Variables |
| --- | --- | --- |
| Guitar Controllers | Button/axis mapping | `pad.buttons[]`, `pad.axis[]` |
| MIDI Devices | WebMIDI API | `midiOutput`, `input` |
| Microphone | MediaDevices API | `microphone`, `mediaStreamSource` |
| Audio Devices | MediaDevices API | `guitarDeviceId`, `voiceDeviceId` |

### Audio Context Initialization

The core audio processing begins with WebAudio context setup:

```

```

Sources: [docs/js/index.js L193-L194](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L193-L194)

 [docs/js/index.js L339-L342](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L339-L342)

## Audio Looping System

### AudioLooper Architecture

The `AudioLooper` class manages playback of drum, bass, and chord loops with tempo and key synchronization.

```

```

### Loop Processing Flow

The AudioLooper handles complex loop transitions and tempo adjustments:

| Method | Purpose | Key Logic |
| --- | --- | --- |
| `getLoop(id)` | Resolves loop variations | Fallback chain: specific → chord type → generic |
| `doLoop()` | Plays audio buffer | Creates BufferSource, applies timing/effects |
| `update(id, sync)` | Changes active loop | Crossfades between loops mid-playback |

Sources: [docs/js/audio_looper.js L1-L319](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L1-L319)

 [docs/js/audio_looper.js L14-L42](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L14-L42)

 [docs/js/audio_looper.js L44-L143](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L44-L143)

### Loop Instance Management

Three AudioLooper instances handle different instrument parts:

```

```

Sources: [docs/js/index.js L137-L139](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L137-L139)

 [docs/js/audio_looper.js L10-L11](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L10-L11)

 [docs/js/audio_looper.js L98-L103](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L98-L103)

## Effects Processing System

### Pedalboard Architecture

The pedalboard system processes guitar input through a chain of effects pedals implemented as WebAudio nodes.

```

```

### Individual Effects Implementation

Each effect pedal follows a consistent pattern with input/output switching and parameter controls:

| Effect | Key Nodes | Parameters |
| --- | --- | --- |
| Wah | BiquadFilter (bandpass) | frequency, q, boost |
| Compressor | DynamicsCompressor | threshold, attack, release |
| Overdrive | WaveShaper | drive, volume |
| Delay | Delay + Gain + BiquadFilter | speed, feedback, mix, tone |
| Reverb | Convolver + Gain | mix, tone |
| Chorus | Delay + Oscillator | depth, rate, mix |

Sources: [docs/assets/pedalboard.js L119-L142](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/pedalboard.js#L119-L142)

 [docs/assets/src/pedals/wah.js L1-L84](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/wah.js#L1-L84)

 [docs/assets/src/pedals/delay.js L1-L89](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/delay.js#L1-L89)

 [docs/assets/src/pedals/reverb.js L1-L73](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/reverb.js#L1-L73)

### Effects Signal Routing

```

```

Sources: [docs/assets/src/pedals/delay.js L20-L23](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/delay.js#L20-L23)

 [docs/assets/src/pedals/reverb.js L17-L20](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/reverb.js#L17-L20)

 [docs/assets/src/pedals/chorus.js L18](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/src/pedals/chorus.js#L18-L18)

## Synthesis and Sound Generation

### WebAudioFont Integration

The system uses WebAudioFont for instrument playback through the `player` instance:

```

```

Sources: [docs/js/index.js L217-L218](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L217-L218)

 [docs/js/index.js L211-L214](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L211-L214)

### MIDI Synthesis

MIDI events are processed through synthesis engines:

| Synthesis Type | Implementation | Purpose |
| --- | --- | --- |
| WebAudioFont | `player.queueWaveTable()` | Instrument playback |
| SF2 Synth | `sf2synth.min.js` | SoundFont synthesis |
| Arranger Synth | `arrSynth` variable | Style accompaniment |

Sources: [docs/js/index.js L121-L122](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L121-L122)

 [docs/index.html L281](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L281-L281)

## Output Processing

### Multi-Destination Routing

Audio output is routed to multiple destinations simultaneously:

```

```

### Recording and Streaming

Recording and streaming are handled through MediaRecorder API:

| Feature | Implementation | Key Variables |
| --- | --- | --- |
| Recording | MediaRecorder + MediaStreamDestination | `mediaRecorder`, `recorderDestination` |
| Streaming | WebRTC + MediaStreamDestination | `streamDestination`, `publishConnection` |
| Canvas Recording | Canvas.captureStream() | Video track for lyrics display |

Sources: [docs/js/audio_looper.js L72-L75](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L72-L75)

 [docs/js/index.js L559-L598](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L559-L598)

 [docs/js/index.js L80-L83](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L80-L83)

### Volume and Gain Control

The system provides granular volume control through gain nodes:

```

```

Sources: [docs/js/index.js L98-L103](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L98-L103)

 [docs/js/index.js L219-L220](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L219-L220)

 [docs/js/audio_looper.js L61-L87](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js#L61-L87)