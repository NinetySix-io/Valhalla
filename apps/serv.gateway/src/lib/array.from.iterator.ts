export function arrayFromIterator<T>(
  iterator: Iterator<T, unknown, undefined>,
) {
  const values: T[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const nextElement = iterator.next();
    if (nextElement.done) {
      return values;
    }

    values.push(nextElement.value as T);
  }
}
