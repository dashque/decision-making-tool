import { AudioElement } from '~/utils/factory.ts';

const audioConfig = {
  spin: './audio/pole-chudes-sounds.mp3',
  countdown: './audio/pole-chudes-60-seconds.mp3',
};

function createSpinAudio(): HTMLAudioElement {
  const audio = AudioElement(audioConfig.spin);
  audio.loop = true;
  return audio;
}

function createCountdownAudio(): HTMLAudioElement {
  return AudioElement(audioConfig.countdown);
}

export { createSpinAudio, createCountdownAudio };
