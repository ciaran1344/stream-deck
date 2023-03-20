export interface ActionBase<A extends string, P extends object> {
  /** The action's unique identifier. */
  action: A;
  /** A value identifying the instance's action. */
  context: string;
  /** A value to identify the device. */
  device: string;
  /** A JSON object. */
  payload: P;
}
