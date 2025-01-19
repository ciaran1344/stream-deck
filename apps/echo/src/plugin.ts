import { Plugin } from "@ciaran1344/stream-deck-api";

const plugin = new Plugin();

plugin.on("keyDown", (event) => {
  console.log(event);
});

Object.defineProperty(globalThis, "connectElgatoStreamDeckSocket", {
  value: plugin.register(() => {
    plugin.send({
      event: "logMessage",
      payload: {
        message: "Hello from the plugin!",
      },
    });
  }),
});
