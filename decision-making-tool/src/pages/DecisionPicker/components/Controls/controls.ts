import { Button, Div, Link } from '~/utils/factory.ts';
import { historyResolver } from '~/router.ts';
import { randomFunction } from '~/utils/random-function.ts';
import { ROTATION } from '~/pages/DecisionPicker/components/Wheel/constants.ts';
import { DEFAULT_DURATION_MS } from '~/pages/DecisionPicker/components/TimeInput/time-input.ts';
import { wheel } from '~/pages/DecisionPicker/components/Wheel/wheel.ts';

function drawControls(): HTMLDivElement {
  return Div([createComeBackButton(), createSoundToggler(), createRotationButton()]);
}

function createComeBackButton(): HTMLButtonElement {
  const link = Link('Back to main', '#/');
  const button = Button(link);
  button.classList.add('w-32');
  button.classList.remove('w-96');
  button.addEventListener('click', () =>
    historyResolver('Main', link.getAttribute('href') ?? '#/'),
  );
  return button;
}

function createSoundToggler(): HTMLButtonElement {
  const button = Button('Sound: On');
  button.classList.add('w-32');
  button.classList.remove('w-96');
  button.addEventListener('click', () => console.log('sound toggle logic'));
  return button;
}

function createRotationButton(): HTMLButtonElement {
  const button = Button('Pick');
  button.classList.add('w-32');
  button.classList.remove('w-96');
  button.addEventListener('click', (): void => {
    const angle: number = randomFunction(ROTATION.MIN, ROTATION.MAX);
    wheel.rotateWheel(angle, DEFAULT_DURATION_MS); // TODO должно передавать время из инпута
  });
  return button;
}

export { drawControls };
