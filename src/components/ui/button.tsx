import { cn } from "@/lib/utils";

export const Button = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button type="button" className={cn("button", className)} {...props}>
      {/* <img src={"src/assets/soul.png"} alt="selected" className="w-3 h-3" /> */}
      {children}
    </button>
  );
};
