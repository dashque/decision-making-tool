import { H1, Main, Section } from '~/utils/factory.ts';
import { drawTimerInput } from '~/pages/DecisionPicker/components/TimeInput/time-input.ts';
import { wheel } from '~/pages/DecisionPicker/components/Wheel/wheel.ts';
import { drawControls } from '~/pages/DecisionPicker/components/Controls/controls.ts';

function decisionPickerPage(): HTMLElement {
  return Main(Section([drawHeading(), drawControls(), drawTimerInput(), wheel.canvas]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { decisionPickerPage };
