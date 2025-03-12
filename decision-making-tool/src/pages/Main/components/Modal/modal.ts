import { createPopup } from '~/utils/modal.ts';
import { Button, Dialog, Div, Form, TextArea } from '~/utils/factory.ts';
import { assertIsInstanceOf, replaceCssClass } from '~/utils/helpers.ts';

function createStartModal(): HTMLDialogElement {
  const contentContainer = Div(
    'Please add at least 2 valid options.' +
      'An option is considered valid if its title is not empty and its weight is greater than 0',
  );

  replaceCssClass(contentContainer, [], ['bg-white', 'p-6', 'rounded-2xl', 'shadow-xl', 'w-108']);

  const modal = createPopup({
    children: contentContainer,
  });

  replaceCssClass(modal, [], ['w-full', 'h-full']);
  return modal;
}

function createPasteModal(pasteFunction: (value: string) => void): HTMLDialogElement {
  const textarea = TextArea([]);

  assertIsInstanceOf(HTMLTextAreaElement, textarea);

  textarea.placeholder =
    'Paste a list of new options in a CSV-like format:\n' +
    'title,1                            → | title                            | 1 |\n' +
    'title with whitespace,2 → | title with whitespace | 2 |\n' +
    'title , with , commas,3 →  | title , with , commas  | 3 |\n' +
    'title with "quotes",4   →   | title with "quotes"     | 4 |';

  textarea.rows = 10;
  textarea.cols = 70;
  textarea.name = 'table';

  const confirmButton = Button('Confirm');

  const closeButton = Button('Close');

  const form = Form([textarea, confirmButton, closeButton]);

  const modal = Dialog([form]);

  confirmButton.addEventListener('click', () => {
    pasteFunction(textarea.value);
    modal.close();
  });

  closeButton.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener('close', () => {
    modal.remove();
  });

  replaceCssClass(modal, [], ['w-full', 'h-full']);

  return modal;
}

export { createStartModal, createPasteModal };
