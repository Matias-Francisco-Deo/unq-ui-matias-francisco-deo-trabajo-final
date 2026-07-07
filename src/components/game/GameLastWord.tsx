type GameLastWordProps = React.ComponentProps<"div"> & {
  wordState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
};

export const GameLastWord = ({ wordState, ...props }: GameLastWordProps) => {
  const [words, _] = wordState;

  return (
    <div
      className="aspect-rectangle size-4/5 border flex flex-col items-center text-xl py-4 gap-2"
      {...props}
    >
      <label className="text-sm">Palabra anterior:</label>
      <span>{words.at(-1)}</span>
    </div>
  );
};
