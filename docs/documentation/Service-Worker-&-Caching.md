# Service Worker & Caching

> **Relevant source files**
> * [docs/extra/assets/bass/slow-blues_60_32000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-blues_60_32000.bass)
> * [docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord)
> * [docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord)
> * [docs/js/main-sw.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js)

This document covers OrinAyo's service worker implementation and caching strategy, which provides offline capabilities and performance optimization for the Progressive Web App. The service worker manages static asset caching, implements cache-first networking strategies, and handles cache lifecycle management.

For information about the broader PWA configuration, see [Progressive Web App](/Jus-Be/orinayo/6.1-progressive-web-app). For details about Chrome extension integration, see [Chrome Extension](/Jus-Be/orinayo/6.2-chrome-extension).

## Service Worker Architecture

The OrinAyo service worker is implemented in `main-sw.js` and provides comprehensive offline support through strategic asset caching. The service worker operates independently of the main application thread and intercepts network requests to serve cached content when available.

### Core Components

```mermaid
flowchart TD

SW["main-sw Service Worker"]
CACHE_NAME["staticOrinAyo cache (v4)"]
ASSETS["assets[] array"]
INSTALL["install event handler"]
FETCH["fetch event handler"]
ACTIVATE["activate event handler"]
HTML["HTML Files<br>index.html"]
CSS["CSS Files<br>bootstrap.css, main.css"]
JS["JavaScript Libraries<br>converse.js, sf2 files"]
AUDIO["Audio Assets<br>bass, chord, drum loops"]
CACHE_FIRST["Cache-First Strategy"]
NETWORK_FALLBACK["Network Fallback"]
PROTOCOL_CHECK["Protocol Detection<br>chrome-extension bypass"]

ASSETS --> HTML
ASSETS --> CSS
ASSETS --> JS
ASSETS --> AUDIO
FETCH --> CACHE_FIRST
FETCH --> PROTOCOL_CHECK

subgraph subGraph2 ["Caching Strategy"]
    CACHE_FIRST
    NETWORK_FALLBACK
    PROTOCOL_CHECK
    CACHE_FIRST --> NETWORK_FALLBACK
end

subgraph subGraph1 ["Cached Asset Categories"]
    HTML
    CSS
    JS
    AUDIO
end

subgraph subGraph0 ["Service Worker (main-sw.js)"]
    SW
    CACHE_NAME
    ASSETS
    INSTALL
    FETCH
    ACTIVATE
    SW --> CACHE_NAME
    SW --> ASSETS
    SW --> INSTALL
    SW --> FETCH
    SW --> ACTIVATE
end
```

**Sources:** [docs/js/main-sw.js L1-L427](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L427)

### Cache Version Management

The service worker uses versioned caching with the identifier `staticOrinAyo` set to version `"orinayo-v4"`. This versioning strategy allows for controlled cache updates and cleanup of outdated cache entries.

| Component | Purpose | Implementation |
| --- | --- | --- |
| `staticOrinAyo` | Cache version identifier | [docs/js/main-sw.js L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L1) |
| `assets[]` array | Comprehensive asset list | [docs/js/main-sw.js L2-L369](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L2-L369) |
| Protocol detection | Chrome extension bypass | [docs/js/main-sw.js L374-L382](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L374-L382) |

**Sources:** [docs/js/main-sw.js L1-L427](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L427)

## Asset Management Strategy

The service worker manages four primary categories of assets through a comprehensive pre-caching strategy:

### Asset Categories

```mermaid
flowchart TD

HTML_ASSETS["HTML Assets<br>/orinayo/index.html"]
CSS_ASSETS["CSS Assets<br>/orinayo/css/bootstrap.css<br>/orinayo/dist/converse.min.css<br>/orinayo/css/synth.css<br>/orinayo/css/main.css<br>/orinayo/assets/style.css"]
JS_ASSETS["JavaScript Assets<br>SF2 files (0270_*, 0250_*)<br>converse.js, pedalboard.js<br>webaudio-font-player.js<br>audio_looper.js, index.js"]
AUDIO_ASSETS["Audio Loop Assets<br>Bass loops (.bass files)<br>Chord loops (.chord files)<br>Drum loops (.drum files)"]
MAIN_PATH["/orinayo/assets/"]
EXTRA_PATH["/orinayo/extra/assets/"]
JS_PATH["/orinayo/js/"]
CSS_PATH["/orinayo/css/"]

HTML_ASSETS --> MAIN_PATH
CSS_ASSETS --> CSS_PATH
JS_ASSETS --> JS_PATH
AUDIO_ASSETS --> MAIN_PATH
AUDIO_ASSETS --> EXTRA_PATH

subgraph subGraph1 ["Asset Paths"]
    MAIN_PATH
    EXTRA_PATH
    JS_PATH
    CSS_PATH
end

subgraph subGraph0 ["Static Assets (main-sw.js assets array)"]
    HTML_ASSETS
    CSS_ASSETS
    JS_ASSETS
    AUDIO_ASSETS
end
```

**Sources:** [docs/js/main-sw.js L2-L369](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L2-L369)

### Audio Asset Organization

The service worker caches an extensive collection of audio loops organized by type:

| Asset Type | File Extension | Path Structure | Count |
| --- | --- | --- | --- |
| Bass Loops | `.bass` | `/orinayo/assets/bass/` | 30+ files |
| Chord Loops | `.chord` | `/orinayo/assets/chords/` | 150+ files |
| Drum Loops | `.drum` | `/orinayo/assets/drums/` | 120+ files |
| Extended Assets | Various | `/orinayo/extra/assets/` | Additional loops |

**Sources:** [docs/js/main-sw.js L46-L368](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L46-L368)

## Caching Strategy Implementation

### Install Event Handler

The service worker implements aggressive pre-caching during installation, ensuring all critical assets are available offline immediately after installation:

```mermaid
sequenceDiagram
  participant Browser
  participant main-sw.js
  participant Cache API

  Browser->>main-sw.js: install event
  main-sw.js->>main-sw.js: Check location.protocol
  loop [protocol != "chrome-extension:"]
    main-sw.js->>Cache API: caches.open("orinayo-v4")
    main-sw.js->>Cache API: cache.addAll(assets[])
    note over main-sw.js,Cache API: Pre-cache all 350+ assets
    Cache API-->>main-sw.js: Cache populated
    note over main-sw.js: Skip caching (extension mode)
  end
  main-sw.js-->>Browser: Installation complete
```

**Sources:** [docs/js/main-sw.js L371-L383](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L371-L383)

### Fetch Event Handler

The fetch event implements a cache-first strategy with intelligent network fallback:

```mermaid
flowchart TD

START["Fetch Request"]
PROTOCOL_CHECK["Protocol Check<br>chrome-extension:?"]
CACHE_MATCH["Check Cache<br>caches.match(request)"]
CACHE_HIT["Cache Hit?"]
SERVE_CACHE["Return Cached Response"]
NETWORK_FETCH["Fetch from Network"]
CACHE_UPDATE["Update Cache<br>cache.put(request, response)"]
SERVE_NETWORK["Return Network Response"]

START --> PROTOCOL_CHECK
PROTOCOL_CHECK --> SERVE_NETWORK
PROTOCOL_CHECK --> CACHE_MATCH
CACHE_MATCH --> CACHE_HIT
CACHE_HIT --> SERVE_CACHE
CACHE_HIT --> NETWORK_FETCH
NETWORK_FETCH --> CACHE_UPDATE
CACHE_UPDATE --> SERVE_NETWORK
```

**Sources:** [docs/js/main-sw.js L385-L406](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L385-L406)

### Activate Event Handler

The activate event manages cache cleanup and version management:

| Operation | Purpose | Implementation |
| --- | --- | --- |
| Cache enumeration | List all cache names | `caches.keys()` |
| Version comparison | Identify outdated caches | Compare against `staticOrinAyo` |
| Cache deletion | Remove old cache versions | `caches.delete(key)` |
| Protocol bypass | Skip cleanup for extensions | [docs/js/main-sw.js L411-L425](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L411-L425) |

**Sources:** [docs/js/main-sw.js L408-L426](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L408-L426)

## Platform Integration

### Chrome Extension Compatibility

The service worker includes specific logic to handle Chrome extension environments where traditional caching may not be appropriate or necessary:

```mermaid
flowchart TD

REQUEST["Network Request"]
PROTOCOL_CHECK["location.protocol<br>== 'chrome-extension:'?"]
SW_BYPASS["Bypass Service Worker<br>Direct Network"]
SW_CACHE["Service Worker<br>Cache Strategy"]

REQUEST --> PROTOCOL_CHECK
PROTOCOL_CHECK --> SW_BYPASS
PROTOCOL_CHECK --> SW_CACHE
```

This design ensures the service worker operates correctly across different deployment contexts including web browsers, PWA installations, and Chrome extension environments.

**Sources:** [docs/js/main-sw.js L374-L425](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L374-L425)

## Cache Lifecycle Management

The service worker implements a complete cache lifecycle with proper cleanup and versioning:

### Cache Operations

| Event | Action | Files Affected | Purpose |
| --- | --- | --- | --- |
| Install | Pre-cache assets | All 350+ assets | Offline availability |
| Fetch | Cache-first lookup | Requested resources | Performance optimization |
| Fetch miss | Network + cache update | New resources | Dynamic caching |
| Activate | Old cache cleanup | Previous versions | Storage management |

**Sources:** [docs/js/main-sw.js L371-L426](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L371-L426)

### Performance Optimization

The caching strategy optimizes performance through:

* **Pre-caching**: Critical assets cached during installation
* **Cache-first serving**: Immediate response for cached assets
* **Dynamic caching**: New resources automatically cached after first fetch
* **Version-based cleanup**: Prevents cache bloat from outdated assets

This comprehensive caching approach ensures OrinAyo functions reliably offline while maintaining optimal performance characteristics for audio-intensive applications.

**Sources:** [docs/js/main-sw.js L1-L427](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L427)