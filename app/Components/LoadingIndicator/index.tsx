import { Loader2, LoaderIcon, LucideProps } from "lucide-react";

import React from "react";
import { cn } from "@/app/Lib/utils";

interface Props extends LucideProps {
  variant: "default" | "half-circle";
}

export default function LoadingIndicator({
  variant,
  className,
  ...props
}: Props) {
  const componentProps = {
    ...props,
    className: cn("animate-spin", className),
  };
  const Indicator = {
    default: (props: LucideProps) => <LoaderIcon {...props} />,
    "half-circle": (props: LucideProps) => <Loader2 {...props} />,
  }[variant];

  return <Indicator {...componentProps} />;
}

LoadingIndicator.defaultProps = {
  variant: "default",
};
