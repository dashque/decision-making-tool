import { Link } from '~/utils/factory.ts';
import { createOptionList, drawOption } from '~/pages/Main/components/Options/options.ts';
import type { MainModelType, Option, StoreDataType } from '~/types';
import { store } from '~/store/store.ts';
import { getDataFromLS } from '~/store/local-storage/local-storage-manager.ts';
import { Router } from '~/router.ts';
import { createPasteModal, createStartModal } from '~/pages/Main/components/Modal/modal.ts';
import { selectors } from '~/store/selectors';

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

  if (store.useSelector(selectors.isDataEmpty)) {
    store.update(initialData);
  }

  store.on('update', (data) => {
    options.replaceChildren();
    data.optionList.list.forEach((option) => {
      drawOption(options, option, removeOption);
    });
  });

  store.getData().optionList.list.forEach((option) => {
    drawOption(options, option, removeOption);
  });

  return {
    addOption: (): void => {
      const data = store.getData();

      const currentOptions = data.optionList.list.map((option) => ({
        ...option,
        title: option.title,
        weight: option.weight,
      }));

      const newOption = {
        id: `#${String(data.optionList.lastID)}`,
        title: '',
        weight: '',
      };

      store.update({
        ...data,
        optionList: {
          lastID: ++data.optionList.lastID,
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
          id: `#${store.getData().optionList.lastID}`,
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
      if (store.useSelector(selectors.hasDataForStart)) {
        Router.navigate('#/decision-picker');
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

function removeOption(id: string): void {
  const data = store.getData();

  store.update({
    ...data,
    optionList: {
      lastID: data.optionList.lastID,
      list: data.optionList.list.filter((option) => option.id !== id),
    },
  });
}

const model = createOptionModel();

export { model };
