# Stream Deck Types

TypeScript definitions for the
[Stream Deck SDK](https://docs.elgato.com/sdk/).

## Usage

### Register a Plugin

```ts
import { PluginReceiveEvent, RegisterPlugin } from "stream-deck/types";

const connectElgatoStreamDeckSocket: RegisterPlugin = function (port, pluginUuid, eventType, info) {
  const ws = new WebSocket(`ws://localhost:${port}`);

  ws.onmessage = function (event) {
    const pluginEvent: PluginReceiveEvent = JSON.parse(event.data);
  };
};
```
