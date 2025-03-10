import type { StoreDataType, StoreObject } from '~/types';
import { createEventEmitter } from '~/utils/event-emitter.ts';
import { getDataFromLS, setDataToLS } from '~/store/local-storage/local-storage-manager.ts';

function createAppStore(data: StoreDataType): StoreObject {
  let storeData = structuredClone(data);

  const emitter = createEventEmitter();

  const update = (newData: Partial<StoreDataType>): void => {
    storeData = { ...storeData, ...newData };
    emitter.emit('update', storeData);
    setDataToLS(storeData);
  };

  return {
    getData: (): StoreDataType => storeData,
    on: (event, callback) => emitter.on(event, callback),
    off: (event, callback) => emitter.off(event, callback),
    update,
  };
}

const context = getDataFromLS();

const store = createAppStore(context);

export { store };
