import type { PickerActionKey, StoreDataType } from '~/types';
import {
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
import { DURATION, ERROR, MS } from '~/pages/DecisionPicker/constants.ts';
import { Maybe } from '~/utils/maybe.ts';
import { flow } from '~/utils/flow.ts';
import { store } from '~/store/store.ts';

const actions: Record<PickerActionKey, () => void> = {
  rotateWheel: (): void => {
    modelPickerPage.rotateWheel(getDuration());
  },
  switchSound: () => {
    modelPickerPage.toggleSound();
  },
  comeBack: (): void => {
    modelPickerPage.comeBack();
  },
};

function getDuration(): number {
  const duration = Number.parseInt(input.value, 10);

  if (Number.isNaN(duration || duration < DURATION.MIN || duration > DURATION.MAX)) {
    throw new TypeError(ERROR.INVALID_DURATION);
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

function updateSoundButton(isSoundOn: boolean): void {
  soundButton.textContent = isSoundOn ? 'Sound: On' : 'Sound: Off';
}

updateSoundButton(modelPickerPage.getSoundState());

store.on('update', (newData: StoreDataType) => {
  const isSoundOn = newData.isSoundOn;

  updateSoundButton(isSoundOn);
});

export { setupWheelContainerEventListeners };
