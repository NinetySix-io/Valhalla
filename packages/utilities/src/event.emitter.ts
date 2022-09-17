/* eslint-disable @typescript-eslint/no-explicit-any */

export type IEventListener<P> = (payload: P) => void;

export class EventsEmitter<T1 extends Record<string, any>> {
  readonly listeners: Record<string, IEventListener<any>[]> = {};

  /**
   * It adds a listener to the listeners object, and returns a function that removes the listener
   */
  addListener<T2 extends keyof T1>(
    eventType: T2,
    listener: IEventListener<T1[T2]>,
  ) {
    const key = eventType as string;
    let arr = this.listeners[key];

    if (!Array.isArray(arr)) {
      arr = [];
      this.listeners[key] = arr;
    }

    arr.push(listener);

    return () => {
      this.removeListener(eventType, listener);
    };
  }

  /**
   * It takes an event type and a payload, and then calls all the listeners for that event type with
   * the payload
   */
  emit<T2 extends keyof T1>(eventType: T2, payload: T1[T2]) {
    const arr = this.listeners[eventType as string];
    if (arr && arr.length) {
      for (const listener of arr) {
        listener?.(payload);
      }
    }

    return this;
  }

  /**
   * Remove the listener from the array of listeners for the given event type.
   */
  private removeListener<T2 extends keyof T1>(
    eventType: T2,
    listener: IEventListener<T1[T2]>,
  ) {
    const arr = this.listeners[eventType as string];

    if (arr) {
      const idx = arr.indexOf(listener);
      arr.splice(idx, 1);
    }
  }
}
