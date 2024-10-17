import {
  DROPPER_CANVAS_HEIGHT,
  DROPPER_CANVAS_WIDTH,
} from "@/lib/configs/dropper";
import React from "react";

interface DropperProps {
  dropperRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

const Dropper: React.FC<DropperProps> = ({ dropperRef }) => {
  return (
    <canvas
      className="absolute pointer-events-none cursor-none"
      ref={dropperRef}
      width={DROPPER_CANVAS_WIDTH}
      height={DROPPER_CANVAS_HEIGHT}
    />
  );
};

Dropper.displayName = "Dropper";
export default React.memo(Dropper);
