import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

type NavButtonProps = React.ComponentProps<"button"> & {
  to: string;
};

export const NavButton = ({ className, to, ...props }: NavButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={cn(
        "bg-primary rounded-none text-primary-foreground px-4 py-2 transition",

        "enabled:hover:opacity-90 enabled:active:scale-95",

        "disabled:cursor-not-allowed disabled:opacity-70",

        className,
      )}
      onClick={() => navigate(to)}
      {...props}
    />
  );
};
