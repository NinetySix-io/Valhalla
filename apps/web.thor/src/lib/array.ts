export function swapArrayIndex<T>(
  list: Array<T>,
  params: {
    fromIndex: number;
    toIndex: number;
  },
) {
  const temp = list[params.fromIndex];
  list[params.fromIndex] = list[params.toIndex];
  list[params.toIndex] = temp;
}
