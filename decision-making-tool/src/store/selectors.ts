import type { StoreDataType } from '~/types';

const selectors = {
  hasDataForStart: (s: StoreDataType): boolean =>
    s.optionList.list.length > 1 &&
    s.optionList.list.filter((option) => Number(option.weight) >= 1).length > 1,
  getSectors: (s: StoreDataType): number[] =>
    s.optionList.list.map((option) => Number(option.weight)),
};

export { selectors };
