import { H1, Main, Section } from '~/utils/factory.ts';
import { drawContainer } from '~/pages/Main/components/Container/container.ts';

function mainPage(): HTMLElement {
  return Main(Section([drawHeading(), drawContainer()]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { mainPage };
