import { useState } from "react";
import { GameForm } from "./GameForm";
import { GameLastWord } from "./GameLastWord";
import { GameScore } from "./GameScore";

export const Game = ({ ...props }: React.ComponentProps<"div">) => {
  const [score, setScore] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(2);

  return (
    <div className=" w-full flex flex-col items-center gap-10 px-4">
      <span className="text-2xl">{timer}</span>
      <div className="w-full flex justify-evenly gap-20" {...props}>
        <GameLastWord words={words} />
        <GameForm
          setScore={setScore}
          score={score}
          previousWords={words}
          setPreviousWords={setWords}
          timer={timer}
          setTimer={setTimer}
        />
        <GameScore score={score} />
      </div>
      <span className="overflow-y-auto h-50">
        {words.map((word) => word + " - ")}
      </span>
    </div>
  );
};
