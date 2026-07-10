import type { ComponentProps, ReactNode } from "react";
import { Button } from "./button";

type VentanaProps = ComponentProps<"div"> & {
  desc: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  onFinally?: () => void;
  children: ReactNode;
};

export const Modal = ({
  desc,
  cancelText,
  confirmText,
  className,
  onConfirm,
  onCancel,
  onFinally,
  children,
  ...props
}: VentanaProps) => {
  return (
    <div
      {...props}
      className={`bg-background text-xl flex min-w-1/3 flex-col gap-4 border p-4 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p>{"* " + desc}</p>
      </div>

      <div className="flex justify-center">{children}</div>

      <div className="flex justify-between text-lg px-30">
        <Button
          onClick={() => {
            onCancel();
            if (onFinally) onFinally();
          }}
          className="bg-transparent"
        >
          {"* " + cancelText}
        </Button>

        <Button
          onClick={() => {
            onConfirm();
            if (onFinally) onFinally();
          }}
          className="bg-transparent"
        >
          {"* " + confirmText}
        </Button>
      </div>
    </div>
  );
};
