import type { Option, OptionList, StoreDataType } from '~/types';

export function isStoredData(object: unknown): object is StoreDataType {
  return (
    isObject(object) &&
    'optionList' in object &&
    'isSoundOn' in object &&
    isOptionList(object.optionList) &&
    typeof object.isSoundOn === 'boolean'
  );
}

export function isOptionList(object: unknown): object is OptionList {
  return (
    isObject(object) &&
    'list' in object &&
    'lastID' in object &&
    Array.isArray(object.list) &&
    object.list.every(isOption) &&
    typeof object.lastID === 'number'
  );
}

export function isOption(object: unknown): object is Option {
  return (
    isObject(object) &&
    typeof object.id === 'string' &&
    typeof object.title === 'string' &&
    typeof object.weight === 'string'
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
