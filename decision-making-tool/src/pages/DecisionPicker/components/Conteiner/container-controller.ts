import type { PickerActionKey } from '~/types';
import { assertIsInstanceOf, assertIsNonNullable, isActionKey } from '~/utils/helpers.ts';
import { input, soundButton } from '~/pages/DecisionPicker/components/Conteiner/container-view.ts';
import { modelPickerPage } from '~/pages/DecisionPicker/components/Conteiner/container-model.ts';
import { DURATION, MS } from '~/pages/DecisionPicker/constants.ts';

const actions: Record<PickerActionKey, () => void> = {
  rotateWheel: (): void => {
    modelPickerPage.rotateWheel(getDuration());
  },
  switchSound: () => {
    modelPickerPage.toggleSound();
    assertIsNonNullable(soundButton.textContent);
    soundButton.textContent = soundButton.textContent.includes('On') ? 'Sound: Off' : 'Sound: On';
  },
  comeBack: (): void => {
    modelPickerPage.comeBack();
  },
};

function getDuration(): number {
  const duration = Number.parseInt(input.value, 10);

  if (Number.isNaN(duration || duration < DURATION.MIN || duration > DURATION.MAX)) {
    throw new TypeError('Invalid duration value');
  }

  return duration * MS;
}

function setupWheelContainerEventListeners(signal: AbortSignal, container: HTMLDivElement): void {
  container.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      const target = event.target;

      assertIsInstanceOf(HTMLElement, target);
      const actionElement = target.closest('[data-action]');

      assertIsInstanceOf(HTMLElement, actionElement);
      const action = actionElement.dataset.action;

      if (isActionKey<PickerActionKey>(action, actions)) {
        actions[action]();
      }
    },
    { signal },
  );
}

export { setupWheelContainerEventListeners };
