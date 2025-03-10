import type { StoreDataType } from '~/types';
import { isStoredData } from '~/store/local-storage/index.ts';

const PREFIX = 'zagorky: decision-making-tool';

function setDataToLS(data: StoreDataType): void {
  localStorage.setItem(`${PREFIX}`, JSON.stringify(data));
}

function getDataFromLS(): StoreDataType {
  const defaultData: StoreDataType = {
    optionList: { list: [], lastID: 1 },
    isSoundOn: true,
  };

  try {
    const dataFromLS = localStorage.getItem(`${PREFIX}`);

    if (!dataFromLS) {
      return defaultData;
    }
    const parsedData: unknown = JSON.parse(dataFromLS);

    if (!isStoredData(parsedData)) {
      return defaultData;
    }
    return parsedData;
  } catch {
    return defaultData;
  }
}

export { setDataToLS, getDataFromLS };
