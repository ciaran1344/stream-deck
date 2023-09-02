export interface EventBase<E extends string> {
  /** Unique event type. */
  event: E;
}
