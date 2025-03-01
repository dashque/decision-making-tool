import { H1, Input, Label, Section } from '../utils/factory.ts';
import { createRotationButton, wheel } from '../components/Wheel/wheel.ts';

function decisionPickerPage(): HTMLElement {
  return Section([drawHeading(), drawTimerInput(), wheel.canvas, createRotationButton()]);
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

function drawTimerInput(): HTMLLabelElement {
  return Label(['Set duration', drawInput()], 'timer');
}

function drawInput(): HTMLInputElement {
  return Input('Timer', 'timer');
}

export { decisionPickerPage };
