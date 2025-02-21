import type {
  Info,
  PluginReceiveEvent,
  PluginSendEvent,
  RegisterPlugin,
  RegisterPluginEvent,
} from "@ciaran1344/stream-deck-types";

import Emitter from "./Emitter";

type PluginReceiveEventMap = {
  [E in PluginReceiveEvent as E["event"]]: E;
};

export default class Plugin extends Emitter<PluginReceiveEventMap> {
  public info?: Info;

  public port?: number;

  public uuid?: string;

  public ws?: WebSocket;

  /**
   * Create a `connectElgatoStreamDeckSocket` {@link RegisterPlugin} callback.
   *
   * It creates a {@link WebSocket} and registers the plugin before invoking {@link onReady}.
   *
   * @see https://docs.elgato.com/sdk/plugins/registration-procedure#javascript-plugin-registration
   *
   * @param onReady Callback to invoke on {@link WebSocket} open
   * @returns A callback to be assigned to `connectElgatoStreamDeckSocket`
   */
  public register(onReady: () => void): RegisterPlugin {
    return (port, uuid, eventType, info) => {
      this.info = info;
      this.port = port;
      this.uuid = uuid;

      const ws = new WebSocket(`ws://localhost:${port}`);

      ws.addEventListener("close", () => {
        // Remove all event listeners
        this.clear();
      });

      ws.addEventListener("message", ({ data }) => {
        const event = JSON.parse(data) as PluginReceiveEvent;

        // Call all event listeners for the plugin event type
        this.emit(event.event, event);
      });

      ws.addEventListener("open", () => {
        // Register the plugin
        ws.send(
          JSON.stringify({
            event: eventType,
            uuid,
          } satisfies RegisterPluginEvent)
        );

        onReady();
      });

      this.ws = ws;
    };
  }

  public send(event: PluginSendEvent): void {
    if (!this.ws) {
      // TODO: Replace with message buffer
      throw Error("WebSocket not initialized");
    }

    this.ws.send(JSON.stringify(event));
  }
}
