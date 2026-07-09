type GameLastWordProps = React.ComponentProps<"div"> & {
  words: string[];
};

export const GameLastWord = ({ words, ...props }: GameLastWordProps) => {
  const lastWord = words.at(-1);
  return (
    <div
      className="h-1/2 flex-1 border flex flex-col items-center text-xl py-4 gap-2"
      {...props}
    >
      <label className="text-sm">Palabra anterior:</label>
      <span>{lastWord}</span>
    </div>
  );
};
