import { H1, Main, Section } from '~/utils/factory.ts';
import { drawContainer } from '~/pages/DecisionPicker/components/Conteiner/container.ts';

function decisionPickerPage(signal: AbortSignal): HTMLElement {
  return Main(Section([drawHeading(), drawContainer(signal)]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { decisionPickerPage };
