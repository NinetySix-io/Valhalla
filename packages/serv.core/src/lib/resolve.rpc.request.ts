import { Observable, firstValueFrom, isObservable } from 'rxjs';

/**
 * It takes a promise, observable, or value and returns a promise
 */
export async function resolveRpcRequest<T>(
  target: Promise<T> | Observable<T> | T,
): Promise<T> {
  return isObservable(target) ? await firstValueFrom(target) : await target;
}
