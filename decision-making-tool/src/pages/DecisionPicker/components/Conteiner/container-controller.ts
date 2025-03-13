import type { PickerActionKey } from '~/types';
import {
  assertIsNonNullable,
  getClosestByDataAttribute,
  getDataAttributeValue,
  getEventTarget,
  maybeInstanceOf,
  maybeKeyOf,
  noop,
  preventDefault,
} from '~/utils/helpers.ts';
import { input, soundButton } from '~/pages/DecisionPicker/components/Conteiner/container-view.ts';
import { modelPickerPage } from '~/pages/DecisionPicker/components/Conteiner/container-model.ts';
import { DURATION, MS } from '~/pages/DecisionPicker/constants.ts';
import { Maybe } from '~/utils/maybe.ts';
import { flow } from '~/utils/flow.ts';

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
    flow(preventDefault, getEventTarget, (target) => {
      Maybe.of(target)
        .flatMap(maybeInstanceOf(Element))
        .map(getClosestByDataAttribute('action'))
        .flatMap(maybeInstanceOf(HTMLElement))
        .map(getDataAttributeValue('action'))
        .flatMap(maybeKeyOf(actions))
        .unwrap((a) => actions[a](), noop);
    }),
    { signal },
  );
}

export { setupWheelContainerEventListeners };
