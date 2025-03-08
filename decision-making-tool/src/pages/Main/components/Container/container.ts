import { Div } from '~/utils/factory.ts';
import {
  drawAddOptionButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawPasteListButton,
  drawSaveListButton,
  drawStartButton,
} from '~/pages/Main/components/Controls/controls.ts';
import { historyResolver } from '~/router.ts';

const addOption = drawAddOptionButton();
const pasteList = drawPasteListButton();
const clearList = drawClearListButton();
const saveList = drawSaveListButton();
const loadList = drawLoadFromListButton();
const start = drawStartButton();

function drawContainer(): HTMLDivElement {
  return Div([addOption, pasteList, clearList, saveList, loadList, start]);
}

// addOption.addEventListener('click', () => {});

// pasteList.addEventListener('click', () => {});

// clearList.addEventListener('click', () => {});

// saveList.addEventListener('click', () => {
//   const link = createLinkForSaving();
//   link.click();
//   URL.revokeObjectURL(link.href);
// });

// loadList.addEventListener('click', () => {});

start.addEventListener('click', () => {
  historyResolver('decisionPicker', '#/decision-picker');
});
export { drawContainer };
