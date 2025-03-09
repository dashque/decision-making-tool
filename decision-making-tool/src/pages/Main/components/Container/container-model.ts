import { Button, Li, Link } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';
import { createOption, createOptionList } from '~/pages/Main/components/Options/options.ts';
import type { MainModelType, Option, StoreDataType, StoreObject } from '~/types';
import { store } from '~/store/store.ts';
import { getDataFromLS } from '~/store/local-storage/local-storage-manager.ts';

function createOptionModel(): MainModelType {
  const options = createOptionList([]);

  //TODO перерисовка при блюре на инпутах, не сохраняются значения в инпутах
  store.on('update', (data) => {
    console.log(options);
    options.replaceChildren();
    data.optionList.list.forEach((option) => {
      drawOption(option, options, store);
    });
  });

  return {
    addOption: (): void => store.add({ title: '', weight: '' }),
    clearOptions: (): void => store.clear(),
    getOptions: () => options,
    saveToFile: (): void => save(getDataFromLS()),
    loadFromFile: (file: File): void => {
      console.log(file);
    },
    pasteOptions: (text: string[]): void => {
      const data = paste(text);
      data.forEach((option) => store.add(option));
      options.append(...text);
    },
  };
}

function save(data: StoreDataType): void {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const link = Link('', URL.createObjectURL(blob));
  link.download = 'option-list.json';
  link.click();
  URL.revokeObjectURL(link.href);
}

function paste(text: string[]): Omit<Option, 'id'>[] {
  return text.map((element) => {
    const lastComma = element.lastIndexOf(',');
    const title = element.slice(lastComma).trim();
    const weight = element.slice(lastComma + 1).trim();
    return {
      title: title,
      weight: weight,
    };
  });
}

//TODO подумать куда и как перенести/переписать
function drawOption(option: Option, options: HTMLUListElement, store: StoreObject): void {
  const { idContainer, titleInput, weightInput, dataId } = createOption(option);
  const optionElement = Li([idContainer, titleInput, weightInput]);
  const deleteButton = Button('Delete');
  replaceCssClass(deleteButton, ['w-108'], ['w-20']);
  deleteButton.addEventListener('click', () => {
    store.remove(option.id);
  });

  titleInput.addEventListener('blur', () => {
    updateOptionField(dataId, 'title', titleInput.value);
  });

  weightInput.addEventListener('blur', () => {
    updateOptionField(dataId, 'weight', weightInput.value);
  });

  optionElement.append(deleteButton);
  options.append(optionElement);
}

function updateOptionField(id: string, field: 'title' | 'weight', value: string): void {
  store.update({
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

const model = createOptionModel();

export { model };
