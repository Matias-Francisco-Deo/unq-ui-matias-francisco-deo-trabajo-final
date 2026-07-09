import { useCallback, useEffect, useState } from "react";
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

const MAX_TIMER = 2;

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
  const [gameStatus, setGameStatus] = useState<GameStates>(GameStates.idle);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastPreviousLetter = previousWords.at(-1)?.at(-1)?.toUpperCase();
    const currentWordNormalized = normalizeWord(currentWord);

    if (!currentWord) return;

    setGameStatus(GameStates["in-game"]);

    game(lastPreviousLetter, currentWordNormalized);
  };

  const game = (
    lastPreviousLetter: string | undefined,
    currentWordNormalized: string,
  ) => {
    setError("");

    const currentWordInPast = previousWords.includes(currentWordNormalized);

    if (currentWordInPast) {
      setError("La palabra ya fue usada");
      return;
    }

    const wordHookedSuccessfully =
      !lastPreviousLetter ||
      currentWordNormalized.startsWith(lastPreviousLetter);

    if (!wordHookedSuccessfully) {
      setError(`La palabra no comienza con ${lastPreviousLetter}`);
      return;
    }

    updateNextRound();
  };

  const updateNextRound = () => {
    setPreviousWords((prev) => [...prev, currentWord]);
    setTimer(MAX_TIMER);
    setScore((prev) => prev + currentWord.length);
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
      window.location.href = "/"; // router?
    }

    setCurrentWord(value);
  };

  const normalizeWord = (str: string) => {
    return str.trim().toUpperCase();
  };

  const gameOver = () => {
    setGameStatus(GameStates.over);
    setIsModalOpen(true);
  };

  const onSecond = useCallback(() => {
    if (gameStatus !== GameStates["in-game"]) return;
    setTimer((timer) => {
      return timer - 1;
    });
  }, [setTimer, gameStatus]);

  useEffect(() => {
    const intervalId = setInterval(onSecond, 1000);
    return () => clearInterval(intervalId);
  }, [onSecond]);

  useEffect(() => {
    if (gameStatus === GameStates["in-game"] && timer === 0) {
      gameOver();
    }
  }, [timer, gameStatus]);

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
            cancelText="Rendirse"
            confirmText="Continuar"
            desc={`Game Over, tu puntaje es: ${score}`}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            onConfirm={() => {
              resetGame();
              setIsModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
