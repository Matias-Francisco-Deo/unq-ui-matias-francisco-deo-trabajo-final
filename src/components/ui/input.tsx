import { cn } from "@/lib/utils";

type inputProps = React.ComponentProps<"input"> & {
  error?: string;
};

export const Input = ({ error, className, ...props }: inputProps) => {
  return (
    <input
      className={cn(
        "border-border w-full rounded border px-4 py-2",

        "placeholder:text-input-foreground",

        "user-invalid:border-destructive",
        "user-invalid:focus:outline-destructive",
        "user-invalid:placeholder:text-destructive",

        error && "border-red-500 placeholder:text-white focus:outline-red-500",

        className,
      )}
      {...props}
    />
  );
};
