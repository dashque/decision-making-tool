import { Div, H1, Main, Section } from '~/utils/factory.ts';
import {
  DEFAULT_DURATION_MS,
  drawTimerInput,
} from '~/pages/DecisionPicker/components/TimeInput/time-input.ts';
import { wheel } from '~/pages/DecisionPicker/components/Wheel/wheel.ts';
import {
  createComeBackButton,
  createRotationButton,
  createSoundToggler,
} from '~/pages/DecisionPicker/components/Controls/controls.ts';
import { machine } from '~/store/machine.ts';
import { randomFunction } from '~/utils/random-function.ts';
import { ROTATION } from '~/pages/DecisionPicker/components/Wheel/constants.ts';
import { createAudio } from '~/pages/DecisionPicker/components/Audio/audio.ts';

function decisionPickerPage(): HTMLElement {
  return Main(
    Section([
      drawHeading(),
      Div([audio, comeBackButton, rotationButton, soundButton]),
      drawTimerInput(),
      wheel.canvas,
    ]),
  );
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

const audio = createAudio();
const comeBackButton = createComeBackButton();
const rotationButton = createRotationButton();
const soundButton = createSoundToggler();

comeBackButton.addEventListener('click', () => {
  machine.send({ type: 'returnToMain', data: null });
});

soundButton.addEventListener('click', () => {
  machine.send({ type: 'toggleSounds', data: null });
});

rotationButton.addEventListener('click', () => {
  const angle = randomFunction(ROTATION.MIN, ROTATION.MAX);
  wheel.rotateWheel(angle, DEFAULT_DURATION_MS);
});

export { decisionPickerPage };
