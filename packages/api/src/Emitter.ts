/**
 * Similar to Node.js `EventEmitter`, with a minimal API and generic typing.
 *
 * @template M Event type to event map
 */
export default class Emitter<M extends object> {
  /** Map from event type to Set of event listeners. */
  private eventListeners = new Map<keyof M, Set<(event: any) => void>>();

  /** Remove all listeners for all event types. */
  public clear(): this {
    this.eventListeners.clear();

    return this;
  }

  /** Broadcast an event to all listeners of the event type. */
  public emit<T extends keyof M>(type: T, event: M[T]): this {
    this.eventListeners.get(type)?.forEach((listener) => listener(event));

    return this;
  }

  /** Add a listener for the event type. */
  public addEventListener<T extends keyof M>(
    type: T,
    listener: (event: M[T]) => void,
  ): this {
    const listeners = this.eventListeners.get(type);

    if (listeners) {
      listeners.add(listener);
    } else {
      this.eventListeners.set(type, new Set([listener]));
    }

    return this;
  }

  /** Remove an existing listener for the event type. */
  public removeEventListener<T extends keyof M>(
    type: T,
    listener: (event: M[T]) => void,
  ): this {
    this.eventListeners.get(type)?.delete(listener);

    return this;
  }

  /** Remove all listeners for the event type. */
  public removeEventListeners<T extends keyof M>(type: T): this {
    this.eventListeners.delete(type);

    return this;
  }
}
