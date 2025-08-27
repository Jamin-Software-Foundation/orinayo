# Chrome Extension

> **Relevant source files**
> * [docs/css/main.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/css/main.css)
> * [docs/index.html](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/index.html)
> * [docs/js/audio_looper.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/audio_looper.js)
> * [docs/js/background.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js)
> * [docs/js/index.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js)
> * [docs/js/styles.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/styles.js)
> * [docs/manifest.json](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json)
> * [docs/settings/options.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/settings/options.js)

This document covers OrinAyo's Chrome extension implementation, which provides a desktop-like experience for the web application through a browser extension popup window. For information about the Progressive Web App implementation, see [Progressive Web App](/Jus-Be/orinayo/6.1-progressive-web-app). For details about service worker functionality and caching, see [Service Worker & Caching](/Jus-Be/orinayo/6.3-service-worker-and-caching).

## Purpose and Architecture

The Chrome extension serves as an alternative deployment method for OrinAyo, allowing users to launch the application in a dedicated popup window with enhanced permissions and desktop integration. The extension uses Manifest V3 with a background service worker to manage window lifecycle and provide persistent storage capabilities.

### Extension Manifest Configuration

```mermaid
flowchart TD

MANIFEST["manifest.json"]
BACKGROUND["service_worker"]
PERMISSIONS["permissions"]
ACTION["action"]
OPTIONS["options_ui"]
BG_SCRIPT["js/background.js"]
STORAGE["storage"]
UNLIMITED["unlimitedStorage"]
BG_PERM["background"]
ICON["assets/icon_*.png"]
MAIN_HTML["index.html"]
LISTENERS["Chrome API Listeners"]
INSTALL["onInstalled"]
STARTUP["onStartup"]
CLICK["onClicked"]
WINDOW_EVENTS["Window Events"]

MANIFEST --> BACKGROUND
MANIFEST --> PERMISSIONS
MANIFEST --> ACTION
MANIFEST --> OPTIONS
BACKGROUND --> BG_SCRIPT
PERMISSIONS --> STORAGE
PERMISSIONS --> UNLIMITED
PERMISSIONS --> BG_PERM
ACTION --> ICON
OPTIONS --> MAIN_HTML
BG_SCRIPT --> LISTENERS
LISTENERS --> INSTALL
LISTENERS --> STARTUP
LISTENERS --> CLICK
LISTENERS --> WINDOW_EVENTS
```

**Extension Manifest Structure**
Sources: [docs/manifest.json L1-L31](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json#L1-L31)

| Property | Value | Purpose |
| --- | --- | --- |
| `manifest_version` | 3 | Uses latest Manifest V3 specification |
| `background.service_worker` | `./js/background.js` | Background script for extension logic |
| `permissions` | `["background", "storage", "unlimitedStorage"]` | Required Chrome API access |
| `options_ui.page` | `index.html` | Main application serves as options page |
| `action.default_icon` | Icon assets | Extension toolbar button configuration |

### Background Service Worker Implementation

The extension's core functionality is implemented in the background service worker that handles Chrome extension lifecycle events and window management.

```mermaid
flowchart TD

SERVICE_WORKER["background.js"]
INSTALL_HANDLER["chrome.runtime.onInstalled"]
STARTUP_HANDLER["chrome.runtime.onStartup"]
ACTION_HANDLER["chrome.action.onClicked"]
WINDOW_HANDLERS["Window Event Handlers"]
OPEN_WINDOW["openOrinAyoWindow()"]
CHECK_STORAGE["chrome.storage.local.get('orinAyoWin')"]
EXISTING_WIN["Existing Window?"]
FOCUS_WIN["chrome.windows.update(focused: true)"]
CREATE_WIN["createOrinAyoWindow()"]
CHROME_CREATE["chrome.windows.create()"]
STORE_ID["chrome.storage.local.set({orinAyoWin: win.id})"]
RESIZE["chrome.windows.update(width: 1150, height: 1140)"]
FOCUS_CHANGED["onFocusChanged"]
CREATED["onCreated"]
REMOVED["onRemoved"]
CLEANUP_STORAGE["Remove stored window ID"]

SERVICE_WORKER --> INSTALL_HANDLER
SERVICE_WORKER --> STARTUP_HANDLER
SERVICE_WORKER --> ACTION_HANDLER
SERVICE_WORKER --> WINDOW_HANDLERS
ACTION_HANDLER --> OPEN_WINDOW
OPEN_WINDOW --> CHECK_STORAGE
CHECK_STORAGE --> EXISTING_WIN
EXISTING_WIN --> FOCUS_WIN
EXISTING_WIN --> CREATE_WIN
CREATE_WIN --> CHROME_CREATE
CHROME_CREATE --> STORE_ID
CHROME_CREATE --> RESIZE
WINDOW_HANDLERS --> FOCUS_CHANGED
WINDOW_HANDLERS --> CREATED
WINDOW_HANDLERS --> REMOVED
REMOVED --> CLEANUP_STORAGE
```

**Background Service Worker Event Handlers**
Sources: [docs/js/background.js L34-L126](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L34-L126)

### Window Management System

The extension implements a sophisticated window management system to provide a desktop application-like experience:

```mermaid
flowchart TD

USER_CLICK["User Clicks Extension Icon"]
OPEN_FUNCTION["openOrinAyoWindow()"]
STORAGE_CHECK["Check Stored Window ID"]
VALIDATE_WINDOW["Validate Window Exists"]
FOCUS_EXISTING["Focus Existing Window"]
CREATE_NEW["Create New Window"]
WINDOW_CREATE["chrome.windows.create()"]
SET_PROPERTIES["Set Size and Store ID"]
READY["Extension Window Ready"]

USER_CLICK --> OPEN_FUNCTION
OPEN_FUNCTION --> STORAGE_CHECK
STORAGE_CHECK --> VALIDATE_WINDOW
VALIDATE_WINDOW --> FOCUS_EXISTING
VALIDATE_WINDOW --> CREATE_NEW
STORAGE_CHECK --> CREATE_NEW
CREATE_NEW --> WINDOW_CREATE
WINDOW_CREATE --> SET_PROPERTIES
SET_PROPERTIES --> READY
FOCUS_EXISTING --> READY
```

**Window Creation and Management Functions**
Sources: [docs/js/background.js L88-L125](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L88-L125)

### Protocol Detection and Service Worker Integration

The main application includes Chrome extension detection logic to handle different deployment contexts:

```mermaid
flowchart TD

APP_START["Application Startup"]
PROTOCOL_CHECK["Check URL Protocol"]
EXT_MODE["Extension Mode"]
WEB_MODE["Web Mode"]
LOCAL_MODE["Local Mode"]
BYPASS_SW["Bypass Service Worker"]
EXT_ID_CHECK["Check CHROME_EXTN_ID constant"]
ENABLE_SW["Enable Service Worker"]
PWA_FEATURES["Enable PWA Features"]
FULL_PERMISSIONS["Full Chrome API Access"]
CACHED_ASSETS["Cached Asset Loading"]

APP_START --> PROTOCOL_CHECK
PROTOCOL_CHECK --> EXT_MODE
PROTOCOL_CHECK --> WEB_MODE
PROTOCOL_CHECK --> LOCAL_MODE
EXT_MODE --> BYPASS_SW
EXT_MODE --> EXT_ID_CHECK
WEB_MODE --> ENABLE_SW
WEB_MODE --> PWA_FEATURES
BYPASS_SW --> FULL_PERMISSIONS
ENABLE_SW --> CACHED_ASSETS
```

**Extension Detection Logic**
Sources: [docs/js/index.js L6](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/index.js#L6-L6)

 [docs/js/background.js L34](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L34-L34)

### Extension-Specific Features

The Chrome extension provides several advantages over the web application:

**Enhanced Permissions and Storage**

* Unlimited storage quota for audio assets and user data
* Background processing capabilities through service worker
* Access to Chrome-specific APIs for enhanced functionality

**Desktop Integration**

* Dedicated application window with custom sizing (1150x1140 pixels)
* Window state persistence across browser sessions
* Integration with browser extension management

**Window Lifecycle Management**

* Automatic window focus when extension icon is clicked
* Prevention of duplicate windows through storage-based tracking
* Proper cleanup of window references when windows are closed

Sources: [docs/manifest.json L11-L15](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/manifest.json#L11-L15)

 [docs/js/background.js L95](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L95-L95)

 [docs/js/background.js L72-L79](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L72-L79)

### Installation and Update Handling

The extension includes handlers for installation and update events:

```mermaid
flowchart TD

INSTALL_EVENT["chrome.runtime.onInstalled"]
REASON_CHECK["Installation Reason"]
FIRST_INSTALL["First Install Handler"]
UPDATE_HANDLER["Update Handler"]
INIT_SETUP["Initialize Extension"]
VERSION_CHECK["Compare Versions"]
MIGRATION["Handle Migration"]
STARTUP_EVENT["chrome.runtime.onStartup"]
AUTO_OPEN["Optional Auto-open"]

INSTALL_EVENT --> REASON_CHECK
REASON_CHECK --> FIRST_INSTALL
REASON_CHECK --> UPDATE_HANDLER
FIRST_INSTALL --> INIT_SETUP
UPDATE_HANDLER --> VERSION_CHECK
VERSION_CHECK --> MIGRATION
STARTUP_EVENT --> AUTO_OPEN
```

**Installation Event Handling**
Sources: [docs/js/background.js L36-L57](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/js/background.js#L36-L57)

The Chrome extension implementation provides OrinAyo with a robust desktop application experience while maintaining the flexibility of web technologies. The extension's window management system, enhanced permissions, and integration with Chrome APIs create a seamless user experience that bridges web and desktop application paradigms.