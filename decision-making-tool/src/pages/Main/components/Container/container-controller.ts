import type { MainActionKey, StoreDataType } from '~/types';
import { assertIsInstanceOf, isActionKey } from '~/utils/helpers.ts';
import { historyResolver } from '~/router.ts';
import { model } from '~/pages/Main/components/Container/container-model.ts';
import { inputFile } from '~/pages/Main/components/Container/container-view.ts';
import { isStoredData } from '~/store/local-storage';

const actions: Record<MainActionKey, (data?: StoreDataType) => void> = {
  addOption: (): void => model.addOption(),
  clearList: (): void => model.clearOptions(),
  saveList: (): void => model.saveToFile(),
  loadList: (data?: StoreDataType): void => {
    inputFile.click();
    if (data) {
      model.loadFromFile(data);
    }
  },
  start: (): void => {
    historyResolver('decisionPicker', '#/decision-picker');
  },
};

function setupEventListeners(signal: AbortSignal, container: HTMLDivElement): void {
  container.addEventListener(
    'click',
    (event) => {
      // event.preventDefault();
      const target = event.target;

      assertIsInstanceOf(HTMLElement, target);
      const actionElement = target.closest('[data-action]');

      if (!actionElement) {
        return;
      }

      assertIsInstanceOf(HTMLElement, actionElement);
      const action = actionElement.dataset.action;

      if (isActionKey<MainActionKey>(action, actions)) {
        actions[action]();
      }
    },
    { signal },
  );

  inputFile.addEventListener(
    'change',
    (event) => {
      const target = event.target;

      assertIsInstanceOf(HTMLInputElement, target);
      const file = target.files?.[0];

      if (!file) {
        return;
      }

      readFile(file)
        .then((data) => {
          if (isStoredData(data)) {
            actions.loadList(data);
          }
        })
        .catch(() => {
          throw new Error('invalid data');
        });
    },
    { signal },
  );
}

async function readFile(file: File): Promise<StoreDataType> {
  const dataFromFile = await file.text();

  const data: unknown = JSON.parse(dataFromFile);

  if (isStoredData(data)) {
    console.log(data);
    return data;
  } else {
    console.log(data);
    throw new Error('invalid data');
  }
}

export { setupEventListeners };
