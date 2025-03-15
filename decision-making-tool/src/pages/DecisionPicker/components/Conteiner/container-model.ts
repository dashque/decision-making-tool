import { createAudio } from '~/pages/DecisionPicker/components/Audio/audio.ts';
import { store } from '~/store/store.ts';
import { WheelModule } from '~/pages/DecisionPicker/components/Conteiner/Wheel/wheel.ts';
import { ROTATION } from '~/pages/DecisionPicker/constants.ts';
import { randomFunction, shuffleArray } from '~/utils/random-function.ts';
import type { PickerModelType, StoreDataType } from '~/types';
import { selectors } from '~/store/selectors.ts';

function createPickerModel(): PickerModelType {
  const audio = createAudio();

  const wheel = WheelModule();

  function drawWheel(): void {
    const sectors = store.useSelector(selectors.getSectors);
    const shuffledSectors = [...sectors];
    wheel.drawWheel(shuffleArray(shuffledSectors));
  }

  drawWheel();

  let previousData: StoreDataType = store.getData();

  store.on('update', (newData: StoreDataType) => {
    if (newData.optionList.list !== previousData.optionList.list) {
      drawWheel();
    }
    previousData = newData;
  });

  return {
    drawWheel: () => drawWheel(),
    toggleSound: (): void => {
      const currentSoundState = store.getData().isSoundOn;
      const mewSoundState = !currentSoundState;
      store.update({ isSoundOn: mewSoundState });
      audio.muted = !mewSoundState;
    },
    rotateWheel: (duration: number): void => {
      wheel.rotateWheel(randomFunction(ROTATION.MIN, ROTATION.MAX), duration);
    },
    comeBack: (): void => {
      history.back();
    },
    getCanvas: (): HTMLCanvasElement => wheel.canvas,
    getSoundState: (): boolean => store.getData().isSoundOn,
    getAudio: () => audio,
  };
}

globalThis.addEventListener('popstate', () => {
  modelPickerPage.drawWheel();
});

document.addEventListener('animationEnded', () => {
  if (modelPickerPage.getSoundState()) {
    modelPickerPage
      .getAudio()
      .play()
      .then()
      .catch((error) => console.error(error));
  }
});

const modelPickerPage = createPickerModel();

export { modelPickerPage };
