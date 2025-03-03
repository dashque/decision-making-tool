import { Button, Link } from '~/utils/factory.ts';
import { historyResolver } from '~/pages/router.ts';

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
  const link = Link('Start', '#/decision-picker');
  const button = Button(link);
  button.addEventListener('click', () =>
    historyResolver('Decision picker', link.getAttribute('href') ?? ''),
  );
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
