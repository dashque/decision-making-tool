import type { StoreDataType } from '~/types';

const selectors = {
  hasDataForStart: (s: StoreDataType): boolean =>
    s.optionList.list.length > 1 &&
    s.optionList.list.filter(
      (option) => !Number.isNaN(Number(option.weight)) && Number(option.weight) > 0 && option.title,
    ).length > 1,
  //потом переделать на кортеж из title, weigth
  // getSectors: (s: StoreDataType): [string, number][] =>
  //   s.optionList.list.map((option) => [option.title, Number(option.weight)]),
  getSectors: (s: StoreDataType): number[] =>
    s.optionList.list.map((option) => Number(option.weight)),
  isDataEmpty: (s: StoreDataType): boolean => s.optionList.list.length === 0,
};

export { selectors };
