// https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/

import { EventBase } from "./events";

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/#info-parameter}
 */
export interface Info {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/#inactioninfo-parameter}
 */
export interface ActionInfo {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/#javascript-plugin-registration}
 */
export type RegisterPlugin = (
  /** The port that to be used to create the WebSocket. */
  inPort: number,
  /** A unique identifier string to register the plugin with Stream Deck software. */
  inPluginUUID: string,
  /** The event type to register the plugin after opening the WebSocket. */
  inRegisterEvent: "registerEvent",
  /** A JSON object containing information about the application. */
  inInfo: Info
) => void;

interface RegisterEventBase<E extends string> extends EventBase<E> {
  uuid: string;
}

export interface RegisterPluginEvent
  extends RegisterEventBase<"registerEvent"> {}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/#property-inspector-registration}
 */
export type RegisterPropertyInspector = (
  /** The port that to be used to create the WebSocket. */
  inPort: number,
  /** A unique identifier string to register Property Inspector with Stream Deck software. */
  inPropertyInspectorUUID: string,
  /** The event type to register the plugin after opening the WebSocket. */
  inRegisterEvent: "registerPropertyInspector",
  /** A JSON object containing information about the application. */
  inInfo: Info,
  /** A JSON object containing information about the action. */
  inActionInfo: ActionInfo
) => void;

export interface RegisterPropertyInspectorEvent
  extends RegisterEventBase<"registerPropertyInspector"> {}
