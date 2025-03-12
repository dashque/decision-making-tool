import { Button, Li, Link } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';
import { createOption, createOptionList } from '~/pages/Main/components/Options/options.ts';
import type { MainModelType, Option, StoreDataType } from '~/types';
import { store } from '~/store/store.ts';
import { getDataFromLS } from '~/store/local-storage/local-storage-manager.ts';
import { historyResolver } from '~/router.ts';
import { createPasteModal, createStartModal } from '~/pages/Main/components/Modal/modal.ts';

function createOptionModel(): MainModelType {
  const options = createOptionList([]);

  const initialData = {
    optionList: {
      list: [
        {
          id: '#1',
          title: '',
          weight: '',
        },
      ],
      lastID: 2,
    },
  };

  store.on('update', (data) => {
    options.replaceChildren();
    data.optionList.list.forEach((option) => {
      drawOption(options, option, removeOption);
    });
  });
  if (store.getData().optionList.list.length === 0) {
    store.update(initialData);
  } else {
    store.getData().optionList.list.forEach((option) => {
      drawOption(options, option, removeOption);
    });
  }

  return {
    addOption: (): void => {
      const currentOptions = store.getData().optionList.list.map((option) => ({
        ...option,
        title: option.title,
        weight: option.weight,
      }));

      const newOption = {
        id: `#${String(store.getData().optionList.lastID++)}`,
        title: '',
        weight: '',
      };

      store.update({
        ...store.getData(),
        optionList: {
          lastID: store.getData().optionList.lastID,
          list: [...currentOptions, newOption],
        },
      });
    },

    clearOptions: (): void =>
      store.update({ ...store.getData(), optionList: { list: [], lastID: 1 } }),

    getOptions: () => options,

    saveToFile: (): void => save(getDataFromLS()),

    loadFromFile: (data: StoreDataType): void => {
      model.clearOptions();
      store.update(data);
    },

    pasteOptions: (text: string): void => {
      const data = paste(text);

      data.forEach((option) => {
        const newOption = {
          ...option,
          id: `#${store.getData().optionList.lastID++}`,
        };

        store.update({
          ...store.getData(),
          optionList: {
            lastID: ++store.getData().optionList.lastID,
            list: [...store.getData().optionList.list, newOption],
          },
        });
      });
    },

    openPasteModal: (): void => {
      const modal: HTMLDialogElement = createPasteModal(model.pasteOptions);

      document.body.append(modal);
      modal.showModal();
    },

    redirectToWheel: (): void => {
      if (
        store.getData().optionList.list.length > 1 &&
        store
          .getData()
          .optionList.list.filter(
            (option) => !Number.isNaN(Number(option.weight)) && Number(option.weight) >= 1,
          ).length > 1
      ) {
        historyResolver('decisionPicker', '#/decision-picker');
      } else {
        const modal = createStartModal();

        document.body.append(modal);
        modal.showModal();
      }
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

function paste(text: string): Omit<Option, 'id'>[] {
  return text
    .split('\n')
    .map((element) => {
      element = element.trim();

      if (!element) {
        return null;
      }

      const lastComma = element.lastIndexOf(',');

      if (lastComma === -1) {
        return null;
      }

      const title = element.slice(0, lastComma).trim();

      const weight = Number(element.slice(lastComma + 1).trim());

      if (!title || Number.isNaN(weight) || Number(weight) < 0) {
        return null;
      }

      return {
        title: title,
        weight: String(weight),
      };
    })
    .filter((element) => element !== null);
}

// TODO подумать как поделить и и куда переместить
function drawOption(
  options: HTMLUListElement,
  option: Option,
  onDelete: (id: string) => void,
): void {
  const { idContainer, titleInput, weightInput, dataId } = createOption(option);

  const optionElement = Li([idContainer, titleInput, weightInput]);

  const deleteButton = Button('Delete');

  replaceCssClass(deleteButton, ['w-108'], ['w-20']);
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
    const isValid = /^\d*\.?\d*$/.test(weightInput.value);

    if (isValid) {
      localWeight = weightInput.value;
      updateOptionField(dataId, 'weight', weightInput.value);
      return;
    }

    weightInput.value = '';
  });

  optionElement.append(deleteButton);
  options.append(optionElement);
}

function removeOption(id: string): void {
  store.update({
    ...store.getData(),
    optionList: {
      lastID: store.getData().optionList.lastID,
      list: store.getData().optionList.list.filter((option) => option.id !== id),
    },
  });
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

const model = createOptionModel();

export { model };
