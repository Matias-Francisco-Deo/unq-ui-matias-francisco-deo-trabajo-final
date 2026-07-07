type GameScoreProps = React.ComponentProps<"div"> & {
  scoreState: [number, React.Dispatch<React.SetStateAction<number>>];
};

export const GameScore = ({ scoreState, ...props }: GameScoreProps) => {
  const [score, _] = scoreState;

  return (
    <div
      className="aspect-square size-1/2 border text-sm flex flex-col items-center py-4 gap-2"
      {...props}
    >
      <label className="text-sm">Puntaje:</label>
      <label className="text-xl">{score}</label>
    </div>
  );
};
