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
import {
  countdownSoundButton,
  input,
  soundButton,
} from '~/pages/DecisionPicker/components/Conteiner/container-view.ts';
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
  toggleCountdownSound: () => {
    toggleCountdownSound();
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

function updateCountdownSoundButton(isPlaying: boolean): void {
  countdownSoundButton.textContent = isPlaying ? 'Stop 60 Sec' : '60 Seconds';
}

updateSoundButton(modelPickerPage.getSoundState());

store.on('update', (newData: StoreDataType) => {
  const isSoundOn = newData.isSoundOn;
  updateSoundButton(isSoundOn);
});

function playWheelSound(): void {
  if (!modelPickerPage.getSoundState()) {
    return;
  }

  const audio = modelPickerPage.getAudio();
  audio.currentTime = 0;
  audio.play().catch((error: unknown) => console.error(error));
}

function stopWheelSound(): void {
  const audio = modelPickerPage.getAudio();
  audio.pause();
  audio.currentTime = 0;
}

function stopCountdownSound(): void {
  const audio = modelPickerPage.getCountdownAudio();
  audio.pause();
  audio.currentTime = 0;
  updateCountdownSoundButton(false);
}

function playCountdownSound(): void {
  const audio = modelPickerPage.getCountdownAudio();
  audio.currentTime = 0;
  audio.play().catch((error: unknown) => {
    updateCountdownSoundButton(false);
    console.error(error);
  });
  updateCountdownSoundButton(true);
}

function toggleCountdownSound(): void {
  const audio = modelPickerPage.getCountdownAudio();

  if (audio.paused) {
    playCountdownSound();
  } else {
    stopCountdownSound();
  }
}

globalThis.addEventListener('popstate', () => {
  modelPickerPage.drawWheel();
});

document.addEventListener('animationStarted', playWheelSound);
document.addEventListener('animationEnded', stopWheelSound);
modelPickerPage
  .getCountdownAudio()
  .addEventListener('ended', () => updateCountdownSoundButton(false));

export { setupWheelContainerEventListeners };
