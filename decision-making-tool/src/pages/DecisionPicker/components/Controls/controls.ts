import { Button, Link } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';

function createComeBackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  replaceCssClass(button, 'w-108', 'w-32');
  return button;
}

function createSoundToggler(): HTMLButtonElement {
  const button = Button('Sound: On');
  replaceCssClass(button, 'w-108', 'w-32');
  return button;
}

function createRotationButton(): HTMLButtonElement {
  const button = Button('Pick');
  replaceCssClass(button, 'w-108', 'w-32');
  return button;
}

export { createRotationButton, createComeBackButton, createSoundToggler };
