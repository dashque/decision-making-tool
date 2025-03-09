import { Button, Link } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';
import { createOption, createOptionList } from '~/pages/Main/components/Options/options.ts';
import type { MainModelType, Option } from '~/types';
import { store } from '~/store/store.ts';

function createOptionModel(): MainModelType {
  const options = createOptionList([]);

  store.on('update', (data) => {
    options.replaceChildren();
    data.optionList.list.forEach((option) => {
      const optionElement = createOption(option);
      const deleteButton = Button('Delete');
      replaceCssClass(deleteButton, ['w-108'], ['w-20']);
      deleteButton.addEventListener('click', () => {
        store.remove(option.id);
      });
      optionElement.append(deleteButton);
      options.append(optionElement);
    });
  });

  return {
    addOption: (): void => store.add({ title: '', weight: '' }),
    clearOptions: (): void => store.clear(),
    getOptions: () => options,
    saveToFile: (): void => save(options),
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

function save(options: HTMLUListElement): void {
  const blob = new Blob([JSON.stringify(options)], { type: 'application/json' });
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

const model = createOptionModel();

export { model };
