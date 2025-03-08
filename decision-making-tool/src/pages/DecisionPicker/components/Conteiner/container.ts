import { Div } from '~/utils/factory.ts';
import { createAudio } from '~/pages/DecisionPicker/components/Audio/audio.ts';
import {
  createComeBackButton,
  createRotationButton,
  createSoundToggler,
} from '~/pages/DecisionPicker/components/Controls/controls.ts';
import { historyResolver } from '~/router.ts';
import { drawTimerInput } from '~/pages/DecisionPicker/components/TimeInput/time-input.ts';
import { WheelModule } from '~/pages/DecisionPicker/components/Wheel/wheel.ts';
import { replaceCssClass } from '~/utils/helpers.ts';

const audio = createAudio();
const comeBackButton = createComeBackButton();
const rotationButton = createRotationButton();
const soundButton = createSoundToggler();
const input = drawTimerInput();
const wheel = WheelModule();

const controllerContainer = Div([audio, comeBackButton, rotationButton, soundButton]);
replaceCssClass(controllerContainer, 'flex', 'grid');
replaceCssClass(controllerContainer, 'flex-col', 'grid');

function drawContainer(): HTMLDivElement {
  return Div([controllerContainer, input, wheel.canvas]);
}

comeBackButton.addEventListener('click', () => {
  historyResolver('main', globalThis.location.hash || '#/');
});

// soundButton.addEventListener('click', () => {});

// rotationButton.addEventListener('click', () => {
//   const angle = randomFunction(ROTATION.MIN, ROTATION.MAX);
// wheel.rotateWheel(angle, DEFAULT_DURATION_MS);
// });

export { drawContainer };
