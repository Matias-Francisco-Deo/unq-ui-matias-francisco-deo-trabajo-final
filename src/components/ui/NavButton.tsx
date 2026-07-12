import { playSoundSelect } from "@/lib/audio";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { Button } from "./button";

type NavButtonProps = React.ComponentProps<"button"> & {
  to: string;
};

export const NavButton = ({ className, to, ...props }: NavButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      className={cn(className)}
      onClick={() => {
        navigate(to);
        playSoundSelect();
      }}
      {...props}
    />
  );
};
