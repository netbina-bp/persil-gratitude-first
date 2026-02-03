import * as React from "react";

import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function Input({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <BaseInput className={cn("bg-white/80", className)} {...props} />;
}

export { Input };
