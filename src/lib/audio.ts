const EGG_SOUND = new Audio("/src/assets/egg.mp3");
const SELECT_SOUND = new Audio("/src/assets/select.mp3");

const MYKING_SOUND = new Audio("/src/assets/flowery/myking.mp3");
const SANFRANCISCO_SOUND = new Audio("/src/assets/flowery/sanfrancisco.mp3");
const JARONA_SOUND = new Audio("/src/assets/flowery/jarona.mp3");

const FLOWERY_SOUNDS = [MYKING_SOUND, SANFRANCISCO_SOUND, JARONA_SOUND];

export function playSoundEgg() {
  EGG_SOUND.play();
}

export function playSoundSelect() {
  SELECT_SOUND.play();
}

export function playSoundFlowery() {
  const randomPos = Math.floor(Math.random() * 3);

  FLOWERY_SOUNDS[randomPos].play();
}
