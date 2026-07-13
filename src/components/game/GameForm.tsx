import { MAX_TIMER } from "@/constants/constants";
import { playSoundEgg, playSoundFlowery, playSoundSelect } from "@/lib/audio";
import { uploadGameResults } from "@/lib/scores";
import { validateWord } from "@/services/validateWordServices";
import type { WordValidation } from "@/types/types";
import {
  normalizeString,
  sacarCaracteresEspeciales,
  stringToUpperAndTrim,
} from "@/utils/stringNormalization";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [playername, setPlayerName] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GameStates>(GameStates.idle);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentWord || isLoading) return;

    if (currentWord.toUpperCase() === "EGG") {
      // easter egg 2
      playSoundEgg();
      setCurrentWord("");
      return;
    }

    if (
      ["FLOWERY", "FLOWERMAN", "JARONA", "SANFRANCISCO", "RALY"].includes(
        currentWord.toUpperCase(),
      )
    ) {
      // easter egg 3
      playSoundFlowery();
      setCurrentWord("");
      return;
    }

    const lastPreviousLetter = previousWords.at(-1)?.at(-1)?.toUpperCase();
    const currentWordNormalized = normalizeString(currentWord);

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
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          // sin este timeout no llega a tiempo
          inputRef?.current?.focus(); // focusea al input principal
        }, 0);
      });
  };

  const onValidationSuccessful = (wordValidation: WordValidation) => {
    const wordExists = wordValidation.exists;
    if (!wordExists) {
      setError("La palabra no existe");
      return;
    }
    updateNextRound(currentWord);
  };

  const updateNextRound = (currentWordNormalized: string) => {
    setCurrentWord("");
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
    if (value.toUpperCase() === "GASTER") navigate(0); // easter egg 1

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
    setPlayerName(sacarCaracteresEspeciales(value));
  };

  const handleConfirm = () => {
    resetGame();
    setIsModalOpen(false);
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
          className="w-4/5 rounded-none "
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
          disabled={isLoading}
          ref={inputRef}
        ></Input>
        <Button
          type="submit"
          className="w-4/5 border rounded-none whitespace-nowrap gap-2"
          disabled={isLoading}
        >
          Ingresar palabra
        </Button>
        <span className="min-h-5">{error ? "* " + error : error}</span>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Modal
            cancelText="Ir a leaderboard"
            confirmText="Continuar"
            className=""
            desc={`Game Over, tu puntaje es: ${score}. Has encadenado ${previousWords.length} palabra${previousWords.length !== 1 ? "s" : ""}.`}
            onCancel={() => {
              navigate("/leaderboard");
            }}
            onConfirm={handleConfirm}
            onFinally={() => {
              uploadGameResults(playername, score);
            }}
          >
            <Input
              className="w-20 focus:border-transparent focus:outline-none border-transparent"
              maxLength={3}
              autoFocus
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={playername}
              onChange={handleInputNameChange}
              onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                  evt.preventDefault();
                  handleConfirm();
                  playSoundSelect();
                }
              }}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
