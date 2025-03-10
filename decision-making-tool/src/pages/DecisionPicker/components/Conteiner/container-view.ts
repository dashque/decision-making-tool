import { Button, Div, Input, Label, Link } from '~/utils/factory.ts';
import { replaceCssClass } from '~/utils/helpers.ts';
import { modelPickerPage } from '~/pages/DecisionPicker/components/Conteiner/container-model.ts';

const comeBackButton = Button(Link('Back to main', '#/'));

replaceCssClass(comeBackButton, ['w-108'], ['w-32']);

const rotationButton = Button('Pick');

replaceCssClass(rotationButton, ['w-108'], ['w-32']);

const soundButton = Button('Sound: On');

replaceCssClass(soundButton, ['w-108'], ['w-32']);

const input = Input('Timer', 'timer');

input.setAttribute('placeholder', 'Set time');
input.value = '10';
input.type = 'number';
input.min = '5';
input.max = '30';
input.classList.add('w-32');

const label = Label('Timer', 'timer');

const inputContainer = Div([label, input]);

const wheelCanvas = modelPickerPage.getCanvas();

const controllerContainer = Div([
  comeBackButton,
  rotationButton,
  soundButton,
  inputContainer,
  wheelCanvas,
]);

replaceCssClass(controllerContainer, ['flex', 'flex-col'], ['grid', 'grid-cols-3']);

comeBackButton.dataset.action = 'comeBack';
rotationButton.dataset.action = 'rotateWheel';
soundButton.dataset.action = 'switchSound';
input.dataset.action = 'setTimer';

const wheelContainer = Div([controllerContainer, inputContainer, wheelCanvas]);

export { soundButton, wheelContainer, rotationButton, comeBackButton, input };
