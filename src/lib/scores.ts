import type { HighscoresType as Highscores } from "@/types/types";

const STORAGE_KEY = "palabrasEncadenadasScores";

// name -> top score
export const uploadGameResults = (name: string, score: number) => {
  if (!name) return;

  const highscores = getHighscores();

  const highscore = highscores[name];
  if (Number(highscore) >= score) return;

  setHighscore(name, score, highscores);
};

export function getHighscores(): Highscores {
  let rawHighscores = localStorage.getItem(STORAGE_KEY);
  if (!rawHighscores) {
    return {};
  }
  const highscores = JSON.parse(rawHighscores) as Highscores;

  return highscores;
}

export function setHighscore(
  name: string,
  score: number,
  highscores: Highscores,
) {
  highscores[name] = score.toString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(highscores));
}
