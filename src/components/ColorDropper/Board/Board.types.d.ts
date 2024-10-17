import React from "react";

export interface BoardProps {
  canvasBoardRef: React.RefObject<HTMLCanvasElement>;
  isDropperActive: boolean;
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseLeave: () => void;
}
