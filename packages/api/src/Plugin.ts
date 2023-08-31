// TODO: Import from dependency
import type {
  Info,
  PluginReceiveEvent,
  PluginSendEvent,
  RegisterPluginEvent,
} from "../../types";
import type { RegisterPlugin } from "../../types";

type PluginReceiveEventMap = {
  [E in PluginReceiveEvent as E["event"]]: E;
};

type PluginReceiveEventType = PluginReceiveEvent["event"];

export default class Plugin {
  public info?: Info;

  public pluginUuid?: string;

  public ws?: WebSocket;

  /** Map from {@link PluginReceiveEvent} type to event listeners. */
  private eventListeners = new Map<
    PluginReceiveEventType,
    ((event: any) => void)[]
  >();

  public addEventListener<T extends PluginReceiveEventType>(
    type: T,
    listener: (event: PluginReceiveEventMap[T]) => void
  ): this {
    const listeners = this.eventListeners.get(type);
    if (listeners) {
      listeners.push(listener);
    } else {
      this.eventListeners.set(type, [listener]);
    }

    return this;
  }

  public removeEventListener<T extends PluginReceiveEventType>(
    type: T,
    listener: (event: PluginReceiveEventMap[T]) => void
  ): this {
    const listeners = this.eventListeners.get(type);
    if (listeners) {
      const newListeners = listeners.filter((l) => l !== listener);
      if (newListeners.length > 0) {
        this.eventListeners.set(type, newListeners);
      } else {
        this.eventListeners.delete(type);
      }
    }

    return this;
  }

  /**
   * Create a `connectElgatoStreamDeckSocket` {@link RegisterPlugin} callback.
   *
   * It creates a {@link WebSocket} and registers the plugin before invoking {@link onReady}.
   *
   * @see https://docs.elgato.com/sdk/plugins/registration-procedure#javascript-plugin-registration
   */
  public register(onReady: () => void): RegisterPlugin {
    return (port, pluginUuid, eventType, info) => {
      this.info = info;
      this.pluginUuid = pluginUuid;
      this.ws = new WebSocket(`ws://localhost:${port}`);

      this.ws.addEventListener("close", () => {
        this.eventListeners.clear();
      });

      this.ws.addEventListener("message", ({ data }) => {
        const event = JSON.parse(data) as PluginReceiveEvent;

        // Call all event listeners for the received event type
        this.eventListeners
          .get(event.event)
          ?.forEach((listener) => listener(event));
      });

      this.ws.addEventListener("open", () => {
        // Register the plugin
        this.send({
          event: eventType,
          uuid: pluginUuid,
        });

        onReady();
      });
    };
  }

  public send(event: PluginSendEvent | RegisterPluginEvent): void {
    if (!this.ws) {
      // TODO: Replace with message buffer
      throw Error("WebSocket not initialized");
    }

    this.ws.send(JSON.stringify(event));
  }
}
