import { Button, Div, Input, Label } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';
import { modelPickerPage } from '~/pages/DecisionPicker/components/Conteiner/container-model.ts';

const comeBackButton = Button('Back to main');
replaceCssClass(
  comeBackButton,
  ['w-114'],
  ['w-32', 'disabled:opacity-75', 'disabled:pointer-events-none'],
);
const rotationButton = Button('Pick');
replaceCssClass(
  rotationButton,
  ['w-114'],
  ['w-32', 'disabled:opacity-75', 'disabled:pointer-events-none'],
);
const soundButton = Button('Sound: On');
replaceCssClass(
  soundButton,
  ['w-114'],
  ['w-32', 'disabled:opacity-75', 'disabled:pointer-events-none'],
);

const timerAttributes = {
  type: 'number',
  min: '5',
  max: '30',
  step: '1',
  value: '5',
  placeholder: 'Timer',
};

const input = Input('Timer', timerAttributes);
input.classList.add('w-32');
const label = Label('Timer', 'timer');
const inputContainer = Div([label, input]);
const picker = Div('PRESS PICK BUTTON');
const wheelCanvas = modelPickerPage.getCanvas();
const controllerContainer = Div([comeBackButton, rotationButton, soundButton, inputContainer]);
replaceCssClass(
  picker,
  [],
  [
    'border',
    'border-gray-300',
    'rounded-md',
    'px-4',
    'py-2',
    'm-1',
    'shadow-sm',
    'ring-2',
    'ring-gray-300',
  ],
);

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
  replaceCssClass(
    picker,
    ['border-pink-500', 'ring-pink-500'],
    ['border-gray-300', 'ring-gray-300'],
  );
});

wheelContainer.addEventListener('animationEnded', () => {
  comeBackButton.disabled = false;
  rotationButton.disabled = false;
  soundButton.disabled = false;
  input.disabled = false;
  replaceCssClass(
    picker,
    ['border-gray-300', 'ring-gray-300'],
    ['border-pink-500', 'ring-pink-500'],
  );
});

input.addEventListener('input', () => {
  if (input.validity.rangeUnderflow) {
    replaceCssClass(
      input,
      ['focus:ring-pink-500', 'focus:border-pink-500'],
      ['focus:ring-blue-500', 'focus:border-blue-500'],
    );
    input.setCustomValidity(`Значение не может быть меньше ${input.min}.`);
    input.value = input.min;
  } else if (input.validity.rangeOverflow) {
    replaceCssClass(
      input,
      ['focus:ring-pink-500', 'focus:border-pink-500'],
      ['focus:ring-blue-500', 'focus:border-blue-500'],
    );

    input.setCustomValidity(`Значение не может быть больше ${input.max}.`);
    input.value = input.max;
  } else {
    input.style.border = 'insert';
    replaceCssClass(
      input,
      ['focus:ring-blue-500', 'focus:border-blue-500'],
      ['focus:ring-pink-500', 'focus:border-pink-500'],
    );
    input.setCustomValidity('');
  }
  input.reportValidity();
});

export { soundButton, wheelContainer, input, picker, toggleButtons };
