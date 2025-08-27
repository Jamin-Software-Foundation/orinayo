# Communication & Collaboration

> **Relevant source files**
> * [docs/dist/converse.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.css)
> * [docs/dist/converse.css.map](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.css.map)
> * [docs/dist/converse.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.js)
> * [docs/dist/converse.js.map](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.js.map)
> * [docs/dist/converse.min.css](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.min.css)
> * [docs/dist/converse.min.css.map](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.min.css.map)
> * [docs/dist/converse.min.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.min.js)
> * [docs/dist/converse.min.js.map](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.min.js.map)
> * [docs/dist/locales/ca-LC_MESSAGES-converse-po.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/locales/ca-LC_MESSAGES-converse-po.js)
> * [docs/dist/locales/ru-LC_MESSAGES-converse-po.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/locales/ru-LC_MESSAGES-converse-po.js)
> * [docs/packages/olmeet/olmeet.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js)
> * [docs/packages/voicechat/voicechat.js](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js)

This document covers OrinAyo's real-time communication and collaboration systems, which enable musicians to connect, communicate, and perform together. The system integrates XMPP messaging, voice/video chat, screen sharing, and WebRTC streaming to support collaborative music making sessions.

For information about the core audio systems and MIDI processing, see [Audio Systems](/Jus-Be/orinayo/4-audio-systems). For details about platform deployment and service workers, see [Platform Support](/Jus-Be/orinayo/6-platform-support).

## XMPP Communication Foundation

OrinAyo uses Converse.js as its XMPP client foundation, providing text messaging, presence awareness, and group chat functionality. The system extends the base Converse.js functionality with custom plugins for music collaboration features.

```mermaid
flowchart TD

CONVERSE["converse.js<br>XMPP Client"]
XMPP_CONN["XMPP Connection<br>Strophe.js"]
PRESENCE["Presence Management"]
MESSAGING["Message Handling"]
VOICECHAT["voicechat.js<br>Voice Chat Plugin"]
OLMEET["olmeet.js<br>Video Meeting Plugin"]
SCREENCAST["screencast.js<br>Screen Sharing Plugin"]
CHAT_ROOMS["Group Chat Rooms"]
PRIVATE_MSGS["Private Messages"]
FILE_SHARE["File Sharing"]
NOTIFICATIONS["Desktop Notifications"]

VOICECHAT --> CONVERSE
OLMEET --> CONVERSE
SCREENCAST --> CONVERSE
MESSAGING --> CHAT_ROOMS
MESSAGING --> PRIVATE_MSGS
MESSAGING --> FILE_SHARE
PRESENCE --> NOTIFICATIONS

subgraph subGraph2 ["Communication Features"]
    CHAT_ROOMS
    PRIVATE_MSGS
    FILE_SHARE
    NOTIFICATIONS
end

subgraph subGraph1 ["Custom Plugins"]
    VOICECHAT
    OLMEET
    SCREENCAST
end

subgraph subGraph0 ["XMPP Layer"]
    CONVERSE
    XMPP_CONN
    PRESENCE
    MESSAGING
    CONVERSE --> XMPP_CONN
    CONVERSE --> PRESENCE
    CONVERSE --> MESSAGING
end
```

The XMPP integration provides the foundation for all communication features, with plugins extending functionality for multimedia collaboration.

Sources: [docs/dist/converse.js L1](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/dist/converse.js#L1-L1)

 [docs/packages/voicechat/voicechat.js L1-L96](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L1-L96)

 [docs/packages/olmeet/olmeet.js L1-L481](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L1-L481)

## Voice Chat Integration

The voice chat system integrates audio communication directly into XMPP chat rooms through the `voicechat` plugin. This plugin adds voice chat capabilities to group conversations, allowing musicians to communicate while collaborating.

### Voice Chat Plugin Architecture

```mermaid
flowchart TD

PLUGIN_INIT["voicechat.initialize()"]
TOOLBAR_BTN["getToolbarButtons<br>Event Handler"]
VOICE_UI["Voice Chat UI<br>iframe Integration"]
CHATROOM["Chatroom Model"]
CHAT_TOOLBAR["Chat Toolbar"]
OCCUPANTS["occupants-voice-chat<br>DOM Element"]
VOICE_SERVER["collaboration_server"]
OHUN_SERVICE["ohun Voice Service"]
VOICE_IFRAME["Voice Chat iframe"]

TOOLBAR_BTN --> CHAT_TOOLBAR
CHAT_TOOLBAR --> VOICE_UI
VOICE_UI --> OCCUPANTS
VOICE_UI --> VOICE_IFRAME

subgraph subGraph2 ["Voice Service"]
    VOICE_SERVER
    OHUN_SERVICE
    VOICE_IFRAME
    VOICE_IFRAME --> OHUN_SERVICE
    OHUN_SERVICE --> VOICE_SERVER
end

subgraph subGraph1 ["Chat Integration"]
    CHATROOM
    CHAT_TOOLBAR
    OCCUPANTS
    CHATROOM --> OCCUPANTS
end

subgraph subGraph0 ["Voice Chat Plugin"]
    PLUGIN_INIT
    TOOLBAR_BTN
    VOICE_UI
    PLUGIN_INIT --> TOOLBAR_BTN
end
```

The `performAudio` function handles voice chat activation, creating an iframe that connects to the voice service based on the chat room's JID.

Sources: [docs/packages/voicechat/voicechat.js L43-L95](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L43-L95)

 [docs/packages/voicechat/voicechat.js L18-L33](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L18-L33)

### Voice Chat Implementation Details

| Component | Function | Key Features |
| --- | --- | --- |
| `voicechat.js` | Voice chat plugin | Toolbar integration, iframe management |
| `performAudio()` | Chat activation | Dynamic iframe creation, server URL handling |
| `ohun` service | Voice backend | WebRTC audio streaming, room-based channels |
| Chat toolbar | UI integration | Toggle button, visual feedback |

The voice chat system uses iframe embedding to integrate external voice services while maintaining security boundaries and chat context.

Sources: [docs/packages/voicechat/voicechat.js L43-L95](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L43-L95)

## Video Meeting System

The video meeting functionality is implemented through the `olmeet` plugin, which integrates Jitsi Meet video conferencing into XMPP chat sessions. This enables face-to-face collaboration during music sessions.

### Meeting Integration Flow

```mermaid
sequenceDiagram
  participant User
  participant Chat Interface
  participant olmeet Plugin
  participant Jitsi Meet
  participant XMPP Server

  User->>Chat Interface: Click video meeting button
  Chat Interface->>olmeet Plugin: performVideo()
  olmeet Plugin->>olmeet Plugin: Generate meeting room ID
  olmeet Plugin->>XMPP Server: Send meeting invitation message
  olmeet Plugin->>Jitsi Meet: Create Jitsi meeting iframe
  Jitsi Meet-->>Chat Interface: Embed meeting in chat
  note over XMPP Server: Invitation sent to all participants
  XMPP Server->>Chat Interface: Meeting invitation received
  Chat Interface->>olmeet Plugin: afterMessageBodyTransformed()
  olmeet Plugin->>Chat Interface: Add meeting join buttons
  User->>Chat Interface: Click "Open Meeting"
  Chat Interface->>olmeet Plugin: doLocalVideo()
  olmeet Plugin->>Jitsi Meet: Load meeting interface
```

The system supports both embedded meetings within chat windows and external meeting windows, with automatic invitation distribution through XMPP.

Sources: [docs/packages/olmeet/olmeet.js L151-L197](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L151-L197)

 [docs/packages/olmeet/olmeet.js L112-L138](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L112-L138)

### Meeting Plugin Components

```mermaid
flowchart TD

VIDEO_BTN["Video Button<br>getToolbarButtons()"]
MEETING_MODAL["MeetDialog<br>Modal Interface"]
IFRAME_MGR["iframe Management<br>doLocalVideo()"]
MSG_HANDLER["messageNotification<br>Handler"]
MSG_TRANSFORM["afterMessageBodyTransformed<br>Link Processing"]
INVITATION["Meeting Invitations<br>XMPP Messages"]
JITSI_IFRAME["Jitsi Meet iframe"]
MEET_CONFIG["Meeting Configuration"]
ROOM_ID["Dynamic Room IDs"]

MEETING_MODAL --> JITSI_IFRAME
IFRAME_MGR --> JITSI_IFRAME
INVITATION --> JITSI_IFRAME

subgraph subGraph2 ["Jitsi Integration"]
    JITSI_IFRAME
    MEET_CONFIG
    ROOM_ID
    ROOM_ID --> MEET_CONFIG
    MEET_CONFIG --> JITSI_IFRAME
end

subgraph subGraph1 ["Message Processing"]
    MSG_HANDLER
    MSG_TRANSFORM
    INVITATION
    MSG_HANDLER --> INVITATION
    MSG_TRANSFORM --> INVITATION
end

subgraph subGraph0 ["Meeting Controls"]
    VIDEO_BTN
    MEETING_MODAL
    IFRAME_MGR
    VIDEO_BTN --> IFRAME_MGR
end
```

The plugin generates unique meeting room IDs and handles both meeting creation and invitation processing through XMPP message parsing.

Sources: [docs/packages/olmeet/olmeet.js L177-L197](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L177-L197)

 [docs/packages/olmeet/olmeet.js L209-L428](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L209-L428)

## Screen Sharing Capabilities

Screen sharing functionality enables users to share their desktop, application windows, or browser tabs during collaborative sessions. This is particularly useful for sharing digital audio workstations, sheet music, or other visual content.

### Screen Sharing Architecture

```mermaid
flowchart TD

CAPTURE_API["getDisplayMedia()"]
STREAM_MGR["MediaStream Management"]
CONSTRAINTS["Capture Constraints"]
SCREENCAST_PLUGIN["screencast.js<br>Plugin"]
SHARE_BUTTON["Share Screen Button"]
PREVIEW["Screen Preview"]
WEBRTC_PUB["WebRTC Publisher<br>WHIP Protocol"]
STREAM_DIST["Stream Distribution"]
PEER_CONN["Peer Connections"]
SCREEN_REC["Screen Recording"]
MEDIA_REC["MediaRecorder API"]
FILE_SAVE["Local File Save"]

SCREENCAST_PLUGIN --> CAPTURE_API
STREAM_MGR --> PREVIEW
STREAM_MGR --> WEBRTC_PUB
STREAM_MGR --> SCREEN_REC

subgraph subGraph3 ["Recording Features"]
    SCREEN_REC
    MEDIA_REC
    FILE_SAVE
    SCREEN_REC --> MEDIA_REC
    MEDIA_REC --> FILE_SAVE
end

subgraph subGraph2 ["WebRTC Distribution"]
    WEBRTC_PUB
    STREAM_DIST
    PEER_CONN
    WEBRTC_PUB --> STREAM_DIST
    STREAM_DIST --> PEER_CONN
end

subgraph subGraph1 ["Sharing Integration"]
    SCREENCAST_PLUGIN
    SHARE_BUTTON
    PREVIEW
    SHARE_BUTTON --> SCREENCAST_PLUGIN
end

subgraph subGraph0 ["Screen Capture API"]
    CAPTURE_API
    STREAM_MGR
    CONSTRAINTS
    CAPTURE_API --> STREAM_MGR
    STREAM_MGR --> CONSTRAINTS
end
```

Screen sharing integrates with the WebRTC streaming infrastructure to distribute shared content to multiple participants in real-time.

Sources: Based on system architecture diagrams and WebRTC integration patterns

## WebRTC Streaming Infrastructure

The WebRTC streaming system provides low-latency audio and video distribution for live performance scenarios. It implements both WHIP (WebRTC-HTTP Ingestion Protocol) and WHEP (WebRTC-HTTP Egress Protocol) for standardized streaming.

### Streaming Data Flow

```mermaid
flowchart TD

MIC["Microphone Input"]
AUDIO_LOOPER["AudioLooper Engine"]
SYNTH_OUT["Synthesizer Output"]
PUBLISHER["WHIP Publisher"]
AUDIO_MIX["Audio Mixing"]
STREAM_ENC["Stream Encoding"]
MEDIA_SERVER["Media Server"]
RELAY_NODES["Relay Nodes"]
SUBSCRIBER1["WHEP Subscriber 1"]
SUBSCRIBER2["WHEP Subscriber 2"]
SUBSCRIBER3["WHEP Subscriber N"]

MIC --> AUDIO_MIX
AUDIO_LOOPER --> AUDIO_MIX
SYNTH_OUT --> AUDIO_MIX
PUBLISHER --> MEDIA_SERVER
RELAY_NODES --> SUBSCRIBER1
RELAY_NODES --> SUBSCRIBER2
RELAY_NODES --> SUBSCRIBER3

subgraph subGraph3 ["WebRTC Subscribers"]
    SUBSCRIBER1
    SUBSCRIBER2
    SUBSCRIBER3
end

subgraph subGraph2 ["Distribution Network"]
    MEDIA_SERVER
    RELAY_NODES
    MEDIA_SERVER --> RELAY_NODES
end

subgraph subGraph1 ["WebRTC Publisher"]
    PUBLISHER
    AUDIO_MIX
    STREAM_ENC
    AUDIO_MIX --> STREAM_ENC
    STREAM_ENC --> PUBLISHER
end

subgraph subGraph0 ["Audio Sources"]
    MIC
    AUDIO_LOOPER
    SYNTH_OUT
end
```

The streaming system captures multiple audio sources, mixes them, and distributes the combined stream to multiple subscribers with minimal latency.

Sources: Based on system architecture diagrams showing WebRTC streaming components

## Integration with Music Production

The communication systems are tightly integrated with OrinAyo's music production capabilities, enabling seamless collaboration during live performance and composition sessions.

### Collaboration Workflow Integration

```mermaid
flowchart TD

AUDIO_ENGINE["Audio Engine"]
MIDI_PROC["MIDI Processing"]
LOOPER["Audio Looper"]
EFFECTS["Guitar Effects"]
XMPP_CLIENT["XMPP Client"]
VOICE_CHAT["Voice Chat"]
VIDEO_MEET["Video Meeting"]
SCREEN_SHARE["Screen Sharing"]
SYNC_PERF["Synchronized Performance"]
SHEET_SHARE["Sheet Music Sharing"]
MIDI_COLLAB["MIDI Collaboration"]
LIVE_STREAM["Live Streaming"]

AUDIO_ENGINE --> VOICE_CHAT
AUDIO_ENGINE --> LIVE_STREAM
MIDI_PROC --> MIDI_COLLAB
LOOPER --> SYNC_PERF
SCREEN_SHARE --> SHEET_SHARE
VOICE_CHAT --> SYNC_PERF
VIDEO_MEET --> SYNC_PERF

subgraph subGraph2 ["Collaboration Features"]
    SYNC_PERF
    SHEET_SHARE
    MIDI_COLLAB
    LIVE_STREAM
    MIDI_COLLAB --> SYNC_PERF
end

subgraph subGraph1 ["Communication Layer"]
    XMPP_CLIENT
    VOICE_CHAT
    VIDEO_MEET
    SCREEN_SHARE
    XMPP_CLIENT --> VOICE_CHAT
    XMPP_CLIENT --> VIDEO_MEET
    VIDEO_MEET --> SCREEN_SHARE
end

subgraph subGraph0 ["Music Production"]
    AUDIO_ENGINE
    MIDI_PROC
    LOOPER
    EFFECTS
end
```

The communication systems work in conjunction with the audio engine to enable real-time collaborative music making with synchronized audio, visual feedback, and coordination tools.

Sources: Based on system architecture showing integration between communication and audio systems

## Configuration and Deployment

The communication systems require configuration of XMPP servers, voice chat services, and WebRTC infrastructure. The system supports multiple deployment scenarios from local development to distributed production environments.

### Service Configuration

| Service | Configuration | Default | Purpose |
| --- | --- | --- | --- |
| XMPP Server | `collaboration_server.server_url` | Local | Messaging and presence |
| Voice Chat | `ohun` service URL | Embedded | Audio communication |
| Video Meeting | `olmeet_url` | `meet.jit.si` | Video conferencing |
| WebRTC | WHIP/WHEP endpoints | Auto-detected | Live streaming |

The system automatically detects available services and provides fallback options when external services are unavailable.

Sources: [docs/packages/voicechat/voicechat.js L47](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/voicechat/voicechat.js#L47-L47)

 [docs/packages/olmeet/olmeet.js L438-L443](https://github.com/Jus-Be/orinayo/blob/3c7fbee9/docs/packages/olmeet/olmeet.js#L438-L443)