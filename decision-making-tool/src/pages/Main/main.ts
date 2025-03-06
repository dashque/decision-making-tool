import { H1, Main, Section } from '~/utils/factory.ts';
import {
  drawAddOptionButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawPasteListButton,
  drawSaveListButton,
  drawStartButton,
} from '~/pages/Main/components/Controls/controls.ts';
import { drawForm } from '~/pages/Main/components/Form/form.ts';

function mainPage(): HTMLElement {
  return Main(Section([heading, form, addOption, pasteList, clearList, saveList, loadList, start]));
}

const form = drawForm();

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

// addOption.addEventListener('click', () => {});

// pasteList.addEventListener('click', () => {});

// clearList.addEventListener('click', () => {});

// saveList.addEventListener('click', () => {
//   const link = createLinkForSaving();
//   link.click();
//   URL.revokeObjectURL(link.href);
// });

// loadList.addEventListener('click', () => {});

// start.addEventListener('click', () => {});

export { mainPage };
