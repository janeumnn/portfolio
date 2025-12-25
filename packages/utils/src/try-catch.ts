export type Result<T, E = Error> = [T, undefined] | [undefined, E];

export function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>>;
export function tryCatch<T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>>;
export function tryCatch<T, E = Error>(fn: () => T): Result<T, E>;

export function tryCatch<T, E = Error>(
  fnOrPromise: Promise<T> | (() => T) | (() => Promise<T>)
): Promise<Result<T, E>> | Result<T, E> {
  try {
    const payload = typeof fnOrPromise === 'function' ? fnOrPromise() : fnOrPromise;

    if (payload && typeof (payload as PromiseLike<unknown>).then === 'function') {
      return Promise.resolve(payload)
        .then((data) => [data, undefined] as Result<T, E>)
        .catch((error) => [undefined, error as E] as Result<T, E>);
    }

    return [payload, undefined] as Result<T, E>;
  } catch (error) {
    return [undefined, error as E] as Result<T, E>;
  }
}
