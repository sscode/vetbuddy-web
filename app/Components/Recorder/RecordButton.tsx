import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { cn } from "@/app/Lib/utils";

type Props = {
  icon?: IconProp;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: React.ComponentProps<"div">["className"];
};

export default function RecordButton({
  onClick,
  icon,
  children,
  className,
}: Props) {
  return (
    <Button
      className={cn(
        "bg-black py-2 px-4 hover:bg-green-500 space-x-2 h-auto w-80 justify-start",
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="bg-white rounded-full aspect-square w-8 h-8 flex justify-center items-center">
          <FontAwesomeIcon
            className="text-black text-lg drop-shadow-lg"
            icon={icon}
          />
        </div>
      )}
      <span className="text-xs drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {children}
      </span>
    </Button>
  );
}
