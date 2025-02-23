import { createElement } from './create-element.ts';
import type { PopupProperties } from '../types';

function createPopup({ children, onClose }: PopupProperties): HTMLDialogElement {
  const dialog = createElement({
    tag: 'dialog',
    cssClasses: ['popup-dialog'],
  });

  const popupContainer = createElement({
    tag: 'div',
    cssClasses: ['popup-container'],
  });

  const closeButton = createElement({
    tag: 'button',
    cssClasses: ['popup-close-btn'],
  });

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
