export function createSelectorFactory<State>() {
  return <T>(selector: (state: State) => T) =>
    (stateA: State) =>
      selector(stateA);
}
