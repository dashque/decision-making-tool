import type { SectorsData, StoreDataType } from '~/types';

const selectors = {
  hasDataForStart: (s: StoreDataType): boolean =>
    s.optionList.list.length > 1 &&
    s.optionList.list.filter(
      (option) => !Number.isNaN(Number(option.weight)) && Number(option.weight) > 0 && option.title,
    ).length > 1,
  getSectors: (s: StoreDataType): SectorsData[] =>
    s.optionList.list.map((option) => [option.title, Number(option.weight)]),
  isDataEmpty: (s: StoreDataType): boolean => s.optionList.list.length === 0,
};

export { selectors };
