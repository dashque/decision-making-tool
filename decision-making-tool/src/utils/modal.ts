import type { PopupProperties } from '~/types';
import { Button, Dialog, Div } from './factory.ts';

function createPopup({
  children,
  onClose,
}: PopupProperties): HTMLDialogElement {
  const closeButton = Button('X');
  const popupContainer = Div(closeButton);
  const dialog = Dialog(popupContainer);

  closeButton.addEventListener('click', () => {
    dialog.close();
    if (onClose) {
      onClose();
    }
    dialog.remove();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
      if (onClose) {
        onClose();
      }
      dialog.remove();
    }
  });

  if (children && (typeof children === 'string' || children instanceof Node)) {
    popupContainer.append(children);
  }
  popupContainer.append(closeButton);
  dialog.append(popupContainer);

  return dialog;
}

export { createPopup };
