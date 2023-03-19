export interface ActionBase<P extends object> {
  /** The action's unique identifier. */
  // TODO: Make generic
  action: string;
  /** A value identifying the instance's action. */
  context: string;
  /** A value to identify the device. */
  device: string;
  /** A JSON object. */
  payload: P;
}
