import type { ComponentProps } from "react";
import { Button } from "./button";

type VentanaProps = ComponentProps<"div"> & {
  desc: string;
  cancelText: string;
  confirmText: string;
  onConfirm: Function;
  onCancel: Function;
};

export const Modal = ({
  desc,
  cancelText,
  confirmText,
  className,
  onConfirm,
  onCancel,
  ...props
}: VentanaProps) => {
  return (
    <div
      {...props}
      className={`bg-background text-xl flex w-1/3 flex-col gap-4 border p-4 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p>{"* " + desc}</p>
      </div>
      <div className="flex justify-between text-lg px-30">
        <Button onClick={() => onCancel()} className="bg-transparent">
          {"* " + cancelText}
        </Button>

        <Button onClick={() => onConfirm()} className="bg-transparent">
          {"* " + confirmText}
        </Button>
      </div>
    </div>
  );
};
