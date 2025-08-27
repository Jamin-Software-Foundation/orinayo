# SoundFont Files

> **Relevant source files**
> * [docs/assets/gs-e-pianos/CP80/cp80.websfz.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gs-e-pianos/CP80/cp80.websfz.json)
> * [docs/js/0270_Aspirin_sf2_file.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0270_Aspirin_sf2_file.js)
> * [docs/js/0280_JCLive_sf2_file.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0280_JCLive_sf2_file.js)

This document covers SoundFont instrument definition files used by OrinAyo for realistic instrument sound synthesis. SoundFont files define instrument samples, key mappings, and playback parameters that enable the SF2 synthesizer to produce authentic instrument sounds.

For information about the synthesis engine that processes these files, see [Sound Synthesis](/Jus-Be/orinayo/4.2-sound-synthesis). For broader audio asset management, see [Audio Loops and Samples](/Jus-Be/orinayo/7.1-audio-loops-and-samples).

## Purpose and File Formats

OrinAyo supports multiple SoundFont formats to provide realistic instrument sounds for music production:

* **JavaScript SF2 Format**: Native format with embedded base64 audio data
* **WebSFZ Format**: JSON-based format compatible with SFZ samplers
* **Standard SF2**: Traditional SoundFont 2.0 files processed by `sf2synth.min.js`

These files define instrument characteristics including sample data, key ranges, velocity layers, loop points, and ADSR envelope parameters.

## SoundFont Integration Architecture

```mermaid
flowchart TD

JS_SF2["JavaScript SF2 Files<br>(0270_Aspirin_sf2_file.js)"]
WEBSFZ["WebSFZ Files<br>(cp80.websfz.json)"]
SF2_STD["Standard SF2 Files"]
SF2_SYNTH["sf2synth.min.js<br>SoundFont Synthesizer"]
AUDIO_LOOPER["audio_looper.js<br>AudioLooper Engine"]
WEB_AUDIO["WebAudio API<br>Output"]
MIDI_INPUT["MIDI Controllers"]
GUITAR_INPUT["Guitar Controllers"]

JS_SF2 --> SF2_SYNTH
WEBSFZ --> SF2_SYNTH
SF2_STD --> SF2_SYNTH
MIDI_INPUT --> SF2_SYNTH
GUITAR_INPUT --> SF2_SYNTH

subgraph subGraph2 ["Input Sources"]
    MIDI_INPUT
    GUITAR_INPUT
end

subgraph subGraph1 ["Audio Processing Pipeline"]
    SF2_SYNTH
    AUDIO_LOOPER
    WEB_AUDIO
    SF2_SYNTH --> AUDIO_LOOPER
    AUDIO_LOOPER --> WEB_AUDIO
end

subgraph subGraph0 ["SoundFont Assets"]
    JS_SF2
    WEBSFZ
    SF2_STD
end
```

Sources: High-level architecture diagrams, [docs/js/0270_Aspirin_sf2_file.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0270_Aspirin_sf2_file.js)

 [docs/assets/gs-e-pianos/CP80/cp80.websfz.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gs-e-pianos/CP80/cp80.websfz.json)

## JavaScript SF2 File Structure

JavaScript SF2 files contain instrument definitions as JavaScript objects with embedded audio samples:

```mermaid
flowchart TD

MIDI["midi: program number"]
ROOT["_tone_XXXX_sf2_file"]
ZONES["zones[]"]
PITCH["originalPitch: cents"]
KEY_RANGE["keyRangeLow/High"]
LOOP["loopStart/End"]
TUNE["coarseTune/fineTune"]
SAMPLE_RATE["sampleRate: Hz"]
AHDSR["ahdsr: boolean"]
AUDIO_DATA["file: base64 audio"]
ANCHOR["anchor: timing offset"]

subgraph subGraph1 ["SF2 File Object Structure"]
    ROOT
    ZONES
    ROOT --> ZONES
    ZONES --> MIDI
    ZONES --> PITCH
    ZONES --> KEY_RANGE
    ZONES --> LOOP
    ZONES --> TUNE
    ZONES --> SAMPLE_RATE
    ZONES --> AHDSR
    ZONES --> AUDIO_DATA
    ZONES --> ANCHOR

subgraph subGraph0 ["Zone Properties"]
    MIDI
    PITCH
    KEY_RANGE
    LOOP
    TUNE
    SAMPLE_RATE
    AHDSR
    AUDIO_DATA
    ANCHOR
end
end
```

### Multi-Zone Instruments

Complex instruments like muted guitar sounds use multiple zones for different pitch ranges:

| Zone | Key Range | Center Pitch | Sample Name |
| --- | --- | --- | --- |
| 1 | 0-55 | E2 (5800 cents) | `Gtr_Mute_E2` |
| 2 | 56-60 | A2 (6500 cents) | `Gtr_Mute_A2` |
| 3 | 61-65 | D3 (7000 cents) | `Gtr_Mute_D3` |
| 4 | 66-69 | G3 (7500 cents) | `Gtr_Mute_G3` |
| 5 | 70-74 | B3 (7900 cents) | `Gtr_Mute_B3` |

Sources: [docs/js/0280_JCLive_sf2_file.js L1-L110](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0280_JCLive_sf2_file.js#L1-L110)

## WebSFZ Format

WebSFZ files use JSON structure for more complex instrument definitions with velocity layers and advanced parameters:

```mermaid
flowchart TD

KEY_MAP["lokey/hikey/pitch_keycenter"]
META["meta: instrument info"]
GLOBAL["global: default settings"]
GROUPS["groups[]: velocity layers"]
REGIONS["regions[]: key mappings"]
VEL_RANGE["lovel/hivel: velocity"]
VOLUME["volume: dB offset"]
SAMPLE_FILE["sample: audio file path"]
SAMPLE_END["end: sample endpoint"]

subgraph subGraph2 ["WebSFZ Structure"]
    META
    GLOBAL
    GROUPS
    META --> GLOBAL
    GLOBAL --> GROUPS
    GROUPS --> REGIONS
    GROUPS --> VEL_RANGE

subgraph subGraph1 ["Group Contents"]
    REGIONS
    VEL_RANGE
    REGIONS --> KEY_MAP
    REGIONS --> VOLUME
    REGIONS --> SAMPLE_FILE
    REGIONS --> SAMPLE_END

subgraph subGraph0 ["Region Properties"]
    KEY_MAP
    VOLUME
    SAMPLE_FILE
    SAMPLE_END
end
end
end
```

### Velocity Layer Example (CP80 Piano)

The CP80 electric piano uses four velocity layers:

| Layer | Velocity Range | Label | Characteristics |
| --- | --- | --- | --- |
| 1 | 1-49 | `PP` (pianissimo) | Soft attack |
| 2 | 50-81 | `MP` (mezzo-piano) | Medium attack |
| 3 | 82-103 | `F` (forte) | Strong attack |
| 4 | 104-127 | `FF` (fortissimo) | Maximum attack |

Sources: [docs/assets/gs-e-pianos/CP80/cp80.websfz.json L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gs-e-pianos/CP80/cp80.websfz.json#L1-L1)

## File Organization and Naming

SoundFont files follow consistent naming patterns:

### JavaScript SF2 Files

* Pattern: `XXXX_InstrumentName_sf2_file.js`
* Location: `docs/js/`
* Examples: `0270_Aspirin_sf2_file.js`, `0280_JCLive_sf2_file.js`

### WebSFZ Assets

* Pattern: `instrumentname.websfz.json`
* Location: `docs/assets/gs-e-pianos/[instrument]/`
* Companion audio files in `Samples/` subdirectory

### Global Configuration

WebSFZ files include global parameters affecting all regions:

| Parameter | Purpose | Example Value |
| --- | --- | --- |
| `amplitude_oncc7` | Volume CC control | 100 |
| `pan_oncc10` | Pan CC control | 100 |
| `ampeg_release_oncc72` | Release CC control | 2 |
| `note_polyphony` | Voice limit per note | 1 |
| `off_time` | Note-off behavior | 0 |

Sources: [docs/assets/gs-e-pianos/CP80/cp80.websfz.json L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/gs-e-pianos/CP80/cp80.websfz.json#L1-L1)

## Integration with Synthesis Engine

SoundFont files are loaded and processed by the SF2 synthesis system:

1. **File Loading**: JavaScript SF2 files are loaded as modules
2. **Zone Mapping**: Key ranges and velocity layers are indexed
3. **Sample Preparation**: Base64 audio data is decoded
4. **Synthesis Ready**: Instrument available for real-time playback

The synthesis engine maps incoming MIDI events to appropriate zones based on key number and velocity, then triggers sample playback with the defined parameters.

Sources: System architecture diagrams, [docs/js/0270_Aspirin_sf2_file.js L1-L36](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0270_Aspirin_sf2_file.js#L1-L36)

 [docs/js/0280_JCLive_sf2_file.js L1-L111](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/0280_JCLive_sf2_file.js#L1-L111)