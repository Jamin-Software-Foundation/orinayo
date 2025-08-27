# Platform Support

> **Relevant source files**
> * [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)
> * [docs/extra/assets/bass/slow-blues_60_32000.bass](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/bass/slow-blues_60_32000.bass)
> * [docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/blues-slow_60_32000_32000_2.chord)
> * [docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/extra/assets/chords/slow-blues_60_32000_32000_2.chord)
> * [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)
> * [docs/js/audio_looper.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js)
> * [docs/js/background.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js)
> * [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)
> * [docs/js/main-sw.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js)
> * [docs/js/styles.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/styles.js)
> * [docs/manifest.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json)
> * [docs/settings/options.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/settings/options.js)

This document covers OrinAyo's multi-platform deployment architecture, including Progressive Web App (PWA), Chrome browser extension, and direct web access implementations. The platform support enables OrinAyo to run across different environments while maintaining consistent functionality.

For information about the core application engine that runs across these platforms, see [Application Engine](/Jus-Be/orinayo/3.1-application-engine). For details about asset management and caching strategies, see [Service Worker & Caching](/Jus-Be/orinayo/6.3-service-worker-and-caching).

## Multi-Platform Architecture Overview

OrinAyo supports multiple deployment platforms through a unified codebase that adapts to different runtime environments. The application core remains consistent across platforms while platform-specific wrappers handle environment differences.

**Multi-Platform Deployment Architecture**

```

```

Sources: [docs/index.html L16](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L16-L16)

 [docs/manifest.json L1-L30](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json#L1-L30)

 [docs/js/main-sw.js L1-L10](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L10)

 [docs/js/background.js L34](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L34-L34)

## Platform Detection and Adaptation

The application implements platform detection to adapt behavior based on the runtime environment. This detection primarily occurs in the background service worker and main application.

**Platform Detection Logic**

```

```

Sources: [docs/js/background.js L34](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L34-L34)

 [docs/js/main-sw.js L1-L2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L2)

## Chrome Extension Implementation

The Chrome extension provides OrinAyo as a standalone browser extension with dedicated window management and enhanced permissions.

### Extension Manifest Configuration

The extension uses Manifest V3 with specific permissions for audio processing and storage:

| Property | Value | Purpose |
| --- | --- | --- |
| `manifest_version` | 3 | Modern extension API |
| `name` | "OrinAyo" | Extension identity |
| `version` | "0.9.24" | Current release |
| `service_worker` | `./js/background.js` | Background processor |
| `permissions` | `["background", "storage", "unlimitedStorage"]` | Required access |

Sources: [docs/manifest.json L1-L15](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json#L1-L15)

### Background Service Worker

The extension background worker handles window lifecycle management and Chrome API integration:

**Extension Background Architecture**

```

```

Sources: [docs/js/background.js L36-L125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L36-L125)

The background service worker implements key functions:

* `createOrinAyoWindow()`: Creates new extension popup window [docs/js/background.js L88-L97](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L88-L97)
* `openOrinAyoWindow()`: Manages existing window focus or creates new [docs/js/background.js L99-L125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L99-L125)
* Window state persistence using `chrome.storage.local` [docs/js/background.js L74-L78](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L74-L78)

Sources: [docs/js/background.js L88-L125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L88-L125)

## Service Worker Asset Caching

The service worker implements comprehensive asset caching for offline functionality and improved performance.

### Cache Strategy Implementation

The service worker uses a cache-first strategy with the cache name `orinayo-v4`:

**Service Worker Caching Architecture**

```

```

Sources: [docs/js/main-sw.js L1-L2](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L2)

 [docs/js/main-sw.js L3-L44](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L3-L44)

### Cached Asset Categories

The service worker pre-caches multiple asset categories for offline functionality:

1. **Core Application Files**: HTML, JavaScript libraries, and CSS [docs/js/main-sw.js L4-L44](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L4-L44)
2. **Audio Loop Assets**: Bass loops, chord progressions, drum patterns [docs/js/main-sw.js L46-L76](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L46-L76)
3. **Chord Progressions**: Musical chord loop files [docs/js/main-sw.js L78-L204](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L78-L204)
4. **Drum Patterns**: Rhythm and percussion loops [docs/js/main-sw.js L206-L416](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L206-L416)

The comprehensive asset list ensures full offline functionality for music production.

Sources: [docs/js/main-sw.js L3-L416](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L3-L416)

## Progressive Web App Features

The PWA implementation provides installation capabilities and enhanced web app features through the web manifest configuration.

### PWA Configuration

The PWA manifest enables installation and provides app metadata:

**PWA Feature Integration**

```

```

Sources: [docs/index.html L16](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L16-L16)

 [docs/js/main-sw.js L1-L10](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L10)

The PWA implementation provides:

* Installable web application experience
* Offline music production capabilities through comprehensive asset caching
* Native app-like behavior when installed
* Integration with device home screens and app launchers

Sources: [docs/index.html L16](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L16-L16)

 [docs/js/main-sw.js L1-L416](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/main-sw.js#L1-L416)

## Desktop Application Support

While the provided files focus on web-based platforms, the architecture supports desktop deployment through WebView2 wrapper technology, enabling OrinAyo to run as a native desktop application while maintaining web technology compatibility.

Sources: [docs/js/index.js L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L1-L1)

 [docs/index.html L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html#L1-L1)