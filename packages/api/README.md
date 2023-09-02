# Stream Deck API

`stream-deck-api` provides a strongly typed native ES6 API for creating StreamDeck JavaScript Plugins and Property Inspectors.

## Plugin

The `Plugin` class can be used to create and register a JavaScript Plugin:
https://docs.elgato.com/sdk/plugins/registration-procedure#javascript-plugin-registration

```ts
import { Plugin } from "@ciaran1344/stream-deck-api";

const plugin = new Plugin();

// Add plugin event listeners
plugin
  .addEventListener("applicationDidLaunch", (event) => {
    // Use event
  })
  .addEventListener("deviceDidConnect", (event) => {
    // Use event
  });

// Connect the plugin to the global hook
globalThis.connectElgatoStreamDeckSocket = plugin.register(() => {
  // Run program on WebSocket open
  plugin.send({
    event: "logMessage",
    payload: {
      message: "Hello from the plugin!",
    },
  });
});
```

## PropertyInspector

The `PropertyInspector` class can be used to create and register a Property Inspector:
https://docs.elgato.com/sdk/plugins/registration-procedure#property-inspector-registration

```ts
import { PropertyInspector } from "@ciaran1344/stream-deck-api";

const propertyInspector = new PropertyInspector();

// Add Property Inspector event listeners
propertyInspector
  .addEventListener("didReceiveGlobalSettings", (event) => {
    // Use event
  })
  .addEventListener("sendToPropertyInspector", (event) => {
    // Use event
  });

// Connect the Property Inspector to the global hook
globalThis.connectElgatoStreamDeckSocket = propertyInspector.register(() => {
  // Run program on WebSocket open
  propertyInspector.send({
    event: "logMessage",
    payload: {
      message: "Hello from the Property Inspector!",
    },
  });
});
```
