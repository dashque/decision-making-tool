import { assertIsNonNullable } from '~/utils/helpers.ts';
import { type DataLS, isOptionList, isSoundOption } from './index.ts';

const PREFIX = 'zagorky:';

function setDataToLS(data: DataLS): void {
  Object.keys(data).forEach((key: string) => {
    const storageKey = `${PREFIX}${key}`;
    localStorage.setItem(storageKey, JSON.stringify(data[key]));
  });
}

function getDataFromLS(): DataLS {
  const result: Partial<DataLS> = {
    optionList: [{ list: [] }, { lastID: 0 }],
    sound: { on: true },
  };
  const dataKeys = Object.keys(localStorage).filter((key) => key.startsWith(PREFIX));

  for (const key of dataKeys) {
    const data = localStorage.getItem(key);
    assertIsNonNullable(data);

    const parsedData: unknown = JSON.parse(data);
    const formattedKey = key.replace(PREFIX, '').trim();

    if (formattedKey === 'sound' && isSoundOption(parsedData)) {
      result.sound = parsedData;
    } else if (formattedKey === 'optionList' && isOptionList(parsedData)) {
      result.optionList = parsedData;
    } else {
      console.log(parsedData);
      throw new Error('Error getting data from storage');
    }
  }
  return {
    optionList: result.optionList ?? [{ list: [] }, { lastID: 0 }],
    sound: result.sound ?? { on: true },
  };
}

export { setDataToLS, getDataFromLS };
