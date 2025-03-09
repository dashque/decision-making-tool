import type { MainActionKey } from '~/types';
import { assertIsInstanceOf, isActionKey } from '~/utils/helpers.ts';
import { historyResolver } from '~/router.ts';
import { model } from '~/pages/Main/components/Container/container-model.ts';

const actions: Record<MainActionKey, () => void> = {
  addOption: (): void => model.addOption(),
  clearList: (): void => model.clearOptions(),
  saveList: (): void => model.saveToFile(),
  start: (): void => {
    historyResolver('decisionPicker', '#/decision-picker');
  },
};

function setupEventListeners(signal: AbortSignal, container: HTMLDivElement): void {
  container.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      const target = event.target;
      assertIsInstanceOf(HTMLElement, target);
      const actionElement = target.closest('[data-action]');
      assertIsInstanceOf(HTMLElement, actionElement);
      const action = actionElement.dataset.action;
      if (isActionKey<MainActionKey>(action, actions)) {
        actions[action]();
      }
    },
    { signal },
  );
}

export { setupEventListeners };
