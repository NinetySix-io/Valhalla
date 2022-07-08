import * as React from 'react';

/**
 * Hook to handle anchoring for MUI menu
 */
export function useAnchor<T extends HTMLElement>() {
  const [anchor, _setAnchor] = React.useState<T>(null);

  function setAnchor(event: React.MouseEvent<T, MouseEvent>) {
    _setAnchor(event.currentTarget);
  }

  function clearAnchor() {
    _setAnchor(null);
  }

  return {
    value: anchor,
    visible: Boolean(anchor),
    setAnchor,
    clearAnchor,
  };
}
