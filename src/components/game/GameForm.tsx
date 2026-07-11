import { MAX_TIMER } from "@/constants/constants";
import { uploadGameResults } from "@/lib/scores";
import { validateWord } from "@/services/validateWordServices";
import type { WordValidation } from "@/types/types";
import {
  normalizeString,
  sacarCaracteresEspeciales,
  stringToUpperAndTrim,
} from "@/utils/stringNormalization";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Modal } from "../ui/Modal";

type GameFormProps = React.ComponentProps<"form"> & {
  previousWords: string[];
  setPreviousWords: React.Dispatch<React.SetStateAction<string[]>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
};

enum GameStates {
  "idle",
  "in-game",
  "over",
}

export const GameForm = ({
  previousWords,
  setPreviousWords,
  score,
  setScore,
  timer,
  setTimer,
  ...props
}: GameFormProps) => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GameStates>(GameStates.idle);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastPreviousLetter = previousWords.at(-1)?.at(-1)?.toUpperCase();
    const currentWordNormalized = normalizeString(currentWord);

    if (!currentWord) return;

    setGameStatus(GameStates["in-game"]);

    nextRound(lastPreviousLetter, currentWordNormalized);
  };

  const nextRound = (
    lastPreviousLetter: string | undefined,
    currentWordNormalized: string,
  ) => {
    setError("");

    const currentWordInPast = previousWords.includes(currentWordNormalized);

    const wordStartsWithPreviousLetter =
      !lastPreviousLetter ||
      currentWordNormalized.startsWith(lastPreviousLetter);

    if (!wordStartsWithPreviousLetter) {
      setError(`La palabra no comienza con ${lastPreviousLetter}`);
      return;
    }

    if (currentWordInPast) {
      setError("La palabra ya fue usada");
      return;
    }

    validateWordWithAPI(currentWordNormalized);
  };

  const validateWordWithAPI = (currentWord: string) => {
    setIsLoading(true);
    validateWord(currentWord)
      .then(onValidationSuccessful)
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const onValidationSuccessful = (wordValidation: WordValidation) => {
    const wordExists = wordValidation.exists;
    if (!wordExists) {
      setError("La palabra no es válida");
      return;
    }
    updateNextRound(currentWord);
  };

  const updateNextRound = (currentWordNormalized: string) => {
    setPreviousWords((prev) => [...prev, currentWordNormalized]);
    setTimer(MAX_TIMER);
    setScore((prev) => prev + currentWordNormalized.length);
  };

  const resetGame = () => {
    setPreviousWords([]);
    setTimer(MAX_TIMER);
    setScore(0);
    setCurrentWord("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.toLowerCase() === "gaster") {
      navigate(0); // aclarar
    }
    setCurrentWord(stringToUpperAndTrim(value));
  };

  const gameOver = () => {
    setGameStatus(GameStates.over);
    setIsModalOpen(true);
  };

  const onSecond = useCallback(() => {
    if (gameStatus !== GameStates["in-game"] || isLoading) return;
    setTimer((timer) => {
      return timer - 1;
    });
  }, [setTimer, gameStatus, isLoading]);

  useEffect(() => {
    const intervalId = setInterval(onSecond, 1000);
    return () => clearInterval(intervalId);
  }, [onSecond]);

  useEffect(() => {
    if (gameStatus === GameStates["in-game"] && timer === 0) {
      gameOver();
    }
  }, [timer, gameStatus]);

  const handleInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setName(sacarCaracteresEspeciales(value));
  };

  return (
    <div className="border text-sm flex flex-col items-center justify-center py-4 gap-4 flex-1 ">
      <label className="text-sm">Escribe tu palabra:</label>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
        {...props}
      >
        <Input
          className="w-4/5 rounded-none"
          placeholder="¡Aquí!"
          onChange={handleInputChange}
          maxLength={20}
          autoFocus
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={currentWord}
          error={error}
        ></Input>
        <Button type="submit" className="w-4/5 border rounded-none">
          Ingresar palabra
        </Button>
        <span className="min-h-5">{error ? "* " + error : error}</span>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Modal
            cancelText="Ir a leaderbord"
            confirmText="Continuar"
            desc={`Game Over, tu puntaje es: ${score}`}
            onCancel={() => {
              navigate("/leaderbord");
            }}
            onConfirm={() => {
              resetGame();
              setIsModalOpen(false);
            }}
            onFinally={uploadGameResults}
          >
            <Input
              className="w-20 focus:border-transparent focus:outline-none border-transparent"
              maxLength={3}
              autoFocus
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={name}
              onChange={handleInputNameChange}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
