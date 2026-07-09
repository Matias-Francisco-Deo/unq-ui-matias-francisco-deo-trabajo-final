type GameScoreProps = React.ComponentProps<"div"> & {
  score: number;
};

export const GameScore = ({ score, ...props }: GameScoreProps) => {
  return (
    <div
      className="h-1/2 flex-1 border text-sm flex flex-col items-center py-4 gap-2 "
      {...props}
    >
      <label className="text-sm">Puntaje:</label>
      <label className="text-xl">{score}</label>
    </div>
  );
};
