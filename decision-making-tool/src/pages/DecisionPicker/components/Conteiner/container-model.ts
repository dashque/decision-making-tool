import { createAudio } from '~/pages/DecisionPicker/components/Audio/audio.ts';
import { store } from '~/store/store.ts';
import { historyResolver } from '~/router.ts';
import { WheelModule } from '~/pages/DecisionPicker/components/Conteiner/Wheel/wheel.ts';
import { ROTATION } from '~/pages/DecisionPicker/constants.ts';
import { randomFunction } from '~/utils/random-function.ts';
import type { PickerModelType } from '~/types';

function createPickerModel(): PickerModelType {
  const audio = createAudio();

  const wheel = WheelModule();

  function drawWheel(): void {
    const sectors = store
      .getData()
      .optionList.list.map((option) => Number.parseFloat(option.weight));

    wheel.drawWheel(sectors);
  }

  drawWheel();

  store.on('update', () => {
    drawWheel();
  });

  if (
    store.getData().optionList.list.length > 1 &&
    store.getData().optionList.list.filter((option) => Number(option.weight) >= 1).length > 1
  ) {
    queueMicrotask(() => historyResolver('main', '#/'));
  }

  return {
    toggleSound: (): void => {
      const currentSoundState = store.getData().isSoundOn;

      const mewSoundState = !currentSoundState;

      store.update({ isSoundOn: mewSoundState });
      audio.muted = !mewSoundState;
    },
    rotateWheel: (duration: number): void => {
      const sectors = store
        .getData()
        .optionList.list.map((option) => Number.parseFloat(option.weight));

      console.log(sectors);
      wheel.rotateWheel(randomFunction(ROTATION.MIN, ROTATION.MAX), duration);
    },
    comeBack: (): void => {
      historyResolver('main', '#/');
    },
    getCanvas: (): HTMLCanvasElement => wheel.canvas,
  };
}

const modelPickerPage = createPickerModel();

export { modelPickerPage };
