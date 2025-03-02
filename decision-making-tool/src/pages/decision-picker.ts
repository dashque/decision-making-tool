import { Section } from '../utils/factory.ts';
import { createRotationButton, wheel } from '../components/Wheel/wheel.ts';
import { drawTimerInput } from '../components/TimeInput/time-input.ts';

function decisionPickerPage(): HTMLElement {
  return Section([drawTimerInput(), wheel.canvas, createRotationButton()]);
}

export { decisionPickerPage };
