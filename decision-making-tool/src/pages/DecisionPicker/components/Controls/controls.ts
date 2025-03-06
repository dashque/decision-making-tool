import { Button, Link } from '~/utils/factory.ts';

function createComeBackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  button.classList.add('w-32');
  button.classList.remove('w-96');
  return button;
}

function createSoundToggler(): HTMLButtonElement {
  const button = Button('Sound: On');
  button.classList.add('w-32');
  button.classList.remove('w-96');
  return button;
}

function createRotationButton(): HTMLButtonElement {
  const button = Button('Pick');
  button.classList.add('w-32');
  button.classList.remove('w-96');
  return button;
}

export { createRotationButton, createComeBackButton, createSoundToggler };
