export function arrayFromIterator<T>(
  iterator: Iterator<T, unknown, undefined>,
) {
  const values: T[] = [];
  let next = iterator.next();
  while (!next.done) {
    values.push(next.value as T);
    next = iterator.next();
  }

  return values;
}
