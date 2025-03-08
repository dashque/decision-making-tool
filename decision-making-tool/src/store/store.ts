import type { EventEmitterType, Option, StoreDataType, StoreObject } from '~/types';
import { createEventEmitter } from '~/utils/event-emitter.ts';
import { getDataFromLS } from '~/store/local-storage/local-storage-manager.ts';

function createAppStore(data: StoreDataType, emitter: EventEmitterType): StoreObject {
  let storeData = structuredClone(data);

  const update = (newData: Partial<StoreDataType>): void => {
    storeData = { ...storeData, ...newData };
    emitter.emit('update', storeData);
  };

  return {
    getData: (): StoreDataType => storeData,
    update,
    clear: (): void => update({ ...storeData, optionList: { list: [], lastID: 1 } }),
    remove: (id: string): void =>
      update({
        ...storeData,
        optionList: {
          lastID: storeData.optionList.lastID,
          list: storeData.optionList.list.filter((option) => option.id !== id),
        },
      }),
    add: (data: Omit<Option, 'id'>): void => {
      const newID = `#${(storeData.optionList.lastID += 1)}`;
      update({
        optionList: {
          list: [...storeData.optionList.list, { id: newID, ...data }],
          lastID: (storeData.optionList.lastID += 1),
        },
      });
    },
  };
}

const context = getDataFromLS();
const emitter = createEventEmitter();
const store = createAppStore(context, emitter);

export { store };
