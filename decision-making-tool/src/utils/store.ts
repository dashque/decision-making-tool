import type { EventEmitterType, Option, StoreDataType, StoreObject } from '~/types';
import { createEventEmitter } from '~/utils/event-emitter.ts';

function createAppStore(data: StoreDataType, emitter: EventEmitterType): StoreObject {
  let storeData = { ...data };

  function update(newData: Partial<StoreDataType>): void {
    storeData = { ...storeData, ...newData };
    emitter.emit('update', storeData);
  }

  function clear(): void {
    storeData = { ...storeData, optionList: { list: [], lastID: 1 } };
    emitter.emit('update', storeData);
  }

  function remove(id: string): void {
    storeData = {
      ...storeData,
      optionList: {
        lastID: storeData.optionList.lastID,
        list: storeData.optionList.list.filter((option) => option.id !== id),
      },
    };
    emitter.emit('update', storeData);
  }

  function add(data: Omit<Option, 'id'>): void {
    const newID = `#${Math.max(storeData.optionList.lastID)}`;
    update({
      optionList: {
        list: [...storeData.optionList.list, { id: newID, ...data }],
        lastID: (storeData.optionList.lastID += 1),
      },
    });
  }

  return {
    getData: (): StoreDataType => storeData,
    update,
    clear,
    remove,
    add,
  };
}

//пробуем

const context = {
  optionList: {
    list: [
      { id: '#1', title: 'dasha', weight: '1' },
      { id: '#2', title: 'dima', weight: '2' },
    ],
    lastID: 2,
  },
  isSoundOn: true,
};

const emitter = createEventEmitter();
const store = createAppStore(context, emitter);

store.update({
  optionList: {
    list: [...store.getData().optionList.list],
    lastID: 1,
  },
});

store.update({ isSoundOn: false });
store.update({
  optionList: {
    list: [...store.getData().optionList.list],
    lastID: (store.getData().optionList.lastID += 1),
  },
});
store.add({ title: 'sasa', weight: '10' });

store.remove('#1');

console.log(store.getData(), 'store');
console.log(store.getData().optionList.list, 'store');

export { createAppStore };
