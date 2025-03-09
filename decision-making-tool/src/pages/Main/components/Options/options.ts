import { Input, Label, Span, Ul } from '~/utils/factory.ts';
import type { Option } from '~/types';
import { replaceCssClass } from '~/utils/helpers.ts';

function createOption(list: Option): {
  idContainer: HTMLSpanElement;
  titleInput: HTMLInputElement;
  weightInput: HTMLInputElement;
  dataId: string;
} {
  const dataId = `${list.id}`;
  const forId = `option-${dataId}`;
  const titleInput = Input(list.title, forId);
  const weightInput = Input(list.weight, forId);
  const idContainer = Span(Label(dataId, forId));
  replaceCssClass(titleInput, ['w-108'], ['w-54']);
  replaceCssClass(weightInput, ['w-108'], ['w-20']);
  replaceCssClass(idContainer, ['w-108'], ['w-10']);

  return { idContainer, titleInput, weightInput, dataId };
}

function createOptionList(optionList: HTMLLIElement[]): HTMLUListElement {
  return Ul([...optionList]);
}

export { createOption, createOptionList };
