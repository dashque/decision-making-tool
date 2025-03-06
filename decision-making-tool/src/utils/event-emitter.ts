import type { EmitterCallback, EmitterEvents, EventEmitterType } from '~/types';
import { assertIsNonNullable } from '~/utils/helpers.ts';

function createEventEmitter(): EventEmitterType {
  const eventMap = new Map<EmitterEvents, EmitterCallback[]>();
  return {
    eventMap,
    on(event: EmitterEvents, callback: EmitterCallback): void {
      if (!this.eventMap.has(event)) {
        this.eventMap.set(event, []);
      }
      this.eventMap.get(event)?.push(callback);
    },

    remove(event: EmitterEvents, callback: EmitterCallback): void {
      if (this.eventMap.has(event)) {
        const callbacks = this.eventMap.get(event)?.filter((callback_) => callback_ !== callback);
        assertIsNonNullable(callbacks);
        this.eventMap.set(event, callbacks);
      }
    },

    emit(event: EmitterEvents, ...data: unknown[]): void {
      if (this.eventMap.has(event)) {
        this.eventMap.get(event)?.forEach((callback) => callback(...data));
      }
    },
  };
}

export { createEventEmitter };
