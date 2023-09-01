// https://docs.elgato.com/sdk/plugins/events-sent

import { Item } from "../layouts";
import { EventBase } from "./common";

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#setsettings}
 */
export interface SetSettingsEvent extends EventBase<"setSettings"> {
  /**
   * A value to identify the instance's action or Property Inspector.
   * This value is received by the Property Inspector as a parameter of the
   * `connectElgatoStreamDeckSocket` function.
   */
  context: string;
  /** A JSON object which is persistently saved for the action's instance. */
  payload: object;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#getsettings}
 */
export interface GetSettingsEvent extends EventBase<"getSettings"> {
  /**
   * A value to identify the instance's action or Property Inspector.
   * In the case of the Property Inspector, this value is received by the Property Inspector as
   * parameter of the `connectElgatoStreamDeckSocket` function.
   */
  context: string;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#setglobalsettings}
 */
export interface SetGlobalSettingsEvent extends EventBase<"setGlobalSettings"> {
  /**
   * A value to identify the plugin (`inPluginUUID`) or the Property Inspector
   * (`inPropertyInspectorUUID`).
   * This value is received during the Registration procedure.
   */
  context: string;
  /** A JSON object which is persistently saved globally. */
  payload: object;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#getglobalsettings}
 */
export interface GetGlobalSettingsEvent extends EventBase<"getGlobalSettings"> {
  /**
   * A value to identify the plugin (`inPluginUUID`) or the Property Inspector
   * (`inPropertyInspectorUUID`).
   * This value is received during the Registration procedure.
   */
  context: string;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#openurl}
 */
export interface OpenUrlEvent extends EventBase<"openUrl"> {
  /** A JSON object. */
  payload: {
    /** An URL to open in the default browser. */
    url: string;
  };
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#logmessage}
 */
export interface LogMessageEvent extends EventBase<"logMessage"> {
  /** A JSON object. */
  payload: {
    /** A string to write to the logs file. */
    message: string;
  };
}

export enum SetTarget {
  /** The hardware and software. */
  Both,
  /** Only on The hardware. */
  Hardware,
  /** Only on The software. */
  Software,
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#settitle}
 */
export interface SetTitleEvent extends EventBase<"setTitle"> {
  /** A value to identify the instance's action you want to modify. */
  context: string;
  /** A JSON object. */
  payload: {
    /**
     * Specify if you want to display the title on
     * - the hardware and software (0),
     * - only on the hardware (1),
     * - or only on the software (2).
     *
     * Default is 0.
     */
    target: SetTarget;
    /**
     * The title to display.
     * If there is no title parameter, the title is reset to the title set by the user.
     */
    title: string;
    /**
     * A 0-based integer value representing the state of an action with multiple states.
     * If not specified, the title is set to all states.
     */
    state: number;
  };
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#setimage}
 */
export interface SetImageEvent extends EventBase<"setImage"> {
  /** A value to identify the instance's action you want to modify. */
  context: string;
  /** A JSON object. */
  payload: {
    /**
     * The image to display encoded in base64 with the image format declared in the mime type
     * (PNG, JPEG, BMP, ...). svg is also supported.
     * If not provided, the image is reset to the default image from the manifest.
     */
    image: string;
    /**
     * Specify if you want to display the image on
     * - the hardware and software (0),
     * - only on the hardware (1),
     * - or only on the software (2).
     *
     * Default is 0.
     */
    target: SetTarget;
    /**
     * A 0-based integer value representing the state of an action with multiple states.
     * If not specified, the image is set to all states.
     */
    state: number;
  };
}

type EditableItemMap = {
  [I in Item as I["type"]]: Partial<Omit<I, "rect" | "type">> & Pick<I, "key">;
};

export type EditableItem = EditableItemMap[keyof EditableItemMap];

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#setfeedback}
 */
export interface SetFeedbackEvent extends EventBase<"setFeedback"> {
  context: string;
  payload: EditableItem;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#setfeedbacklayout}
 */
export interface SetFeedbackLayoutEvent extends EventBase<"setFeedbackLayout"> {
  context: string;
  payload: {
    /**
     * A predefined layout identifier or the relative path to a json file that contains a custom
     * layout.
     */
    layout: string;
  };
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#showalert}
 */
export interface ShowAlertEvent extends EventBase<"showAlert"> {
  /** A value to identify the instance's action. */
  context: string;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#showok}
 */
export interface ShowOkEvent extends EventBase<"showOk"> {
  /** A value to identify the instance's action. */
  context: string;
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#setstate}
 */
export interface SetStateEvent extends EventBase<"setState"> {
  /** A value to identify the instance's action. */
  context: string;
  /** A JSON object. */
  payload: {
    /** A 0-based integer value representing the state requested. */
    state: number;
  };
}

/**
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#switchtoprofile}
 */
export interface SwitchToProfileEvent extends EventBase<"switchToProfile"> {
  /**
   * A value to identify the plugin.
   * This value should be set to the PluginUUID received during the registration procedure.
   */
  context: string;
  /** A value to identify the device. */
  device: string;
  /** A JSON object. */
  payload: {
    /**
     * The name of the profile to switch to.
     * The name should be identical to the name provided in the manifest.json file.
     */
    profile: string;
  };
}

/**
 * Send a payload to the plugin.
 *
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#sendtoplugin}
 */
export interface SendToPluginEvent extends EventBase<"sendToPlugin"> {
  /**
   * The action's unique identifier.
   * If your plugin supports multiple actions, you should use this value to find out which action
   * was triggered.
   */
  action: string;
  /**
   * A value to identify the Property Inspector.
   * This value is received by the Property Inspector as parameter of the
   * `connectElgatoStreamDeckSocket` function.
   */
  context: string;
  /** A JSON object that will be received by the plugin. */
  payload: object;
}

/**
 * Send a payload to the Property Inspector.
 *
 * {@link https://docs.elgato.com/sdk/plugins/events-sent/#sendtopropertyinspector}
 */
export interface SendToPropertyInspectorEvent extends EventBase<"sendToPropertyInspector"> {
  /** The action's unique identifier. */
  action: string;
  /** A value to identify the instance's action. */
  context: string;
  /** A JSON object that will be received by the Property Inspector. */
  payload: object;
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
