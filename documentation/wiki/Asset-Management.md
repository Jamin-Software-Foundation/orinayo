# Asset Management

> **Relevant source files**
> * [docs/extra/assets/bass/brit-rock_80_24000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/brit-rock_80_24000.bass)
> * [docs/extra/assets/bass/disco-rock_120_16000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/disco-rock_120_16000.bass)
> * [docs/extra/assets/bass/rock-ballad_70_27429.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/rock-ballad_70_27429.bass)
> * [docs/extra/assets/bass/slow-blues_60_32000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-blues_60_32000.bass)
> * [docs/extra/assets/bass/slow-pop_75_25600.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-pop_75_25600.bass)
> * [docs/extra/assets/bass/slow-rock_80_12000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-rock_80_12000.bass)
> * [docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord)
> * [docs/extra/assets/chords/brit-rock_80_24000_24000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/brit-rock_80_24000_24000_2.chord)
> * [docs/extra/assets/chords/disco-rock_120_16000_16000_4.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/disco-rock_120_16000_16000_4.chord)
> * [docs/extra/assets/chords/rock-ballad_70_27429_27429_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/rock-ballad_70_27429_27429_2.chord)
> * [docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord)
> * [docs/extra/assets/chords/slow-pop_75_25600_25600_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/slow-pop_75_25600_25600_2.chord)
> * [docs/js/main-sw.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js)

This document covers OrinAyo's comprehensive asset management system, which handles the organization, caching, and delivery of audio assets including musical loops, samples, and SoundFont files. The system ensures efficient storage and retrieval of audio assets for both online and offline performance scenarios.

For information about the audio processing of these assets, see [Audio Processing Pipeline](/Jus-Be/orinayo/3.2-audio-processing-pipeline). For details about SoundFont synthesis specifically, see [Sound Synthesis](/Jus-Be/orinayo/4.2-sound-synthesis).

## Asset Organization Structure

OrinAyo's assets are organized in a hierarchical directory structure that categorizes audio content by type, musical style, and performance characteristics.

```mermaid
flowchart TD

ROOT["docs/assets/"]
BASS["bass/"]
CHORDS["chords/"]
DRUMS["drums/"]
EXTRA["docs/extra/assets/"]
EXTRA_BASS["bass/"]
EXTRA_CHORDS["chords/"]
EXTRA_DRUMS["drums/"]
JS["docs/js/"]
SF2["*.sf2_file.js"]
BASS_EXAMPLE["acoustic-guitar_75_25600.bass"]
CHORD_EXAMPLE["funky-pop_105_9143_9143_2.chord"]
DRUM_EXAMPLE["rock_120_8000_2000_2000_4000.drum"]
STYLE1["Style: acoustic-guitar"]
BPM1["BPM: 75"]
DURATION1["Duration: 25600 samples"]
STYLE2["Style: funky-pop"]
BPM2["BPM: 105"]
LOOP_LENGTH["Loop Length: 9143 samples"]
VARIATIONS["Variations: 2"]

BASS --> BASS_EXAMPLE
CHORDS --> CHORD_EXAMPLE
DRUMS --> DRUM_EXAMPLE
BASS_EXAMPLE --> STYLE1
BASS_EXAMPLE --> BPM1
BASS_EXAMPLE --> DURATION1
CHORD_EXAMPLE --> STYLE2
CHORD_EXAMPLE --> BPM2
CHORD_EXAMPLE --> LOOP_LENGTH
CHORD_EXAMPLE --> VARIATIONS

subgraph subGraph2 ["Naming Components"]
    STYLE1
    BPM1
    DURATION1
    STYLE2
    BPM2
    LOOP_LENGTH
    VARIATIONS
end

subgraph subGraph1 ["Asset Naming Convention"]
    BASS_EXAMPLE
    CHORD_EXAMPLE
    DRUM_EXAMPLE
end

subgraph subGraph0 ["Asset Directory Structure"]
    ROOT
    BASS
    CHORDS
    DRUMS
    EXTRA
    EXTRA_BASS
    EXTRA_CHORDS
    EXTRA_DRUMS
    JS
    SF2
    ROOT --> BASS
    ROOT --> CHORDS
    ROOT --> DRUMS
    EXTRA --> EXTRA_BASS
    EXTRA --> EXTRA_CHORDS
    EXTRA --> EXTRA_DRUMS
    JS --> SF2
end
```

Sources: [docs/js/main-sw.js L46-L76](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L46-L76)

 [docs/js/main-sw.js L78-L204](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L78-L204)

 [docs/js/main-sw.js L206-L328](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L206-L328)

 [docs/js/main-sw.js L330-L368](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L330-L368)

## Service Worker Caching Implementation

The asset management system is built around a Service Worker that implements a comprehensive caching strategy for offline capability and performance optimization.

```mermaid
flowchart TD

SW["main-sw.js"]
CACHE_NAME["staticOrinAyo: 'orinayo-v4'"]
ASSETS_ARRAY["assets[]"]
HTML_ASSETS["HTML/CSS/JS Files"]
AUDIO_ASSETS["Audio Loop Files"]
SF2_ASSETS["SoundFont Files"]
INSTALL_HANDLER["addEventListener('install')"]
FETCH_HANDLER["addEventListener('fetch')"]
ACTIVATE_HANDLER["addEventListener('activate')"]
CACHE_ADD_ALL["cache.addAll(assets)"]
CACHE_MATCH["caches.match(request)"]
CACHE_DELETE["caches.delete(oldCache)"]
CACHE_FIRST["Cache First Strategy"]
CACHE_HIT["Return Cached Response"]
CACHE_MISS["Fetch from Network"]
CACHE_PUT["cache.put(request, response)"]
PROTOCOL_CHECK["location.protocol != 'chrome-extension:'"]
ENABLE_CACHING["Enable Caching"]
BYPASS_CACHING["Bypass for Extensions"]

FETCH_HANDLER --> CACHE_FIRST
SW --> PROTOCOL_CHECK

subgraph subGraph2 ["Protocol Detection"]
    PROTOCOL_CHECK
    ENABLE_CACHING
    BYPASS_CACHING
    PROTOCOL_CHECK --> ENABLE_CACHING
    PROTOCOL_CHECK --> BYPASS_CACHING
end

subgraph subGraph1 ["Caching Strategy"]
    CACHE_FIRST
    CACHE_HIT
    CACHE_MISS
    CACHE_PUT
    CACHE_FIRST --> CACHE_HIT
    CACHE_FIRST --> CACHE_MISS
    CACHE_MISS --> CACHE_PUT
end

subgraph subGraph0 ["Service Worker Asset Management"]
    SW
    CACHE_NAME
    ASSETS_ARRAY
    HTML_ASSETS
    AUDIO_ASSETS
    SF2_ASSETS
    INSTALL_HANDLER
    FETCH_HANDLER
    ACTIVATE_HANDLER
    CACHE_ADD_ALL
    CACHE_MATCH
    CACHE_DELETE
    SW --> CACHE_NAME
    SW --> ASSETS_ARRAY
    ASSETS_ARRAY --> HTML_ASSETS
    ASSETS_ARRAY --> AUDIO_ASSETS
    ASSETS_ARRAY --> SF2_ASSETS
    SW --> INSTALL_HANDLER
    SW --> FETCH_HANDLER
    SW --> ACTIVATE_HANDLER
    INSTALL_HANDLER --> CACHE_ADD_ALL
    FETCH_HANDLER --> CACHE_MATCH
    ACTIVATE_HANDLER --> CACHE_DELETE
end
```

Sources: [docs/js/main-sw.js L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L1)

 [docs/js/main-sw.js L371-L383](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L371-L383)

 [docs/js/main-sw.js L385-L406](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L385-L406)

 [docs/js/main-sw.js L408-L426](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L408-L426)

 [docs/js/main-sw.js L374](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L374-L374)

 [docs/js/main-sw.js L388](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L388-L388)

## Audio Asset Categories

The system manages three primary categories of audio assets, each serving specific roles in music production.

### Bass Assets

Bass loops provide rhythmic and harmonic foundation across various musical styles:

| Style Category | Example Files | BPM Range | Characteristics |
| --- | --- | --- | --- |
| Acoustic | `acoustic-guitar_75_25600.bass` | 60-145 | Natural guitar tones |
| Electronic | `disco-pop_116_8276_2.bass` | 100-130 | Synthesized bass lines |
| Genre-Specific | `blues_75_25600.bass`, `funk_130_14769.bass` | 75-180 | Style-characteristic patterns |

### Chord Assets

Chord progressions and harmonic accompaniment patterns:

| Pattern Type | Example Files | Variations | Usage |
| --- | --- | --- | --- |
| Strumming | `acoustic-strum_145_3310_3310_2.chord` | 2-4 | Rhythmic chord patterns |
| Arpeggiated | `beat-arp_118_16271.chord` | 1-2 | Broken chord sequences |
| Genre-Specific | `afro-pop_111_8649_8649_4.chord` | 2-8 | Cultural/style patterns |

### Drum Assets

Percussion patterns and rhythmic foundations:

| Drum Pattern | Example Files | Complexity | Instruments |
| --- | --- | --- | --- |
| Basic Beats | `8beat_100_2400_9600_2400_2400_4800.drum` | Simple | Kick, Snare, Hi-hat |
| Complex Patterns | `afro-juju_125_1920_7680_1920_1920_1920.drum` | Advanced | Full percussion kit |
| Fill Variations | `rock_120_2000_16000_2000_2000_8000.drum` | Variable | Dynamic transitions |

Sources: [docs/js/main-sw.js L46-L76](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L46-L76)

 [docs/js/main-sw.js L78-L204](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L78-L204)

 [docs/js/main-sw.js L206-L328](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L206-L328)

## SoundFont Integration

The asset management system includes JavaScript-embedded SoundFont files for realistic instrument synthesis.

```mermaid
flowchart TD

SF2_FILES["SoundFont Assets"]
ELECTRIC_GUITAR["0270_EGuitar_FSBS_SF2_file.js"]
ACOUSTIC_GUITAR["0250_RG_Acoustic_SF2_file.js"]
ASPIRIN_SYNTH["0250_Aspirin_sf2_file.js"]
CHAOS_SYNTH["0250_Chaos_sf2_file.js"]
ACOUSTIC_STEEL["0250_LK_AcousticSteel_SF2_file.js"]
JCLIVE_260["0260_JCLive_sf2_file.js"]
ASPIRIN_270["0270_Aspirin_sf2_file.js"]
JCLIVE_280["0280_JCLive_sf2_file.js"]
ACOUSTIC_253["0253_Acoustic_Guitar_sf2_file.js"]
ASPIRIN_341["0341_Aspirin_sf2_file.js"]
GUITAR_CATEGORY["Guitar Instruments"]
SYNTH_CATEGORY["Synthesizer Sounds"]
LIVE_CATEGORY["Live Performance"]

ELECTRIC_GUITAR --> GUITAR_CATEGORY
ACOUSTIC_GUITAR --> GUITAR_CATEGORY
ACOUSTIC_STEEL --> GUITAR_CATEGORY
ACOUSTIC_253 --> GUITAR_CATEGORY
ASPIRIN_SYNTH --> SYNTH_CATEGORY
CHAOS_SYNTH --> SYNTH_CATEGORY
ASPIRIN_270 --> SYNTH_CATEGORY
ASPIRIN_341 --> SYNTH_CATEGORY
JCLIVE_260 --> LIVE_CATEGORY
JCLIVE_280 --> LIVE_CATEGORY

subgraph subGraph1 ["SoundFont Categories"]
    GUITAR_CATEGORY
    SYNTH_CATEGORY
    LIVE_CATEGORY
end

subgraph subGraph0 ["SoundFont Asset Management"]
    SF2_FILES
    ELECTRIC_GUITAR
    ACOUSTIC_GUITAR
    ASPIRIN_SYNTH
    CHAOS_SYNTH
    ACOUSTIC_STEEL
    JCLIVE_260
    ASPIRIN_270
    JCLIVE_280
    ACOUSTIC_253
    ASPIRIN_341
    SF2_FILES --> ELECTRIC_GUITAR
    SF2_FILES --> ACOUSTIC_GUITAR
    SF2_FILES --> ASPIRIN_SYNTH
    SF2_FILES --> CHAOS_SYNTH
    SF2_FILES --> ACOUSTIC_STEEL
    SF2_FILES --> JCLIVE_260
    SF2_FILES --> ASPIRIN_270
    SF2_FILES --> JCLIVE_280
    SF2_FILES --> ACOUSTIC_253
    SF2_FILES --> ASPIRIN_341
end
```

Sources: [docs/js/main-sw.js L12-L21](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L12-L21)

## Loading Strategies and Performance

The asset management system implements multiple loading strategies optimized for different deployment scenarios.

### Cache-First Strategy

```mermaid
sequenceDiagram
  participant Application
  participant Service Worker
  participant Asset Cache
  participant Network

  Application->>Service Worker: Request Asset
  Service Worker->>Asset Cache: Check Cache
  loop [Cache Hit]
    Asset Cache-->>Service Worker: Return Cached Asset
    Service Worker-->>Application: Serve from Cache
    Service Worker->>Network: Fetch from Network
    Network-->>Service Worker: Asset Response
    Service Worker->>Asset Cache: Store in Cache
    Service Worker-->>Application: Serve Fresh Asset
  end
```

### Protocol-Aware Caching

The system detects the deployment context and adapts caching behavior:

| Protocol | Caching Behavior | Reason |
| --- | --- | --- |
| `https:` | Full caching enabled | Standard web deployment |
| `http:` | Full caching enabled | Development/local deployment |
| `chrome-extension:` | Caching bypassed | Extension security model |

Sources: [docs/js/main-sw.js L374](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L374-L374)

 [docs/js/main-sw.js L388](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L388-L388)

 [docs/js/main-sw.js L411](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L411-L411)

## Asset File Formats

All audio assets are stored as OGG Vorbis compressed files with specific naming conventions that encode metadata directly in filenames.

### Filename Encoding Pattern

```
{style}_{bpm}_{duration}[_{loop_length}][_{variations}].{type}
```

**Components:**

* `style`: Musical genre or pattern name (e.g., "acoustic-guitar", "afro-pop")
* `bpm`: Beats per minute tempo
* `duration`: Total duration in samples
* `loop_length`: (Optional) Loop segment length in samples
* `variations`: (Optional) Number of pattern variations
* `type`: Asset category (`bass`, `chord`, `drum`)

### Example Decodings:

* `acoustic-guitar_75_25600.bass` → Acoustic guitar bass at 75 BPM, 25,600 samples duration
* `funky-pop_105_9143_9143_2.chord` → Funky pop chords at 105 BPM, 9,143 samples total/loop, 2 variations
* `rock_120_8000_2000_2000_4000.drum` → Rock drums at 120 BPM with complex timing structure

Sources: [docs/extra/assets/bass/slow-blues_60_32000.bass L1-L10](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-blues_60_32000.bass#L1-L10)

 [docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord L1-L10](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord#L1-L10)

 [docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord L1-L10](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord#L1-L10)

## Cache Management and Versioning

The system implements automatic cache versioning and cleanup to ensure users receive updated assets.

```mermaid
flowchart TD

INSTALL["Service Worker Install"]
CACHE_CREATE["Create Cache: 'orinayo-v4'"]
PRECACHE["Pre-cache All Assets"]
ACTIVATE["Service Worker Activate"]
GET_CACHES["caches.keys()"]
CHECK_VERSION["Compare Cache Names"]
DELETE_OLD["Delete Old Caches"]
UPDATE["Asset Update"]
VERSION_BUMP["Increment Cache Version"]
NEW_INSTALL["Trigger New Install"]
OFFLINE["Offline Capability"]
PERFORMANCE["Fast Asset Loading"]
STORAGE["Storage Optimization"]
CONSISTENCY["Version Consistency"]

PRECACHE --> OFFLINE
PRECACHE --> PERFORMANCE
DELETE_OLD --> STORAGE
VERSION_BUMP --> CONSISTENCY

subgraph subGraph1 ["Cache Strategy Benefits"]
    OFFLINE
    PERFORMANCE
    STORAGE
    CONSISTENCY
end

subgraph subGraph0 ["Cache Lifecycle Management"]
    INSTALL
    CACHE_CREATE
    PRECACHE
    ACTIVATE
    GET_CACHES
    CHECK_VERSION
    DELETE_OLD
    UPDATE
    VERSION_BUMP
    NEW_INSTALL
    INSTALL --> CACHE_CREATE
    CACHE_CREATE --> PRECACHE
    ACTIVATE --> GET_CACHES
    GET_CACHES --> CHECK_VERSION
    CHECK_VERSION --> DELETE_OLD
    UPDATE --> VERSION_BUMP
    VERSION_BUMP --> NEW_INSTALL
end
```

The current cache version is `orinayo-v4`, indicating the fourth major iteration of the asset caching system.

Sources: [docs/js/main-sw.js L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L1)

 [docs/js/main-sw.js L413-L425](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L413-L425)

 [docs/js/main-sw.js L377-L381](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L377-L381)