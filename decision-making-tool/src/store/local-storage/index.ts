export type OptionList = ({ list: List[] } | { lastID: number })[];

type List = {
  id: string;
  title: string;
  weight: string;
};

export type SoundOption = Record<string, boolean>;

export type DataLS = Record<string, OptionList | SoundOption>;

export function isSoundOption(object: unknown): object is SoundOption {
  if (typeof object !== 'object' || object === null) return false;
  return Object.values(object).every((value) => typeof value === 'boolean');
}

export function isOptionList(object: unknown): object is OptionList {
  if (!Array.isArray(object)) {
    return false;
  }

  return object.every((item) => {
    if (!isObject(item)) {
      return false;
    }

    if ('list' in item) {
      return Array.isArray(item.list) && item.list.every(isList);
    }

    if ('lastID' in item) {
      return typeof item.lastID === 'number';
    }

    return false;
  });
}

export function isList(object: unknown): object is List {
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
