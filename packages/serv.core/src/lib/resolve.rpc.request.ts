import * as rx from 'rxjs';

/**
 * It takes a promise, observable, or value and returns a promise
 * @param {Promise<T> | rx.Observable<T> | T} target - Promise<T> | rx.Observable<T> | T
 * @returns A function that takes a target and returns a promise.
 */
export async function resolveRpcRequest<T>(
  target: Promise<T> | rx.Observable<T> | T,
): Promise<T> {
  return rx.isObservable(target) ? await rx.firstValueFrom(target) : target;
}
