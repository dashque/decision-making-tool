import { Button, Input, Label, Li, Ul } from '~/utils/factory.ts';
import type { Option } from '~/types';
import { replaceCssClass } from '~/utils/helpers.ts';

function createOption(list: Option): HTMLLIElement {
  const dataId = `#${list.id}`;
  const forId = `option-${dataId}`;
  const deleteButton = Button('delete');
  const titleInput = Input(list.title, forId);
  const weigthInput = Input(list.weight, forId);
  const label = Label(dataId, forId);
  replaceCssClass(deleteButton, 'w-108', 'w-32');
  replaceCssClass(titleInput, 'w-108', 'w-32');
  replaceCssClass(weigthInput, 'w-108', 'w-32');
  return Li([label, titleInput, weigthInput, deleteButton]);
}

function createOptionList(optionList: HTMLLIElement[]): HTMLUListElement {
  return Ul([...optionList]);
}

export { createOption, createOptionList };
