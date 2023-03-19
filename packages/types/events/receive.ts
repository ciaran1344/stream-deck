// https://developer.elgato.com/documentation/stream-deck/sdk/events-received/

import { ActionBase } from "../actions";

import { EventBase } from "./common";
import { SendToPluginEvent, SendToPropertyInspectorEvent } from "./send";

export interface Coordinates {
  column: number;
  row: number;
}

export interface DidReceiveSettingsPayload<S extends object = any> {
  /** The coordinates of the action triggered. */
  coordinates: Coordinates;
  /** Boolean indicating if the action is inside a Multi-Action. */
  isInMultiAction: boolean;
  /** This JSON object contains persistently stored data. */
  settings: S;

  /**
   * Only set when the action has multiple states defined in its manifest.json.
   * The 0-based value contains the current state of the action.
   */
  // FIXME: Should be optional?
  state?: number;
}

/**
 * Event received after calling the `getSettings` API to retrieve the persistent data stored for the
 * action.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#didreceivesettings}
 */
export interface DidReceiveSettingsEvent<S extends object = any>
  extends EventBase<"didReceiveSettings">,
    ActionBase<DidReceiveSettingsPayload<S>> {}

export interface DidReceiveGlobalSettingsPayload<S extends object = any> {
  /** This JSON object contains persistently stored data. */
  settings: S;
}

/**
 * Event received after calling the `getGlobalSettings` API to retrieve the global persistent data.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#didreceiveglobalsettings}
 */
export interface DidReceiveGlobalSettingsEvent<S extends object = any>
  extends EventBase<"didReceiveGlobalSettings">,
    ActionBase<DidReceiveGlobalSettingsPayload<S>> {}

export interface KeyPayload<S extends object = any> {
  /** The coordinates of the action triggered. */
  coordinates: Coordinates;
  /** Boolean indicating if the action is inside a Multi-Action. */
  isInMultiAction: boolean;
  /** This JSON object contains data that you can set and are stored persistently. */
  settings: S;
  /**
   * Only set when the action has multiple states defined in its manifest.json.
   * The 0-based value contains the current state of the action.
   */
  state: number; // FIXME
  /**
   * Only set when the action is triggered with a specific value from a Multi-Action.
   * For example, if the user sets the Game Capture Record action to be disabled in a Multi-Action,
   * you would see the value 1.
   * 0 and 1 are valid.
   */
  userDesiredState: 0 | 1;
}

/**
 * When the user presses a key, the plugin will receive the `keyDown` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#keydown}
 */
export interface KeyDownEvent<S extends object = any>
  extends EventBase<"keyDown">,
    ActionBase<KeyPayload<S>> {}

/**
 * When the user releases a key, the plugin will receive the `keyUp` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#keyup}
 */
export interface KeyUpEvent<S extends object = any>
  extends EventBase<"keyUp">,
    ActionBase<KeyPayload<S>> {}

export interface TouchTapPayload<S extends object = any> {
  /** The coordinates of the action triggered. */
  coordinates: Coordinates;
  /** Boolean which is true when long tap happened. */
  hold: boolean;
  /** This JSON object contains data that you can set and are stored persistently. */
  settings: S;
  /**
   * The array which holds (x, y) coordinates as a position of tap inside of LCD slot associated
   * with action.
   */
  tapPos: [x: number, y: number];
}

/**
 * When the user touches the display, the plugin will receive the `touchTap` event (SD+).
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#touchtap}
 */
export interface TouchTapEvent<S extends object = any>
  extends EventBase<"touchTap">,
    ActionBase<TouchTapPayload<S>> {}

/**
 * When the user presses or releases the encoder, the plugin will receive the `dialPress` event
 * (SD+).
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#dialpress}
 */
export interface DialPressEvent extends EventBase<"dialPress"> {
  // TODO
}

/**
 * When the user rotates the encoder, the plugin will receive the `dialRotate` event (SD+).
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#dialrotate}
 */
export interface DialRotateEvent extends EventBase<"dialRotate"> {
  // TODO
}

/**
 * When an instance of an action is displayed on Stream Deck, for example, when the hardware is
 * first plugged in or when a folder containing that action is entered, the plugin will receive a
 * `willAppear` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#willappear}
 */
export interface WillAppearEvent extends EventBase<"willAppear"> {
  // TODO
}

/**
 * When an instance of an action ceases to be displayed on Stream Deck, for example, when switching
 * profiles or folders, the plugin will receive a `willDisappear` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#willdisappear}
 */
export interface WillDisappearEvent extends EventBase<"willDisappear"> {
  // TODO
}

/**
 * When the user changes the title or title parameters, the plugin will receive a
 * `titleParametersDidChange` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#titleparametersdidchange}
 */
export interface TitleParametersDidChangeEvent
  extends EventBase<"titleParametersDidChange"> {
  // TODO
}

/**
 * When a device is plugged to the computer, the plugin will receive a `deviceDidConnect` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#devicedidconnect}
 */
export interface DeviceDidConnectEvent extends EventBase<"deviceDidConnect"> {
  // TODO
}

/**
 * When a device is unplugged from the computer, the plugin will receive a `deviceDidDisconnect`
 * event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#devicediddisconnect}
 */
export interface DeviceDidDisconnectEvent
  extends EventBase<"deviceDidDisconnect"> {
  // TODO
}

/**
 * When a monitored application is launched, the plugin will receive the `applicationDidLaunch`
 * event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#applicationdidlaunch}
 */
export interface ApplicationDidLaunchEvent
  extends EventBase<"applicationDidLaunch"> {
  // TODO
}

/**
 * When a monitored application is terminated, the plugin will receive the `applicationDidTerminate`
 * event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#applicationdidterminate}
 */
export interface ApplicationDidTerminateEvent
  extends EventBase<"applicationDidTerminate"> {
  // TODO
}

/**
 * When the computer wakes up, the plugin will receive the `systemDidWakeUp` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#systemdidwakeup}
 */
export interface SystemDidWakeUpEvent extends EventBase<"systemDidWakeUp"> {
  // TODO
}

/**
 * Event received when the Property Inspector appears in the Stream Deck user interface, for
 * example, when selecting a new instance.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#propertyinspectordidappear}
 */
export interface PropertyInspectorDidAppearEvent
  extends EventBase<"propertyInspectorDidAppear"> {
  // TODO
}

/**
 * Event received when the Property Inspector is removed from the Stream Deck user interface, for
 * example, when selecting a different instance.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#propertyinspectordiddisappear}
 */
export interface PropertyInspectorDidDisappearEvent
  extends EventBase<"propertyInspectorDidDisappear"> {
  // TODO
}

export type CommonReceiveEvent =
  | DidReceiveSettingsEvent
  | DidReceiveGlobalSettingsEvent;

export type PluginReceiveEvent =
  | ApplicationDidLaunchEvent
  | ApplicationDidTerminateEvent
  | CommonReceiveEvent
  | DeviceDidConnectEvent
  | DeviceDidDisconnectEvent
  | DialPressEvent
  | DialRotateEvent
  | KeyDownEvent
  | KeyUpEvent
  | PropertyInspectorDidAppearEvent
  | PropertyInspectorDidDisappearEvent
  | SendToPluginEvent
  | SendToPropertyInspectorEvent
  | SystemDidWakeUpEvent
  | TitleParametersDidChangeEvent
  | TouchTapEvent
  | WillAppearEvent
  | WillDisappearEvent;

export type PropertyInspectorReceiveEvent =
  | CommonReceiveEvent
  | SendToPropertyInspectorEvent;
