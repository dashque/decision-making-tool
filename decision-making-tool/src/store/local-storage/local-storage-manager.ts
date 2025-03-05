import { assertIsNonNullable } from '~/utils';
import { isOptionList, isSoundOption, type DataLS } from '.';

// const data = {
//   optionList: [{ list: { id: '#1', title: 'dasha', weight: '1' } }, { lastID: 1 }],
//   sound: { on: true },
// };

function setDataToLS(data: DataLS): void {
  Object.keys(data).forEach((key: string) => {
    const storageKey = `zagorky:${key}`;
    localStorage.setItem(storageKey, JSON.stringify(data[key]));
  });
}

function getDataFromLS(): DataLS {
  const result: DataLS = {};
  const dataKeys = Object.keys(localStorage).filter((key) => key.startsWith('zagorky:'));

  for (const key of dataKeys) {
    const data = localStorage.getItem(key);
    assertIsNonNullable(data);
    const parsedData: unknown = JSON.parse(data);
    const formattedKey = key.replace('zagorky:', '').trim();

    if (isSoundOption(parsedData)) {
      result[formattedKey] = parsedData;
    } else if (isOptionList(parsedData)) {
      result[formattedKey] = parsedData;
    } else {
      throw new Error('Error getting data from storage');
    }
  }
  return result;
}

export { setDataToLS, getDataFromLS };
