import * as React from 'react';

/**
 * If the node is a React element, clone it with the given props, otherwise return the node.
 */
export function provideProps<P extends object>(
  node: React.ReactNode,
  props: P,
) {
  return React.isValidElement(node)
    ? React.cloneElement(node, {
        ...node.props,
        ...props,
      })
    : node;
}
