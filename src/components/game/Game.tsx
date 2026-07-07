import { useState } from "react";
import { GameForm } from "./GameForm";
import { GameLastWord } from "./GameLastWord";
import { GameScore } from "./GameScore";

export const Game = ({ ...props }: React.ComponentProps<"div">) => {
  const scoreState = useState<number>(0);
  const wordState = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(2);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <span className="text-2xl">{timer}</span>
      <div className="size-1/3 flex justify-center gap-20" {...props}>
        <GameLastWord wordState={wordState} />
        <GameForm
          scoreState={scoreState}
          wordState={wordState}
          timer={timer}
          setTimer={setTimer}
        />
        <GameScore scoreState={scoreState} />
      </div>
    </div>
  );
};
