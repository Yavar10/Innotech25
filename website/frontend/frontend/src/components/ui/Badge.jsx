import * as React from "react";
import { cn } from "../../lib/utils";

export function Badge({ variant = "default", className, ...props }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    secondary: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
