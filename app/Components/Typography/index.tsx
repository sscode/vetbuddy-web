import React from "react";
import { cn } from "@/app/Lib/utils";

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface PProps extends React.HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function H1({ children, className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-bold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function P({ children, className, ...props }: PProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-2", className)}
      {...props}
    >
      {children}
    </p>
  );
}
