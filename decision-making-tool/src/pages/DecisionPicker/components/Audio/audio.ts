import { AudioElement } from '~/utils/factory.ts';

const audioConfig = {
  win: './audio/win.mp3',
};

function createAudio(): HTMLAudioElement {
  return AudioElement(audioConfig.win);
}

export { createAudio };
