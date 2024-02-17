import * as React from "react";

import { cn } from "@/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon = null, ...props }, ref) => {
    return (
      <div className="relative w-fit-content items-center">
        <input
          type={type}
          className={cn(
            "flex h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 text-black dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            leftIcon ? "pl-12" : "pl-3",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute top-[7px] left-[13px]">{leftIcon}</div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
