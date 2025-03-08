import { H1, Main, Section } from '~/utils/factory.ts';
import { drawContainer } from '~/pages/Main/components/Container/container.ts';

function mainPage(signal: AbortSignal): HTMLElement {
  return Main(Section([drawHeading(), drawContainer(signal)]));
}

function drawHeading(): HTMLHeadingElement {
  return H1('Decision Making Tool');
}

export { mainPage };
