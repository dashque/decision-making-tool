import { Button, Div, Input } from '~/utils/factory.ts';
import { model } from '~/pages/Main/components/Container/container-model.ts';

const addOption = Button('Add Options');

const pasteList = Button('Paste List');

const clearList = Button('Clear List');

const saveList = Button('Save List to File');

const inputFile = Input('', 'load');

inputFile.type = 'file';
inputFile.name = inputFile.id;
inputFile.accept = 'application/json';
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
start.dataset.action = 'start';
loadList.dataset.action = 'loadList';

export { optionContainer, inputFile };
