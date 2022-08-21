/* eslint-disable @typescript-eslint/no-explicit-any */
export type IEventListener<P> = (payload: P) => void;

export class EventsRegistry<T1 extends Record<string, any>> {
  readonly listeners: Record<string, IEventListener<any>[]> = {};

  readonly addListener = <T2 extends keyof T1>(
    eventType: T2,
    listener: IEventListener<T1[T2]>,
  ) => {
    let arr = this.listeners[eventType as string];

    if (!Array.isArray(arr)) {
      arr = [];
      this.listeners[eventType as string] = arr;
    }

    arr.push(listener);

    return () => {
      this.removeListener(eventType, listener);
    };
  };

  readonly emit = <T2 extends keyof T1>(eventType: T2, payload: T1[T2]) => {
    const arr = this.listeners[eventType as string];

    if (arr && arr.length) {
      for (const listener of arr) {
        listener(payload);
      }
    }

    return this;
  };

  private readonly removeListener = <T2 extends keyof T1>(
    eventType: T2,
    listener: IEventListener<T1[T2]>,
  ) => {
    const arr = this.listeners[eventType as string];

    if (arr) {
      const idx = arr.indexOf(listener);
      arr.splice(idx, 1);
    }
  };
}
