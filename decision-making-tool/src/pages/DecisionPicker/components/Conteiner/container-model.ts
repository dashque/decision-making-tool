import { createAudio } from '~/pages/DecisionPicker/components/Audio/audio.ts';
import { store } from '~/store/store.ts';
import { WheelModule } from '~/pages/DecisionPicker/components/Conteiner/Wheel/wheel.ts';
import { ERROR, ROTATION } from '~/pages/DecisionPicker/constants.ts';
import { randomFunction } from '~/utils/random-function.ts';
import type { PickerModelType } from '~/types';
import { selectors } from '~/store/selectors.ts';

function createPickerModel(): PickerModelType {
  const audio = createAudio();

  const wheel = WheelModule();

  function drawWheel(): void {
    const sectors = store.useSelector(selectors.getSectors);

    wheel.drawWheel(sectors);
  }

  drawWheel();

  store.on('update', () => {
    drawWheel();
  });

  return {
    toggleSound: (): void => {
      const currentSoundState = store.getData().isSoundOn;

      const mewSoundState = !currentSoundState;

      store.update({ isSoundOn: mewSoundState });
      audio.muted = !mewSoundState;
    },
    rotateWheel: (duration: number): void => {
      wheel.rotateWheel(randomFunction(ROTATION.MIN, ROTATION.MAX), duration, async () => {
        if (!audio.muted) {
          try {
            await audio.play();
          } catch {
            throw new Error(ERROR.TRY_CATCH);
          }
        }
      });
    },
    comeBack: (): void => {
      //historyResolver('main', '#/');

      history.back();
    },
    getCanvas: (): HTMLCanvasElement => wheel.canvas,
  };
}

const modelPickerPage = createPickerModel();

export { modelPickerPage };
