import { Section } from '~/utils/factory.ts';
import { drawTimerInput } from '~/components/TimeInput/time-input.ts';
import { createRotationButton, wheel } from '~/components/Wheel/wheel.ts';

function decisionPickerPage(): HTMLElement {
  return Section([drawTimerInput(), wheel.canvas, createRotationButton()]);
}

export { decisionPickerPage };
