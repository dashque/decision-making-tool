import { H1, Main, Section } from '~/utils/factory.ts';
import { optionContainer } from '~/pages/Main/components/Container/container-view.ts';
import { setupEventListeners } from '~/pages/Main/components/Container/container-controller.ts';

function mainPage(signal: AbortSignal): HTMLElement {
  setupEventListeners(signal, optionContainer);

  return Main(Section([H1('Decision Making Tool'), optionContainer]));
}

export { mainPage };
