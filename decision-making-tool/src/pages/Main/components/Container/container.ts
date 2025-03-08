import { Button, Div, Link } from '~/utils/factory.ts';
import { historyResolver } from '~/router.ts';
import { createOption, createOptionList } from '~/pages/Main/components/Options/options.ts';
import { assertIsInstanceOf, isActionKey, replaceCssClass } from '~/utils/helpers.ts';
import type { MainActionKey } from '~/types';
import { createBlob } from '~/utils/blob.ts';

const addOption = Button('Add Options');
const pasteList = Button('Paste List');
const clearList = Button('Clear List');
const saveList = Button('Save List to File');
const loadList = Button('Load List from File');
const start = Button(Link('Start', '#/decision-picker'));
const optionList = createOptionList([]);
const optionContainer = Div([
  optionList,
  addOption,
  pasteList,
  clearList,
  saveList,
  loadList,
  start,
]);

addOption.dataset.action = 'addOption';
clearList.dataset.action = 'clearList';
saveList.dataset.action = 'saveList';
start.dataset.action = 'start';

const actions: Record<MainActionKey, () => void> = {
  addOption: (): void => {
    const deleteButton = Button('Delete');
    replaceCssClass(deleteButton, ['w-108'], ['w-32']);

    const option = createOption({ id: '1', title: '', weight: '' });
    option.append(deleteButton);
    deleteButton.addEventListener('click', () => {
      option.remove();
    });

    optionList.append(option);
  },

  clearList: (): void => {
    optionList.replaceChildren();
  },
  saveList: (): void => {
    {
      const link = Link('', createBlob(''));
      link.download = 'option-list.json';
      link.click();
      URL.revokeObjectURL(link.href);
    }
  },
  start: (): void => {
    historyResolver('decisionPicker', '#/decision-picker');
  },
};

function drawContainer(signal: AbortSignal): HTMLDivElement {
  optionContainer.addEventListener(
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
  return optionContainer;
}

export { drawContainer };
