// https://docs.elgato.com/sdk/plugins/registration-procedure

import { Action } from "./actions";
import { Coordinates, EventBase } from "./events";

export enum Platform {
  Mac = "kESDSDKApplicationInfoPlatformMac",
  Windows = "kESDSDKApplicationInfoPlatformWindows",
}

export interface Application {
  /** In which language the Stream Deck application is running. */
  language: "de" | "en" | "es" | "fr" | "ja" | "zh_CN";
  /** On which platform the Stream Deck application is running. */
  platform: Platform;
  /** The operating system version. */
  platformVersion: string;
  /** The Stream Deck application version. */
  version: string;
}

export interface Colors {
  [key: string]: string;
}

export interface Plugin {
  /**	The unique identifier of the plugin. */
  uuid: string;
  /**	The plugin version as written in the manifest.json. */
  version: string;
}

export enum DeviceType {
  StreamDeckMini = 1,
  StreamDeckXL,
  StreamDeckMobile,
  CorsairGKeys,
  StreamDeckPedal,
  CorsairVoyager,
  StreamDeckPlus,
}

export interface Size {
  columns: number;
  rows: number;
}

export interface Device {
  /** A value to identify the device. */
  id: string;
  /** The name of the device set by the user. */
  name: string;
  /** The number of columns and rows of keys that the device owns. */
  size: Size;
  /** Type of device. */
  type: DeviceType;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/registration-procedure#info-parameter}
 */
export interface Info {
  /**	A JSON object containing information about the application. */
  application: Application;
  /**	A JSON object containing information about the preferred user colors. */
  colors: Colors;
  /**	A JSON array containing information about the devices. */
  devices: Device[];
  /**	Pixel ratio value to indicate if the Stream Deck application is running on a HiDPI screen. */
  devicePixelRatio: number;
  /**	A JSON object containing information about the plugin. */
  plugin: Plugin;
}

export interface RegisterPluginEvent extends EventBase<"registerEvent"> {
  uuid: string;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/registration-procedure#javascript-plugin-registration}
 */
export type RegisterPlugin = (
  /** The port that to be used to create the WebSocket. */
  inPort: number,
  /** A unique identifier string to register the plugin with Stream Deck software. */
  inPluginUUID: string,
  /** The event type to register the plugin after opening the WebSocket. */
  inRegisterEvent: RegisterPluginEvent["event"],
  /** A JSON object containing information about the application. */
  inInfo: Info,
) => void;

export interface ActionInfoPayload<S = any> {
  coordinates: Coordinates;
  settings: S;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/registration-procedure#inactioninfo-parameter}
 */
export interface ActionInfo<S = any> extends Action<ActionInfoPayload<S>> {}

export interface RegisterPropertyInspectorEvent
  extends EventBase<"registerPropertyInspector"> {
  uuid: string;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/registration-procedure#property-inspector-registration}
 */
export type RegisterPropertyInspector = (
  /** The port that to be used to create the WebSocket. */
  inPort: number,
  /** A unique identifier string to register Property Inspector with Stream Deck software. */
  inPropertyInspectorUUID: string,
  /** The event type to register the plugin after opening the WebSocket. */
  inRegisterEvent: RegisterPropertyInspectorEvent["event"],
  /** A JSON object containing information about the application. */
  inInfo: Info,
  /** A JSON object containing information about the action. */
  inActionInfo: ActionInfo,
) => void;
