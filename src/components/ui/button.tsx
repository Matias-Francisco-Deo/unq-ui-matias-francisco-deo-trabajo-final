import { cn } from "@/lib/utils";

export const Button = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className={cn(
        "bg-primary rounded-none text-primary-foreground px-4 py-2 transition",

        "enabled:hover:opacity-90 enabled:active:scale-95",

        "disabled:cursor-not-allowed disabled:opacity-70",

        className,
      )}
      {...props}
    />
  );
};
