import {
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import type { AbstractPointerSensorOptions } from '@dnd-kit/core/dist/sensors';

const options: AbstractPointerSensorOptions = {};

export function useDragSensors() {
  return useSensors(
    useSensor(PointerSensor, options),
    useSensor(MouseSensor, options),
    useSensor(TouchSensor, options),
    useSensor(KeyboardSensor, options),
  );
}
