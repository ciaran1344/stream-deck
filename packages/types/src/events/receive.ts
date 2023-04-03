// https://developer.elgato.com/documentation/stream-deck/sdk/events-received/

import { Action, ActionDescriptor } from "../actions";
import { Device } from "../registration";
import { EventBase } from "./common";
import { SendToPluginEvent, SendToPropertyInspectorEvent } from "./send";

interface EventAction<E extends string, P extends object> extends EventBase<E>, Action<P> {}

export interface Coordinates {
  column: number;
  row: number;
}

interface PayloadBase<S extends object> {
  /** The coordinates of the action triggered. */
  coordinates: Coordinates;
  /** This JSON object contains persistently stored data. */
  settings: S;
}

export interface DidReceiveSettingsPayload<S extends object = any> extends PayloadBase<S> {
  /** Boolean indicating if the action is inside a Multi-Action. */
  isInMultiAction: boolean;

  /**
   * Only set when the action has multiple states defined in its manifest.json.
   * The 0-based value contains the current state of the action.
   */
  state?: number;
}

/**
 * Event received after calling the `getSettings` API to retrieve the persistent data stored for the
 * action.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#didreceivesettings}
 */
export interface DidReceiveSettingsEvent<S extends object = any>
  extends EventAction<"didReceiveSettings", S> {}

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
  extends EventAction<"didReceiveGlobalSettings", DidReceiveGlobalSettingsPayload<S>> {}

export interface KeyDownPayload<S extends object = any> extends PayloadBase<S> {
  /** Boolean indicating if the action is inside a Multi-Action. */
  isInMultiAction: boolean;
  /**
   * Only set when the action has multiple states defined in its manifest.json.
   * The 0-based value contains the current state of the action.
   */
  state: number; // FIXME
  /**
   * Only set when the action is triggered with a specific value from a Multi-Action.
   * For example, if the user sets the Game Capture Record action to be disabled in a Multi-Action,
   * you would see the value 1.
   */
  userDesiredState: 0 | 1;
}

/**
 * When the user presses a key, the plugin will receive the `keyDown` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#keydown}
 */
export interface KeyDownEvent<S extends object = any>
  extends EventAction<"keyDown", KeyDownPayload<S>> {}

export interface KeyUpPayload<S extends object = any> extends KeyDownPayload<S> {}

/**
 * When the user releases a key, the plugin will receive the `keyUp` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#keyup}
 */
export interface KeyUpEvent<S extends object = any> extends EventAction<"keyUp", KeyUpPayload<S>> {}

export interface TouchTapPayload<S extends object = any> extends PayloadBase<S> {
  /** Boolean which is true when long tap happened. */
  hold: boolean;
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
  extends EventAction<"touchTap", TouchTapPayload<S>> {}

export interface DialPressPayload<S extends object = any> extends PayloadBase<S> {
  /**	Boolean which is `true` on encoder pressed, else `false` on released. */
  pressed: boolean;
}

/**
 * When the user presses or releases the encoder, the plugin will receive the `dialPress` event
 * (SD+).
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#dialpress}
 */
export interface DialPressEvent<S extends object = any>
  extends EventAction<"dialPress", DialPressPayload<S>> {}

export interface DialRotatePayload<S extends object = any> extends DialPressPayload<S> {
  /**
   * The integer which holds the number of "ticks" on encoder rotation.
   * Positive values are for clockwise rotation, negative values are for counterclockwise
   * rotation, zero value is never happen.
   */
  ticks: number;
}

/**
 * When the user rotates the encoder, the plugin will receive the `dialRotate` event (SD+).
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#dialrotate}
 */
export interface DialRotateEvent<S extends object = any>
  extends EventAction<"dialRotate", DialRotatePayload<S>> {}

export interface WillAppearPayload<S extends object = any> extends PayloadBase<S> {
  /**	The string holds the name of the controller of the current action. */
  controller: "Encoder" | "Keypad";
  /**	Boolean indicating if the action is inside a Multi-Action. */
  isInMultiAction: boolean;
  /**
   * Only set when the action has multiple states defined in its manifest.json.
   * The 0-based value contains the current state of the action.
   */
  state: number;
}

/**
 * When an instance of an action is displayed on Stream Deck, for example, when the hardware is
 * first plugged in or when a folder containing that action is entered, the plugin will receive a
 * `willAppear` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#willappear}
 */
export interface WillAppearEvent<S extends object = any>
  extends EventAction<"willAppear", WillAppearPayload<S>> {}

export interface WillDisappearPayload<S extends object = any> extends WillAppearPayload<S> {}

/**
 * When an instance of an action ceases to be displayed on Stream Deck, for example, when switching
 * profiles or folders, the plugin will receive a `willDisappear` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#willdisappear}
 */
export interface WillDisappearEvent<S extends object = any>
  extends EventAction<"willDisappear", WillDisappearPayload<S>> {}

export interface TitleParameters {
  /** The font family for the title. */
  fontFamily: string;
  /** The font size for the title. */
  fontSize: number;
  /** The font style for the title. */
  fontStyle: string;
  /** Boolean indicating an underline under the title. */
  fontUnderline: boolean;
  /** Boolean indicating if the title is visible. */
  showTitle: boolean;
  /** Vertical alignment of the title. */
  titleAlignment: "bottom" | "middle" | "top";
  /** Title color. */
  titleColor: string;
}

export interface TitleParametersDidChangePayload<S extends object = any> extends PayloadBase<S> {
  /**
   * This value indicates which state of the action the title or title parameters have been changed.
   */
  state: number;
  /** The new title. */
  title: string;
  /** A JSON object describing the new title parameters. */
  titleParameters: TitleParameters;
}

/**
 * When the user changes the title or title parameters, the plugin will receive a
 * `titleParametersDidChange` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#titleparametersdidchange}
 */
export interface TitleParametersDidChangeEvent<S extends object = any>
  extends EventAction<"titleParametersDidChange", TitleParametersDidChangePayload<S>> {}

export interface DeviceInfo extends Omit<Device, "id"> {}

/**
 * When a device is plugged to the computer, the plugin will receive a `deviceDidConnect` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#devicedidconnect}
 */
export interface DeviceDidConnectEvent extends EventBase<"deviceDidConnect"> {
  /** A value to identify the device. */
  device: string;
  /** A JSON object containing information about the device. */
  deviceInfo: DeviceInfo;
}

/**
 * When a device is unplugged from the computer, the plugin will receive a `deviceDidDisconnect`
 * event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#devicediddisconnect}
 */
export interface DeviceDidDisconnectEvent extends EventBase<"deviceDidDisconnect"> {
  /** A value to identify the device. */
  device: string;
}

export interface ApplicationDidLaunchPayload {
  /** The identifier of the application that has been launched. */
  application: string;
}

/**
 * When a monitored application is launched, the plugin will receive the `applicationDidLaunch`
 * event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#applicationdidlaunch}
 */
export interface ApplicationDidLaunchEvent extends EventBase<"applicationDidLaunch"> {
  /** A JSON object. */
  payload: ApplicationDidLaunchPayload;
}

export interface ApplicationDidTerminatePayload extends ApplicationDidLaunchPayload {}

/**
 * When a monitored application is terminated, the plugin will receive the `applicationDidTerminate`
 * event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#applicationdidterminate}
 */
export interface ApplicationDidTerminateEvent extends EventBase<"applicationDidTerminate"> {
  /** A JSON object. */
  payload: ApplicationDidTerminatePayload;
}

/**
 * When the computer wakes up, the plugin will receive the `systemDidWakeUp` event.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#systemdidwakeup}
 */
export interface SystemDidWakeUpEvent extends EventBase<"systemDidWakeUp"> {}

/**
 * Event received when the Property Inspector appears in the Stream Deck user interface, for
 * example, when selecting a new instance.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#propertyinspectordidappear}
 */
export interface PropertyInspectorDidAppearEvent
  extends EventBase<"propertyInspectorDidAppear">,
    ActionDescriptor {}

/**
 * Event received when the Property Inspector is removed from the Stream Deck user interface, for
 * example, when selecting a different instance.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-received/#propertyinspectordiddisappear}
 */
export interface PropertyInspectorDidDisappearEvent
  extends EventBase<"propertyInspectorDidDisappear">,
    ActionDescriptor {}

export type CommonReceiveEvent = DidReceiveSettingsEvent | DidReceiveGlobalSettingsEvent;

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
  | SystemDidWakeUpEvent
  | TitleParametersDidChangeEvent
  | TouchTapEvent
  | WillAppearEvent
  | WillDisappearEvent;

export type PropertyInspectorReceiveEvent = CommonReceiveEvent | SendToPropertyInspectorEvent;
