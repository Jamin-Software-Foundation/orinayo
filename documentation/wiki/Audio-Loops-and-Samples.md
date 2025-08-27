# Audio Loops and Samples

> **Relevant source files**
> * [docs/assets/bass/desert-pop_97_19794.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/bass/desert-pop_97_19794.bass)
> * [docs/assets/bass/funky-pop_105_9143.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/bass/funky-pop_105_9143.bass)
> * [docs/assets/chords/acoustic-strum_90_5333.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/chords/acoustic-strum_90_5333.chord)
> * [docs/assets/chords/desert-pop_97_19794_19794_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/chords/desert-pop_97_19794_19794_2.chord)
> * [docs/assets/chords/funky-pop_105_9143_9143_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/chords/funky-pop_105_9143_9143_2.chord)
> * [docs/assets/drums/desert-pop_97_4948_19794_2474_2474_9897.drum](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/drums/desert-pop_97_4948_19794_2474_2474_9897.drum)
> * [docs/extra/assets/bass/brit-rock_80_24000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/brit-rock_80_24000.bass)
> * [docs/extra/assets/bass/disco-rock_120_16000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/disco-rock_120_16000.bass)
> * [docs/extra/assets/bass/rock-ballad_70_27429.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/rock-ballad_70_27429.bass)
> * [docs/extra/assets/bass/slow-pop_75_25600.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-pop_75_25600.bass)
> * [docs/extra/assets/bass/slow-rock_80_12000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-rock_80_12000.bass)
> * [docs/extra/assets/chords/brit-rock_80_24000_24000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/brit-rock_80_24000_24000_2.chord)
> * [docs/extra/assets/chords/disco-rock_120_16000_16000_4.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/disco-rock_120_16000_16000_4.chord)
> * [docs/extra/assets/chords/rock-ballad_70_27429_27429_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/rock-ballad_70_27429_27429_2.chord)
> * [docs/extra/assets/chords/slow-pop_75_25600_25600_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/slow-pop_75_25600_25600_2.chord)

This document covers OrinAyo's musical asset library structure, including the organization, naming conventions, and technical specifications of bass, chord, and drum loops used throughout the application. These pre-recorded audio samples provide the foundational musical elements for live music production and backing tracks.

For information about SoundFont synthesis and instrument definitions, see [SoundFont Files](/Jus-Be/orinayo/7.2-soundfont-files). For details about audio processing and playback, see [Audio Processing Pipeline](/Jus-Be/orinayo/3.2-audio-processing-pipeline).

## Asset Organization Structure

OrinAyo's audio loops are organized in a hierarchical directory structure that separates assets by location and type:

```mermaid
flowchart TD

root["docs/"]
assets["assets/"]
extra["extra/"]
assets_bass["bass/"]
assets_chords["chords/"]
assets_drums["drums/"]
extra_assets["assets/"]
extra_bass["bass/"]
extra_chords["chords/"]
extra_drums["drums/"]
sample1["funky-pop_105_9143.bass"]
sample2["funky-pop_105_9143_9143_2.chord"]
sample3["brit-rock_80_24000.bass"]
sample4["disco-rock_120_16000.bass"]
sample5["brit-rock_80_24000_24000_2.chord"]

root --> assets
root --> extra
assets --> assets_bass
assets --> assets_chords
assets --> assets_drums
extra --> extra_assets
extra_assets --> extra_bass
extra_assets --> extra_chords
extra_assets --> extra_drums
assets_bass --> sample1
assets_chords --> sample2
extra_bass --> sample3
extra_bass --> sample4
extra_chords --> sample5
```

**Asset Directory Structure**

| Directory Path | Purpose | Content Type |
| --- | --- | --- |
| `docs/assets/bass/` | Core bass loop samples | Low-frequency rhythm tracks |
| `docs/assets/chords/` | Core chord progression loops | Harmonic backing tracks |
| `docs/assets/drums/` | Core drum pattern loops | Percussion and rhythm sections |
| `docs/extra/assets/bass/` | Extended bass loop library | Additional bass variations |
| `docs/extra/assets/chords/` | Extended chord progression library | Additional harmonic content |
| `docs/extra/assets/drums/` | Extended drum pattern library | Additional percussion patterns |

Sources: File paths observed in provided file listing

## File Naming Convention

Audio loop files follow a standardized naming pattern that encodes musical and technical metadata:

```mermaid
flowchart TD

filename["brit-rock_80_24000_24000_2.chord"]
genre["brit-rock"]
tempo["80"]
duration1["24000"]
duration2["24000"]
variant["2"]
extension[".chord"]
genre_desc["Musical genre/style"]
tempo_desc["BPM (beats per minute)"]
duration1_desc["Sample length in samples"]
duration2_desc["Loop point (optional)"]
variant_desc["Variation number"]
ext_desc["Instrument type"]

filename --> genre
filename --> tempo
filename --> duration1
filename --> duration2
filename --> variant
filename --> extension
genre --> genre_desc
tempo --> tempo_desc
duration1 --> duration1_desc
duration2 --> duration2_desc
variant --> variant_desc
extension --> ext_desc
```

**Naming Pattern Components**

| Component | Example | Description |
| --- | --- | --- |
| Genre | `funky-pop`, `brit-rock`, `disco-rock`, `slow-rock` | Musical style identifier |
| Tempo | `75`, `80`, `105`, `120` | Beats per minute |
| Duration | `9143`, `12000`, `16000`, `24000`, `25600` | Sample length or timing info |
| Loop Point | `9143`, `24000`, `25600` | Loop repetition point (when present) |
| Variation | `2`, `4` | Different versions of same pattern |
| Extension | `.bass`, `.chord`, `.drum` | Instrument type |

Sources: [docs/assets/chords/funky-pop_105_9143_9143_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/chords/funky-pop_105_9143_9143_2.chord)

 [docs/assets/bass/funky-pop_105_9143.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/bass/funky-pop_105_9143.bass)

 [docs/extra/assets/chords/brit-rock_80_24000_24000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/brit-rock_80_24000_24000_2.chord)

 [docs/extra/assets/bass/disco-rock_120_16000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/disco-rock_120_16000.bass)

## Audio Format and Technical Specifications

All audio loops are stored in OGG Vorbis format, providing efficient compression while maintaining audio quality suitable for music production:

```mermaid
flowchart TD

oggfile["OGG Vorbis File"]
header["Vorbis Header"]
metadata["Metadata"]
audiodata["Compressed Audio Data"]
version["libVorbis I 20200704"]
encoder["Lavc58.91.100 libvorbis"]
channels["Stereo/Mono Configuration"]
samplerate["Sample Rate"]
bitrate["Variable Bitrate"]
packets["Vorbis Packets"]
pages["OGG Pages"]

oggfile --> header
oggfile --> metadata
oggfile --> audiodata
header --> version
header --> encoder
metadata --> channels
metadata --> samplerate
metadata --> bitrate
audiodata --> packets
audiodata --> pages
```

**Technical Specifications**

| Property | Value | Description |
| --- | --- | --- |
| Container Format | OGG | Xiph.Org container format |
| Audio Codec | Vorbis | Open source lossy audio compression |
| Encoder | libVorbis I 20200704 | Encoder version from headers |
| Transcoder | Lavc58.91.100 | FFmpeg's libvorbis implementation |
| File Header | `OggS` | OGG stream identifier |
| Quality | Variable bitrate | Optimized for music content |

Sources: [docs/assets/chords/funky-pop_105_9143_9143_2.chord L1-L20](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/chords/funky-pop_105_9143_9143_2.chord#L1-L20)

 [docs/extra/assets/bass/slow-pop_75_25600.bass L1-L20](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-pop_75_25600.bass#L1-L20)

## Asset Categories and Musical Content

The loop library spans multiple musical genres and tempos, organized into three primary instrument categories:

```mermaid
flowchart TD

library["Audio Loop Library"]
bass_category["Bass Loops"]
chord_category["Chord Loops"]
drum_category["Drum Loops"]
bass_genres["Genres"]
funky_bass["funky-pop (105 BPM)"]
brit_bass["brit-rock (80 BPM)"]
disco_bass["disco-rock (120 BPM)"]
slow_bass["slow-pop (75 BPM)"]
rock_bass["slow-rock (80 BPM)"]
chord_genres["Genres"]
funky_chord["funky-pop (105 BPM)"]
brit_chord["brit-rock (80 BPM)"]
disco_chord["disco-rock (120 BPM)"]
slow_chord["slow-pop (75 BPM)"]
drum_note["Available in same genres"]

library --> bass_category
library --> chord_category
library --> drum_category
bass_category --> bass_genres
bass_genres --> funky_bass
bass_genres --> brit_bass
bass_genres --> disco_bass
bass_genres --> slow_bass
bass_genres --> rock_bass
chord_category --> chord_genres
chord_genres --> funky_chord
chord_genres --> brit_chord
chord_genres --> disco_chord
chord_genres --> slow_chord
drum_category --> drum_note
```

**Genre and Tempo Distribution**

| Genre | Tempo (BPM) | Bass Loops | Chord Loops | Typical Use Case |
| --- | --- | --- | --- | --- |
| `funky-pop` | 105 | ✓ | ✓ | Moderate tempo funk and pop |
| `brit-rock` | 80 | ✓ | ✓ | Classic rock and alternative |
| `disco-rock` | 120 | ✓ | ✓ | High-energy dance and rock |
| `slow-pop` | 75 | ✓ | ✓ | Ballads and slow songs |
| `slow-rock` | 80 | ✓ | - | Rock ballads |

Sources: File names pattern analysis across [docs/assets/](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/assets/)

 and [docs/extra/assets/](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/)

 directories

## Integration with Audio System

Audio loops integrate with OrinAyo's WebAudio-based audio processing pipeline through the AudioLooper engine:

```mermaid
flowchart TD

assetfiles["Audio Loop Files (.bass, .chord, .drum)"]
service_worker["Service Worker Cache"]
audio_looper["AudioLooper Engine"]
webaudio["WebAudio API"]
audio_context["AudioContext"]
audio_buffer["AudioBuffer"]
audio_nodes["Audio Nodes"]
gain_node["GainNode"]
filter_node["BiquadFilterNode"]
destination["AudioDestinationNode"]
user_input["User Input Controllers"]
midi_input["MIDI Controllers"]

assetfiles --> service_worker
service_worker --> audio_looper
audio_looper --> webaudio
audio_looper --> audio_context
audio_looper --> audio_buffer
audio_buffer --> audio_nodes
audio_nodes --> gain_node
audio_nodes --> filter_node
audio_nodes --> destination
user_input --> audio_looper
midi_input --> audio_looper
```

**Loading and Playback Chain**

1. **Asset Discovery**: Files are catalogued by the service worker for offline availability
2. **AudioLooper Integration**: The `audio_looper.js` engine manages loop playback and synchronization
3. **WebAudio Processing**: Loops are decoded into AudioBuffers for real-time manipulation
4. **User Control**: Input controllers trigger and modify loop playback parameters

Sources: High-level architecture diagrams showing AudioLooper Engine and WebAudio Loops integration

## Cache Management and Performance

Audio loops are managed through OrinAyo's service worker caching system to ensure responsive performance and offline capability:

```mermaid
flowchart TD

sw["main-sw.js"]
cache["orinayo-v4 Cache"]
static_assets["Static Assets"]
bass_cache["Bass Loops Cache"]
chord_cache["Chord Loops Cache"]
drum_cache["Drum Loops Cache"]
fetch_handler["SW Fetch Handler"]
cache_first["Cache-First Strategy"]
network_fallback["Network Fallback"]
preload["Pre-cache on Install"]
audio_looper_access["AudioLooper Access"]

sw --> cache
cache --> static_assets
static_assets --> bass_cache
static_assets --> chord_cache
static_assets --> drum_cache
fetch_handler --> cache_first
cache_first --> network_fallback
preload --> cache
cache --> audio_looper_access
```

**Caching Strategy**

| Strategy Component | Implementation | Purpose |
| --- | --- | --- |
| Pre-cache | Install-time asset loading | Immediate availability |
| Cache-first | Prioritize cached versions | Fast load times |
| Network fallback | Fetch if cache miss | Content availability |
| Version control | `orinayo-v4` cache key | Asset management |

Sources: Service worker and caching system architecture from high-level diagrams