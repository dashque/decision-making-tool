import { Button, Div, Link } from '~/utils/factory.ts';
import { model } from '~/pages/Main/components/Container/container-model.ts';

const addOption = Button('Add Options');
const pasteList = Button('Paste List');
const clearList = Button('Clear List');
const saveList = Button('Save List to File');
const loadList = Button('Load List from File');
const start = Button(Link('Start', '#/decision-picker'));
const optionContainer = Div([
  model.getOptions(),
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

export { optionContainer };
