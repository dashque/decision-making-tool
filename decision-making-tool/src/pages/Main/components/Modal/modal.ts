import { createPopup } from '~/utils/modal.ts';
import { Div, Form, TextArea } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';

function startModal(): HTMLDialogElement {
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

function pasteModal(): HTMLDialogElement {
  const textarea = TextArea([]);

  const form = Form(textarea);

  const modal = createPopup({ children: form });

  return modal;
}

export { startModal, pasteModal };
