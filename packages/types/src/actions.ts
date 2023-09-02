export interface ActionDescriptor {
  /** The action's unique identifier. */
  action: string;
  /** A value identifying the instance's action. */
  context: string;
  /** A value to identify the device. */
  device: string;
}

export interface Action<P extends object> extends ActionDescriptor {
  /** A JSON object. */
  payload: P;
}
