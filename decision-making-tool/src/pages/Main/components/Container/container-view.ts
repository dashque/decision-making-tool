import { Button, Div, Input } from '~/utils/factory.ts';
import { model } from '~/pages/Main/components/Container/container-model.ts';

const addOption = Button('Add Options');

const pasteList = Button('Paste List');

const clearList = Button('Clear List');

const saveList = Button('Save List to File');

const loadAttributes = {
  type: 'file',
  id: 'load',
  name: 'load',
  accept: 'application/json',
};

const inputFile = Input('', loadAttributes);

inputFile.style.display = 'none';

const loadList = Button(['Load List from File', inputFile]);

const start = Button('Start');

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
pasteList.dataset.action = 'pasteList';
start.dataset.action = 'start';
loadList.dataset.action = 'loadList';

export { optionContainer, inputFile };
