import React from "react";
import { EyeDropperProps } from "./EyeDropper.types";

const EyeDropper: React.FC<EyeDropperProps> = ({ mousePos }) => {
  return (
    mousePos && (
      <div
        className="absolute pointer-events-none rounded-full border-2 bg-transparent"
        style={{
          top: mousePos.y - 25,
          left: mousePos.x - 25,
          width: 50,
          height: 50,
        }}
      />
    )
  );
};

export default EyeDropper;
