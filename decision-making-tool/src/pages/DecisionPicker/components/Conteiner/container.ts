import { Button, Div, Link } from '~/utils/factory.ts';
import { createAudio } from '~/pages/DecisionPicker/components/Audio/audio.ts';
import { historyResolver } from '~/router.ts';
import { drawTimerInput } from '~/pages/DecisionPicker/components/TimeInput/time-input.ts';
import { WheelModule } from '~/pages/DecisionPicker/components/Wheel/wheel.ts';
import {
  assertIsInstanceOf,
  assertIsNonNullable,
  isActionKey,
  replaceCssClass,
} from '~/utils/helpers.ts';
import { getDataFromLS } from '~/store/local-storage/local-storage-manager.ts';
import type { PickerActinKey } from '~/types';

const audio = createAudio();

const comeBackButton = Button(Link('Back to main', '#/'));
replaceCssClass(comeBackButton, ['w-108'], ['w-32']);

const rotationButton = Button('Pick');
replaceCssClass(rotationButton, ['w-108'], ['w-32']);

const soundButton = Button('Sound: On');
replaceCssClass(soundButton, ['w-108'], ['w-32']);

const input = drawTimerInput();
const wheel = WheelModule();

const controllerContainer = Div([audio, comeBackButton, rotationButton, soundButton]);
replaceCssClass(controllerContainer, ['flex', 'flex-col'], ['grid', 'grid-cols-3']);

comeBackButton.dataset.action = 'comeBack';
rotationButton.dataset.action = 'rotateWheel';
soundButton.dataset.action = 'switchSound';
input.dataset.action = 'setTimer';

const actions: Record<PickerActinKey, () => void> = {
  rotateWheel: (): void => {
    //   const angle = randomFunction(ROTATION.MIN, ROTATION.MAX);
    // wheel.rotateWheel(angle, DEFAULT_DURATION_MS);
    console.log('');
  },
  switchSound: () => {
    assertIsNonNullable(soundButton.textContent);
    if (soundButton.textContent.includes('On')) {
      soundButton.textContent = 'Sound: Off';
      audio.muted = true;
    } else {
      soundButton.textContent = 'Sound: On';
      audio.muted = false;
    }
  },
  setTimer: () => {
    console.log('');
  },
  comeBack: (): void => {
    historyResolver('main', '#/');
  },
};

function drawContainer(signal: AbortSignal): HTMLDivElement {
  // wheel.drawWheel([...sectors]);
  const wheelContainer = Div([controllerContainer, input, wheel.canvas]);
  wheelContainer.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      const target = event.target;
      assertIsInstanceOf(HTMLElement, target);
      const actionElement = target.closest('[data-action]');
      assertIsInstanceOf(HTMLElement, actionElement);
      const action = actionElement.dataset.action;
      if (isActionKey<PickerActinKey>(action, actions)) {
        actions[action]();
      }
    },
    { signal },
  );

  return wheelContainer;
}

const data = getDataFromLS();
console.log(data);
// const sectors = data.optionList.list.map((option) => {});

export { drawContainer };
