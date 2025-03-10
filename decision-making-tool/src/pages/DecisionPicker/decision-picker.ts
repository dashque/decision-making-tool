import { H1, Main, Section } from '~/utils/factory.ts';
import { wheelContainer } from '~/pages/DecisionPicker/components/Conteiner/container-view.ts';
import { setupWheelContainerEventListeners } from '~/pages/DecisionPicker/components/Conteiner/container-controller.ts';

function decisionPickerPage(signal: AbortSignal): HTMLElement {
  setupWheelContainerEventListeners(signal, wheelContainer);

  return Main(Section([H1('Decision Making Tool'), wheelContainer]));
}

export { decisionPickerPage };
