const EGG_SOUND = new Audio("/src/assets/egg.mp3");
const SELECT_SOUND = new Audio("/src/assets/select.mp3");

export function playSoundEgg() {
  return EGG_SOUND.play();
}

export function playSoundSelect() {
  return SELECT_SOUND.play();
}
