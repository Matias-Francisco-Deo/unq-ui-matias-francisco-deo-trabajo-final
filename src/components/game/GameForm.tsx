import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type GameFormProps = React.ComponentProps<"form"> & {
  wordState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  scoreState: [number, React.Dispatch<React.SetStateAction<number>>];
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
};

const MAX_TIMER = 2;

export const GameForm = ({
  wordState,
  scoreState,
  timer,
  setTimer,
  ...props
}: GameFormProps) => {
  const [previousWords, setPreviousWords] = wordState;
  const [_, setScore] = scoreState;
  const [timerPaused, setTimerPause] = useState<boolean>(true);
  const [currentIntervalId, setCurrentIntervalId] = useState<number | null>(
    null,
  );
  const [currentWord, setCurrentWord] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastPreviousLetter = previousWords.at(-1)?.at(-1)?.toLowerCase();

    const currentWordLowered = currentWord.toLowerCase();

    if (currentWordLowered === "") return;

    const currentWordInPast = previousWords.includes(currentWordLowered);
    const wordHookedSuccessfully =
      !lastPreviousLetter ||
      (!currentWordInPast && currentWordLowered.startsWith(lastPreviousLetter));

    if (!wordHookedSuccessfully) return; // levantar un error o algo así

    if (timerPaused) setTimerPause(false); // comienza el juego si no estaba ya comenzado

    setPreviousWords((prev) => [...prev, currentWord]);
    setTimer(MAX_TIMER);
    setScore((prev) => prev + currentWord.length);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.toLowerCase() === "gaster") {
      window.location.href = "/";
    }

    setCurrentWord(value);
  };

  useEffect(() => {
    console.log("cambió pausa", timerPaused, currentIntervalId);
    if (timerPaused && currentIntervalId) {
      console.log("borrando interval", currentIntervalId);
      clearInterval(currentIntervalId);
      return;
    }
    if (timerPaused) return;

    console.log("yendo rey");

    const intervalId = setInterval(() => {
      setTimer((timer) => {
        console.log(timer);
        if (timer === 0) {
          setTimerPause(true);
          alert("perdiste :v");
          return 0;
        }
        return timer - 1;
      });
    }, 1000);
    console.log("creado interval", intervalId);
    setCurrentIntervalId(intervalId);
  }, [timerPaused, setTimer]);

  return (
    <div className="aspect-square border text-sm flex flex-col items-center justify-center py-4 gap-4 ">
      <label className="text-sm">Escribe tu palabra:</label>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
        {...props}
      >
        <Input
          className="w-4/5"
          placeholder="¡Aquí!"
          onChange={handleInputChange}
          maxLength={20}
        ></Input>
        <Button type="submit" className="w-4/5">
          Enviar
        </Button>
      </form>
    </div>
  );
};
