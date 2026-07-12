import { NavButton } from "./NavButton";

export const Header = ({
  className,
  ...props
}: React.ComponentProps<"header">) => {
  return (
    <header
      className="border border-white w-full flex text-2xl flex-row justify-center items-center px-30 sticky top-0 h-1/3 gap-25 border-x-0"
      {...props}
    >
      <NavButton to={"game"}>Game</NavButton>
      <NavButton to={"leaderboard"}>Leaderboard</NavButton>
    </header>
  );
};
