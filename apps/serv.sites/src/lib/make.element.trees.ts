import { ElementSchema } from '@app/entities/elements/schemas/element.schema';
import { HierarchicalElement } from '@app/protobuf';

/**
 * Convert list of elements to hierarchical structure
 */
export function makeElementTrees(
  elementList: ElementSchema[],
): HierarchicalElement[] {
  const tree: HierarchicalElement[] = [];
  const cacheMap: Record<string, HierarchicalElement> = {};

  /**
   * Get element from cache;
   * Build/build-partial if not exists
   */
  function grabAndCache(element: string | ElementSchema): HierarchicalElement {
    const elementId = typeof element === 'string' ? element : element.id;
    if (!cacheMap[elementId]) {
      cacheMap[elementId] = { children: [] } as HierarchicalElement;
    }

    if (typeof element !== 'string') {
      const { id, type, ...props } = element;
      cacheMap[id].id = id;
      cacheMap[id].props = props;
      cacheMap[id].type = type;
    }

    return cacheMap[elementId];
  }

  for (const target of elementList) {
    const element = grabAndCache(target);
    if (target.isRoot) {
      tree.push(element);
    } else {
      grabAndCache(target.parent).children.push(element);
    }
  }

  return tree;
}
