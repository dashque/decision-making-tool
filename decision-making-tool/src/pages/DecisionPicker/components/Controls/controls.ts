import { Button, Div, Link } from '~/utils/factory.ts';
import { historyResolver } from '~/pages/router.ts';

function drawControls(): HTMLDivElement {
  return Div([createComeBackButton(), createSoundToggler()]);
}

function createComeBackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  button.classList.add('w-32');
  button.classList.remove('w-96');
  button.addEventListener('click', () => historyResolver('Main', link.getAttribute('href') ?? ''));
  return button;
}

function createSoundToggler(): HTMLButtonElement {
  const button = Button('Sound: On');
  button.classList.add('w-32');
  button.classList.remove('w-96');
  button.addEventListener('click', () => console.log('sound toggle logic'));
  return button;
}

export { drawControls };
