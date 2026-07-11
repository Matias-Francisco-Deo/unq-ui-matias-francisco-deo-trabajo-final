export function sacarTildes(word: string) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const stringToUpperAndTrim = (str: string) => {
  return str.trim().toUpperCase();
};

export const normalizeString = (str: string) => {
  return sacarTildes(stringToUpperAndTrim(str));
};

export function sacarCaracteresEspeciales(word: string) {
  return normalizeString(word.normalize("NFD").replace(/[^\w\s]/g, ""));
}
