import {
  ActionInfo,
  Info,
  PropertyInspectorReceiveEvent,
  PropertyInspectorSendEvent,
  RegisterPropertyInspector,
  RegisterPropertyInspectorEvent,
} from "@ciaran1344/stream-deck-types";

import Emitter from "./Emitter";

type PropertyInspectorReceiveEventMap = {
  [E in PropertyInspectorReceiveEvent as E["event"]]: E;
};

export default class PropertyInspector extends Emitter<PropertyInspectorReceiveEventMap> {
  public actionInfo?: ActionInfo;

  public info?: Info;

  public port?: number;

  public uuid?: string;

  public ws?: WebSocket;

  /**
   * Create a `connectElgatoStreamDeckSocket` {@link RegisterPropertyInspector} callback.
   *
   * It creates a {@link WebSocket} and registers the Property Inspector before invoking
   * {@link onReady}.
   *
   * @see https://docs.elgato.com/sdk/plugins/registration-procedure#property-inspector-registration
   *
   * @param onReady Callback to invoke on {@link WebSocket} open
   * @returns A callback to be assigned to `connectElgatoStreamDeckSocket`
   */
  public register(onReady: () => void): RegisterPropertyInspector {
    return (port, uuid, eventType, info, actionInfo) => {
      this.actionInfo = actionInfo;
      this.info = info;
      this.port = port;
      this.uuid = uuid;

      const ws = new WebSocket(`ws://localhost:${port}`);

      ws.addEventListener("close", () => {
        // Remove all event listeners
        this.clear();
      });

      ws.addEventListener("message", ({ data }) => {
        const event = JSON.parse(data) as PropertyInspectorReceiveEvent;

        // Call all event listeners for the plugin event type
        this.emit(event.event, event);
      });

      ws.addEventListener("open", () => {
        // Register the plugin
        ws.send(
          JSON.stringify({
            event: eventType,
            uuid,
          } satisfies RegisterPropertyInspectorEvent),
        );

        onReady();
      });

      this.ws = ws;
    };
  }

  public send(event: PropertyInspectorSendEvent): void {
    if (!this.ws) {
      // TODO: Replace with message buffer
      throw Error("WebSocket not initialized");
    }

    this.ws.send(JSON.stringify(event));
  }
}
