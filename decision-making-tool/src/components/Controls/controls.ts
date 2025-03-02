import { Button } from '~/utils/factory.ts';

function drawAddOptionButton(): HTMLButtonElement {
  const button = Button('Add Options');
  //add event listener
  return button;
}

function drawPasteListButton(): HTMLButtonElement {
  const button = Button('Paste List');
  //add event listener
  return button;
}

function drawClearListButton(): HTMLButtonElement {
  const button = Button('Clear List');
  //add event listener
  return button;
}

function drawSaveListButton(): HTMLButtonElement {
  const button = Button('Save List to File');
  //add event listener
  return button;
}

function drawLoadFromListButton(): HTMLButtonElement {
  const button = Button('Load List from File');
  //add event listener
  return button;
}

function drawStartButton(): HTMLButtonElement {
  const button = Button('Start');
  //add event listener
  return button;
}

export {
  drawStartButton,
  drawPasteListButton,
  drawSaveListButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawAddOptionButton,
};
