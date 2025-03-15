import { Button, Div, Input, Label } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';
import { modelPickerPage } from '~/pages/DecisionPicker/components/Conteiner/container-model.ts';

const comeBackButton = Button('Back to main');
replaceCssClass(
  comeBackButton,
  ['w-108'],
  ['w-32', 'disabled:opacity-75', 'disabled:pointer-events-none'],
);
const rotationButton = Button('Pick');
replaceCssClass(
  rotationButton,
  ['w-108'],
  ['w-32', 'disabled:opacity-75', 'disabled:pointer-events-none'],
);
const soundButton = Button('Sound: On');
replaceCssClass(
  soundButton,
  ['w-108'],
  ['w-32', 'disabled:opacity-75', 'disabled:pointer-events-none'],
);

const timerAttributes = {
  type: 'number',
  min: '5',
  max: '30',
  step: '1',
  value: '10',
};

const input = Input('Timer', timerAttributes);
input.classList.add('w-32');
const label = Label('Timer', 'timer');
const inputContainer = Div([label, input]);
const picker = Div('PRESS PICK BUTTON');
const wheelCanvas = modelPickerPage.getCanvas();

const controllerContainer = Div([comeBackButton, rotationButton, soundButton, inputContainer]);

replaceCssClass(controllerContainer, ['flex', 'flex-col'], ['grid', 'grid-cols-3']);
comeBackButton.dataset.action = 'comeBack';
rotationButton.dataset.action = 'rotateWheel';
soundButton.dataset.action = 'switchSound';
input.dataset.action = 'setTimer';

const wheelContainer = Div([controllerContainer, inputContainer, picker, wheelCanvas]);

function toggleButtons(buttons: HTMLButtonElement[], flag: boolean): void {
  buttons.forEach((button) => {
    button.disabled = !flag;
  });
}

wheelContainer.addEventListener('animationStarted', () => {
  comeBackButton.disabled = true;
  rotationButton.disabled = true;
  soundButton.disabled = true;
  input.disabled = true;
});

wheelContainer.addEventListener('animationEnded', () => {
  comeBackButton.disabled = false;
  rotationButton.disabled = false;
  soundButton.disabled = false;
  input.disabled = false;
});

export { soundButton, wheelContainer, input, picker, toggleButtons };
