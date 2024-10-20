import React from "react";
import { DropperProps } from "./Dropper.types";
import { cn } from "@/lib/utils";
import {
  DROPPER_INITIAL_HEIGHT,
  DROPPER_INITIAL_WIDTH,
} from "@/lib/configs/dropper";

const Dropper: React.FC<DropperProps> = ({ dropperRef, className = "" }) => {
  return (
    <canvas
      className={cn(
        "bg-transparent pointer-events-none cursor-none",
        className
      )}
      ref={dropperRef}
      width={DROPPER_INITIAL_WIDTH}
      height={DROPPER_INITIAL_HEIGHT}
    />
  );
};

Dropper.displayName = "Dropper";
export default React.memo(Dropper);
