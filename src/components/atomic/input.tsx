import * as React from "react";

import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputVariant = "default" | "rounded";

interface InputProps extends Omit<React.ComponentProps<"input">, "className"> {
  className?: string;
  variant?: InputVariant;
}

function Input({
  className,
  variant = "default",
  ...props
}: InputProps) {
  return (
    <BaseInput
      className={cn(
        "bg-white/80 placeholder:text-xs",
        variant === "rounded" && "rounded-full!",
        className
      )}
      {...props}
    />
  );
}

export { Input };
