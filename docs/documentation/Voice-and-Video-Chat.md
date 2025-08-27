# Voice and Video Chat

> **Relevant source files**
> * [docs/packages/olmeet/olmeet.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js)
> * [docs/packages/voicechat/voicechat.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js)

This document covers OrinAyo's real-time communication capabilities for collaborative music sessions, including voice chat and video meeting functionality. These features enable musicians to communicate while collaborating on musical arrangements through integrated XMPP and WebRTC technologies.

For information about screen sharing capabilities, see [Screen Sharing](/Jus-Be/orinayo/5.2-screen-sharing). For details about the underlying XMPP messaging infrastructure, see [XMPP Integration](/Jus-Be/orinayo/5.3-xmpp-integration).

## Overview

OrinAyo provides two primary communication plugins that extend the Converse.js XMPP client:

| Plugin | Purpose | Technology | Primary File |
| --- | --- | --- | --- |
| Voice Chat | Audio-only communication in chat rooms | Custom iframe integration | `docs/packages/voicechat/voicechat.js` |
| Video Meeting | Full video conferencing | Jitsi Meet integration | `docs/packages/olmeet/olmeet.js` |

Both plugins integrate seamlessly with OrinAyo's chat interface, adding toolbar buttons to initiate communication sessions within existing XMPP chat rooms.

Sources: [docs/packages/voicechat/voicechat.js L1-L95](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L1-L95)

 [docs/packages/olmeet/olmeet.js L1-L481](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L1-L481)

## Voice Chat Architecture

The voice chat system provides lightweight audio communication through a custom integration with the collaboration server's `ohun` endpoint.

```mermaid
flowchart TD

TOOLBAR_BTN["performAudio()"]
CHAT_ROOM["XMPP Chat Room"]
SERVER_URL["collaboration_server.server_url"]
VOICE_IFRAME["Voice Chat iframe"]
VOICE_BUTTON[".plugin-voicechat button"]
OCCUPANTS_AREA[".occupants-voice-chat div"]
CHATROOM_BODY[".chatroom-body"]
COLLAB_SERVER["Collaboration Server"]
OHUN_ENDPOINT["/orinayo/ohun/{room}"]

VOICE_BUTTON --> TOOLBAR_BTN
SERVER_URL --> OHUN_ENDPOINT
VOICE_IFRAME --> OCCUPANTS_AREA

subgraph subGraph2 ["External Services"]
    COLLAB_SERVER
    OHUN_ENDPOINT
    OHUN_ENDPOINT --> COLLAB_SERVER
end

subgraph subGraph1 ["UI Components"]
    VOICE_BUTTON
    OCCUPANTS_AREA
    CHATROOM_BODY
    OCCUPANTS_AREA --> CHATROOM_BODY
end

subgraph subGraph0 ["Voice Chat Flow"]
    TOOLBAR_BTN
    CHAT_ROOM
    SERVER_URL
    VOICE_IFRAME
    TOOLBAR_BTN --> SERVER_URL
    TOOLBAR_BTN --> CHAT_ROOM
    CHAT_ROOM --> VOICE_IFRAME
end
```

The `voicechat` plugin implements the following key functions:

* **Button Integration**: Adds voice chat button to XMPP chatroom toolbars via `getToolbarButtons` listener [docs/packages/voicechat/voicechat.js L18-L33](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L18-L33)
* **Audio Session Management**: Toggles voice chat iframe through `performAudio()` function [docs/packages/voicechat/voicechat.js L43-L93](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L43-L93)
* **Dynamic UI Creation**: Creates `.occupants-voice-chat` div to host voice interface [docs/packages/voicechat/voicechat.js L64-L74](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L64-L74)

Sources: [docs/packages/voicechat/voicechat.js L10-L41](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L10-L41)

 [docs/packages/voicechat/voicechat.js L43-L95](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L43-L95)

## Video Meeting Integration

The video meeting system leverages Jitsi Meet for full video conferencing capabilities with sophisticated iframe management and XMPP invitation handling.

```mermaid
flowchart TD

OLMEET_PLUGIN["olmeet plugin"]
TOOLBAR_HANDLER["getToolbarButtons()"]
VIDEO_BUTTON[".plugin-olmeet button"]
PERFORM_VIDEO["performVideo()"]
DO_VIDEO["doVideo()"]
DO_LOCAL_VIDEO["doLocalVideo()"]
ROOM_GENERATION["Room ID Generation"]
XMPP_INVITE["XMPP Meeting Invitation"]
IFRAME_CREATION["iframe.olmeet Creation"]
DYNAMIC_DISPLAY["dynamicDisplayManager"]
START_OPTION["olmeet_start_option"]
MODAL_OPTION["olmeet_modal"]
BASE_URL["olmeet_url"]
JITSI_MEET["Jitsi Meet Server"]
MEET_INTERFACE["Meeting Interface"]

DO_VIDEO --> ROOM_GENERATION
DO_VIDEO --> XMPP_INVITE
DO_LOCAL_VIDEO --> IFRAME_CREATION
START_OPTION --> DO_VIDEO
MODAL_OPTION --> DO_LOCAL_VIDEO
BASE_URL --> JITSI_MEET

subgraph subGraph3 ["External Services"]
    JITSI_MEET
    MEET_INTERFACE
    JITSI_MEET --> MEET_INTERFACE
end

subgraph subGraph2 ["Configuration Options"]
    START_OPTION
    MODAL_OPTION
    BASE_URL
end

subgraph subGraph1 ["Meeting Management"]
    ROOM_GENERATION
    XMPP_INVITE
    IFRAME_CREATION
    DYNAMIC_DISPLAY
    IFRAME_CREATION --> DYNAMIC_DISPLAY
end

subgraph subGraph0 ["Video Meeting Components"]
    OLMEET_PLUGIN
    TOOLBAR_HANDLER
    VIDEO_BUTTON
    PERFORM_VIDEO
    DO_VIDEO
    DO_LOCAL_VIDEO
    OLMEET_PLUGIN --> TOOLBAR_HANDLER
    TOOLBAR_HANDLER --> VIDEO_BUTTON
    VIDEO_BUTTON --> PERFORM_VIDEO
    PERFORM_VIDEO --> DO_VIDEO
    DO_VIDEO --> DO_LOCAL_VIDEO
end
```

### Meeting Session Lifecycle

The video meeting system implements a comprehensive lifecycle management system:

1. **Room Creation**: Generates unique room IDs using `Strophe.getNodeFromJid()` combined with random suffixes [docs/packages/olmeet/olmeet.js L179](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L179-L179)
2. **XMPP Invitation**: Sends structured meeting invitations with `<invite>` and `<external>` elements [docs/packages/olmeet/olmeet.js L186](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L186-L186)
3. **Display Management**: Uses `dynamicDisplayManager` for responsive iframe positioning [docs/packages/olmeet/olmeet.js L241-L358](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L241-L358)
4. **Event Handling**: Monitors iframe load events for meeting closure detection [docs/packages/olmeet/olmeet.js L372-L381](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L372-L381)

Sources: [docs/packages/olmeet/olmeet.js L177-L197](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L177-L197)

 [docs/packages/olmeet/olmeet.js L209-L428](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L209-L428)

## Plugin Architecture Integration

Both communication plugins follow the Converse.js plugin pattern and integrate with OrinAyo's XMPP infrastructure:

```mermaid
flowchart TD

CONVERSE_API["converse.plugins.add()"]
EVENT_LISTENERS["API Event Listeners"]
TOOLBAR_BUTTONS["Toolbar Button Injection"]
MESSAGE_PARSING["Message Body Transformation"]
VOICE_PLUGIN["voicechat plugin"]
PERFORM_AUDIO["performAudio()"]
VOICE_UI["Voice Chat UI"]
OLMEET_PLUGIN["olmeet plugin"]
MEET_DIALOG["MeetDialog class"]
IFRAME_MANAGER["iframe Management"]
XMPP_CLIENT["XMPP Client"]
CONNECTION_API["_converse.api.connection.get()"]
MESSAGE_SEND["_converse.api.send()"]

CONVERSE_API --> VOICE_PLUGIN
CONVERSE_API --> OLMEET_PLUGIN
VOICE_PLUGIN --> CONNECTION_API
OLMEET_PLUGIN --> MESSAGE_SEND

subgraph subGraph3 ["XMPP Connection"]
    XMPP_CLIENT
    CONNECTION_API
    MESSAGE_SEND
    CONNECTION_API --> XMPP_CLIENT
    MESSAGE_SEND --> XMPP_CLIENT
end

subgraph subGraph2 ["Video Meeting Plugin"]
    OLMEET_PLUGIN
    MEET_DIALOG
    IFRAME_MANAGER
    OLMEET_PLUGIN --> MEET_DIALOG
    OLMEET_PLUGIN --> IFRAME_MANAGER
end

subgraph subGraph1 ["Voice Chat Plugin"]
    VOICE_PLUGIN
    PERFORM_AUDIO
    VOICE_UI
    VOICE_PLUGIN --> PERFORM_AUDIO
    PERFORM_AUDIO --> VOICE_UI
end

subgraph subGraph0 ["Converse.js Integration"]
    CONVERSE_API
    EVENT_LISTENERS
    TOOLBAR_BUTTONS
    MESSAGE_PARSING
    EVENT_LISTENERS --> TOOLBAR_BUTTONS
    EVENT_LISTENERS --> MESSAGE_PARSING
end
```

### Plugin Initialization

Both plugins register with Converse.js using the standard plugin architecture:

* **Voice Chat**: Registers as `"voicechat"` plugin with `getToolbarButtons` and `connected` listeners [docs/packages/voicechat/voicechat.js L10-L41](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L10-L41)
* **Video Meeting**: Registers as `"olmeet"` plugin with multiple event handlers including `messageNotification`, `getToolbarButtons`, and `afterMessageBodyTransformed` [docs/packages/olmeet/olmeet.js L8](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L8-L8)  [docs/packages/olmeet/olmeet.js L445-L449](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L445-L449)

Sources: [docs/packages/voicechat/voicechat.js L10-L16](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L10-L16)

 [docs/packages/olmeet/olmeet.js L430-L449](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L430-L449)

## User Interface Components

### Toolbar Button Integration

Both plugins add buttons to the chat toolbar with SVG icons and click handlers:

| Plugin | Button Class | Icon | Handler Function |
| --- | --- | --- | --- |
| Voice Chat | `.plugin-voicechat` | Volume/speaker icon | `performAudio` |
| Video Meeting | `.plugin-olmeet` | Video camera icon | `performVideo` |

The buttons are conditionally styled based on chat type (direct chat vs. chatroom) using CSS variables like `--muc-color` and `--chat-color` [docs/packages/voicechat/voicechat.js L23](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L23-L23)

 [docs/packages/olmeet/olmeet.js L98-L101](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L98-L101)

### Meeting Interface Display Options

The video meeting system supports multiple display modes:

* **Inline Chat Window**: iframe embedded within chat interface [docs/packages/olmeet/olmeet.js L191-L192](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L191-L192)
* **New Tab**: Opens meeting in separate browser tab [docs/packages/olmeet/olmeet.js L194-L196](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L194-L196)
* **Modal Dialog**: Uses `MeetDialog` class extending `BaseModal` [docs/packages/olmeet/olmeet.js L451-L477](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L451-L477)

Sources: [docs/packages/voicechat/voicechat.js L25-L29](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L25-L29)

 [docs/packages/olmeet/olmeet.js L103-L108](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L103-L108)

 [docs/packages/olmeet/olmeet.js L189-L197](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L189-L197)

## Configuration Settings

### Voice Chat Configuration

Voice chat configuration is minimal and primarily depends on collaboration server settings:

* **Server URL**: Retrieved from `localStorage.getItem("collaboration_server.server_url")` [docs/packages/voicechat/voicechat.js L47](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L47-L47)
* **Room Endpoint**: Constructs URLs like `https://{server}/orinayo/ohun/{room}` [docs/packages/voicechat/voicechat.js L81](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L81-L81)

### Video Meeting Configuration

The olmeet plugin provides extensive configuration options:

```mermaid
flowchart TD

START_OPTION["olmeet_start_option"]
HEAD_TOGGLE["olmeet_head_display_toggle"]
MODAL_SETTING["olmeet_modal"]
BASE_URL_SETTING["olmeet_url"]
CHAT_WINDOW["INTO_CHAT_WINDOW"]
NEW_TAB["INTO_NEW_TAB"]
DEFAULT_URL["Unsupported markdown: link"]
DEFAULT_TOGGLE["true"]
DEFAULT_MODAL["false"]
DEFAULT_WINDOW["INTO_CHAT_WINDOW"]

START_OPTION --> CHAT_WINDOW
START_OPTION --> NEW_TAB
START_OPTION --> DEFAULT_WINDOW
HEAD_TOGGLE --> DEFAULT_TOGGLE
MODAL_SETTING --> DEFAULT_MODAL
BASE_URL_SETTING --> DEFAULT_URL

subgraph subGraph2 ["Default Values"]
    DEFAULT_URL
    DEFAULT_TOGGLE
    DEFAULT_MODAL
    DEFAULT_WINDOW
end

subgraph subGraph1 ["Start Option Values"]
    CHAT_WINDOW
    NEW_TAB
end

subgraph subGraph0 ["Configuration Settings"]
    START_OPTION
    HEAD_TOGGLE
    MODAL_SETTING
    BASE_URL_SETTING
end
```

These settings are extended into the Converse.js API through `api.settings.extend()` [docs/packages/olmeet/olmeet.js L438-L443](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L438-L443)

Sources: [docs/packages/olmeet/olmeet.js L10-L14](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L10-L14)

 [docs/packages/olmeet/olmeet.js L438-L443](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L438-L443)