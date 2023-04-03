// https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/

import { Item } from "../layouts";
import { EventBase } from "./common";

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setsettings}
 */
export interface SetSettingsEvent extends EventBase<"setSettings"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#getsettings}
 */
export interface GetSettingsEvent extends EventBase<"getSettings"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setglobalsettings}
 */
export interface SetGlobalSettingsEvent extends EventBase<"setGlobalSettings"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#getglobalsettings}
 */
export interface GetGlobalSettingsEvent extends EventBase<"getGlobalSettings"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#openurl}
 */
export interface OpenUrlEvent extends EventBase<"openUrl"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#logmessage}
 */
export interface LogMessageEvent extends EventBase<"logMessage"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#settitle}
 */
export interface SetTitleEvent extends EventBase<"setTitle"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setimage}
 */
export interface SetImageEvent extends EventBase<"setImage"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setfeedback}
 */
export interface SetFeedbackEvent extends EventBase<"setFeedback"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setfeedbacklayout}
 */
export interface SetFeedbackLayoutEvent extends EventBase<"setFeedbackLayout"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#showalert}
 */
export interface ShowAlertEvent extends EventBase<"showAlert"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#showok}
 */
export interface ShowOkEvent extends EventBase<"showOk"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setstate}
 */
export interface SetStateEvent extends EventBase<"setState"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#switchtoprofile}
 */
export interface SwitchToProfileEvent extends EventBase<"switchToProfile"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#settitle}
 */
export interface SetTitleEvent extends EventBase<"setTitle"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setimage}
 */
export interface SetImageEvent extends EventBase<"setImage"> {
  // TODO
}

type EditableItemMap = {
  [I in Item as I["type"]]: Partial<Omit<I, "rect" | "type">> & Pick<I, "key">;
};

export type EditableItem = EditableItemMap[keyof EditableItemMap];

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setfeedback}
 */
export interface SetFeedbackEvent extends EventBase<"setFeedback"> {
  context: string;
  payload: EditableItem;
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setfeedbacklayout}
 */
export interface SetFeedbackLayoutEvent extends EventBase<"setFeedbackLayout"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#showalert}
 */
export interface ShowAlertEvent extends EventBase<"showAlert"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#showok}
 */
export interface ShowOkEvent extends EventBase<"showOk"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#setstate}
 */
export interface SetStateEvent extends EventBase<"setState"> {
  // TODO
}

/**
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#switchtoprofile}
 */
export interface SwitchToProfileEvent extends EventBase<"switchToProfile"> {
  // TODO
}

/**
 * Send a payload to the plugin.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#sendtoplugin}
 */
export interface SendToPluginEvent extends EventBase<"sendToPlugin"> {
  // TODO
}

/**
 * Send a payload to the Property Inspector.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/#sendtopropertyinspector}
 */
export interface SendToPropertyInspectorEvent extends EventBase<"sendToPropertyInspector"> {
  // TODO
}

export type CommonSendEvent =
  | GetGlobalSettingsEvent
  | GetSettingsEvent
  | LogMessageEvent
  | OpenUrlEvent
  | SetGlobalSettingsEvent
  | SetSettingsEvent;

export type PluginSendEvent =
  | CommonSendEvent
  | SetTitleEvent
  | SetImageEvent
  | SetFeedbackEvent
  | SetFeedbackLayoutEvent
  | ShowAlertEvent
  | ShowOkEvent
  | SetStateEvent
  | SwitchToProfileEvent
  | SendToPropertyInspectorEvent;

export type PropertyInspectorSendEvent = CommonSendEvent | SendToPluginEvent;
