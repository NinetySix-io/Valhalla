import { ElementSchema } from '@app/entities/elements/schema';
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
      cacheMap[element.id].id = element.id;
      cacheMap[element.id].props = element.props;
      cacheMap[element.id].type = element.type;
    }

    return cacheMap[elementId];
  }

  for (const elementIndex in elementList) {
    const target = elementList[elementIndex];
    const element = grabAndCache(target);
    if (target.isRoot) {
      tree.push(element);
    } else {
      grabAndCache(target.parent).children.push(element);
    }
  }

  return tree;
}
