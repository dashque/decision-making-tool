const audioConfig = {
  win: './audio/win.mp3',
};

function createAudio(): HTMLAudioElement {
  return new Audio(audioConfig?.win);
}

export { createAudio };
