import { AudioElement } from '~/utils/factory.ts';

const audioConfig = {
  spin: './audio/pole-chudes-sounds.mp3',
};

function createAudio(): HTMLAudioElement {
  const audio = AudioElement(audioConfig.spin);
  audio.loop = true;
  return audio;
}

export { createAudio };
