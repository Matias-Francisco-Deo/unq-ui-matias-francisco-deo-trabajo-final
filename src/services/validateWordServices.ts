import type { WordValidation } from "@/types/types";

export async function validateWord(word: string): Promise<WordValidation> {
  const response = await fetch(
    `https://word-api-hmlg.vercel.app/api/validate?word=${word}`,
  );
  const data: WordValidation = await response.json();
  return data;
}
