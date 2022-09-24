import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

/**
 * Note:
 * We cannot use PointerSensor right now
 * due to unable to disable it dynamically
 *
 * @see maybe https://github.com/clauderic/dnd-kit/issues/88
 */
export function useDragSensors() {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );
}
