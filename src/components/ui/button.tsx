import { playSoundSelect } from "@/lib/audio";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button">;

export const Button = ({
  className,
  children,
  onClick = () => {},
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn("button", className)}
      onClick={(evt) => {
        onClick(evt);
        playSoundSelect();
      }}
      {...props}
    >
      {/* <img src={"src/assets/soul.png"} alt="selected" className="w-3 h-3" /> */}
      {children}
    </button>
  );
};
