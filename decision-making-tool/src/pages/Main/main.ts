import { H1, Main, Section } from '~/utils/factory.ts';
import {
  createLinkForSaving,
  drawAddOptionButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawPasteListButton,
  drawSaveListButton,
  drawStartButton,
} from '~/pages/Main/components/Controls/controls.ts';
import { machine } from '~/store/machine.ts';

function mainPage(): HTMLElement {
  return Main(Section([heading, addOption, pasteList, clearList, saveList, loadList, start]));
}

const heading = drawHeading();
const addOption = drawAddOptionButton();
const pasteList = drawPasteListButton();
const clearList = drawClearListButton();
const saveList = drawSaveListButton();
const loadList = drawLoadFromListButton();
const start = drawStartButton();

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

addOption.addEventListener('click', () => {
  machine.send({ type: 'addOption', data: null });
});

pasteList.addEventListener('click', () => {
  machine.send({ type: 'pasteList', data: null });
});

clearList.addEventListener('click', () => {
  machine.send({ type: 'clearList', data: null });
});

saveList.addEventListener('click', () => {
  const link = createLinkForSaving();
  link.click();
  URL.revokeObjectURL(link.href);
  machine.send({ type: 'saveToFile', data: null });
});

loadList.addEventListener('click', () => {
  machine.send({ type: 'loadFromFile', data: null });
});

start.addEventListener('click', () => {
  machine.send({ type: 'start', data: null });
});

export { mainPage };
