import { Input, Label, Span, Ul } from '~/utils/factory.ts';
import type { Option } from '~/types';
import { replaceCssClass } from '~/utils/helpers.ts';
import { Button, Li } from '~/utils/factory';
import { store } from '~/store/store';

function createOption(list: Option): {
  idContainer: HTMLSpanElement;
  titleInput: HTMLInputElement;
  weightInput: HTMLInputElement;
  dataId: string;
} {
  const dataId = `${list.id}`;

  const forId = `option-${dataId}`;

  const titleInput = Input(list.title, { id: forId, type: 'text', placeholder: 'Title' });

  const weightInput = Input(list.weight, {
    id: forId,
    type: 'number',
    min: '0',
    step: '1',
    placeholder: 'Weight',
  });

  const idContainer = Span(Label(dataId, forId));

  replaceCssClass(titleInput, ['w-112'], ['w-54']);
  replaceCssClass(weightInput, ['w-112'], ['w-26']);
  replaceCssClass(idContainer, ['w-112'], ['w-10']);

  return { idContainer, titleInput, weightInput, dataId };
}

function createOptionList(optionList: HTMLLIElement[]): HTMLUListElement {
  return Ul([...optionList]);
}

function drawOption(
  options: HTMLUListElement,
  option: Option,
  onDelete: (id: string) => void,
): void {
  const { idContainer, titleInput, weightInput, dataId } = createOption(option);

  const optionElement = Li([idContainer, titleInput, weightInput]);

  const deleteButton = Button('Delete');

  replaceCssClass(deleteButton, ['w-114'], ['w-20']);
  deleteButton.addEventListener('click', () => {
    onDelete(option.id);
  });
  let localTitle = option.title;

  titleInput.value = localTitle;

  let localWeight = option.weight;

  weightInput.value = localWeight;
  titleInput.addEventListener('change', () => {
    localTitle = titleInput.value;
    updateOptionField(dataId, 'title', titleInput.value);
  });

  weightInput.addEventListener('change', () => {
    localWeight = weightInput.value;
    updateOptionField(dataId, 'weight', weightInput.value);
  });

  optionElement.append(deleteButton);
  options.append(optionElement);
}

function updateOptionField(id: string, field: 'title' | 'weight', value: string): void {
  store.update({
    ...store.getData(),
    optionList: {
      list: store
        .getData()
        .optionList.list.map((option) =>
          option.id === id ? { ...option, [field]: value } : option,
        ),
      lastID: store.getData().optionList.lastID,
    },
  });
}

export { drawOption, createOptionList };
