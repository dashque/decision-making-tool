import { Section, H1, Main } from '~/utils/factory.ts';
import {
  drawAddOptionButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawPasteListButton,
  drawSaveListButton,
  drawStartButton,
} from '~/pages/Main/components/Controls/controls.ts';

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

export { mainPage };
