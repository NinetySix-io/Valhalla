import { Observable, firstValueFrom, isObservable } from 'rxjs';

/**
 * It takes a promise, observable, or value and returns a promise
 * @param {Promise<T> | Observable<T> | T} target - Promise<T> | Observable<T> | T
 * @returns A function that returns a promise.
 */
export async function resolveRpcRequest<T>(
  target: Promise<T> | Observable<T> | T,
): Promise<T> {
  return isObservable(target) ? await firstValueFrom(target) : await target;
}
