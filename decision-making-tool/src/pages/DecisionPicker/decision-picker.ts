import { H1, Main, Section } from '~/utils/factory.ts';
import { drawContainer } from '~/pages/DecisionPicker/components/Conteiner/container.ts';

function decisionPickerPage(): HTMLElement {
  return Main(Section([drawHeading(), drawContainer()]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { decisionPickerPage };
