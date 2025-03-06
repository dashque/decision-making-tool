import { Button, Link } from '~/utils/factory.ts';
import { createBlob } from './blob';

function drawAddOptionButton(): HTMLButtonElement {
  return Button('Add Options');
}

function drawPasteListButton(): HTMLButtonElement {
  return Button('Paste List');
}

function drawClearListButton(): HTMLButtonElement {
  return Button('Clear List');
}

function drawSaveListButton(): HTMLButtonElement {
  return Button('Save List to File');
}

function createLinkForSaving(): HTMLAnchorElement {
  const link = Link('', createBlob('')); // data
  link.download = 'option-list.json';
  return link;
}

function drawLoadFromListButton(): HTMLButtonElement {
  return Button('Load List from File');
}

function drawStartButton(): HTMLButtonElement {
  const link = Link('Start', '#/decision-picker');
  return Button(link);
}

export {
  drawStartButton,
  drawPasteListButton,
  drawSaveListButton,
  drawClearListButton,
  drawLoadFromListButton,
  drawAddOptionButton,
  createLinkForSaving,
};
